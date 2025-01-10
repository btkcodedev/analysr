import { getConnection } from '../analyticsConnectionManager';
import { getTableRef, buildSampleClause } from './utils';
import { fetchAspectAnalysis } from './aspectAnalysis';
import { fetchNegativeInsights } from './negativeInsights';
import { fetchPositiveInsights } from './positiveInsights';
import { fetchTextAnalysis } from './textAnalysis';
import type { ProcessedAnalytics } from '../types';
import type { DataLimit } from '../../../components/onboarding/DataSelectionStep';
import { fetchSentimentInsights } from './sentimentInsights';

export async function fetchAnalytics(
  database: string,
  tableName: string,
  limit: DataLimit,
  onProgress?: (stage: string, progress: number, currentQuery?: string) => void
): Promise<ProcessedAnalytics> {
  const connection = await getConnection();
  if (!connection) {
    throw new Error('Database connection not initialized');
  }

  const tableRef = getTableRef(database, tableName);
  const sampleClause = buildSampleClause(tableRef, limit);

  try {
    const basicStatsQuery = `
    ${sampleClause},
    rating_metrics AS (
      SELECT 
        COUNT(*) as total_reviews,
        AVG(CAST(stars as DOUBLE)) as avg_rating,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY stars) as median_rating,
        (CAST(COUNT(CASE WHEN stars >= 4 THEN 1 END) as DOUBLE) * 100.0 / NULLIF(COUNT(*), 0)) as sentiment_score,
        -- Getting recent average (last 20% of reviews)
        (SELECT AVG(CAST(stars as DOUBLE))
         FROM (
           SELECT stars
           FROM sample_data
           LIMIT (SELECT COUNT(*) * 0.2 FROM sample_data)
         )) as recent_avg_rating
      FROM sample_data
    )
    SELECT 
      total_reviews,
      avg_rating,
      sentiment_score,
      -- Calculating relative performance using recent vs overall trend
      ((recent_avg_rating / NULLIF(avg_rating, 0)) - 1) * 100 as market_position
    FROM rating_metrics
  `;

    onProgress?.('Basic Statistics', 10, basicStatsQuery);
    const basicStats = await connection.evaluateQuery(basicStatsQuery);
    onProgress?.('Basic Statistics', 20);

    onProgress?.('Aspect Analysis', 25, 'Fetching aspect analysis...');
    const aspectAnalysis = await fetchAspectAnalysis(database, tableName, limit);
    onProgress?.('Aspect Analysis', 40);

    onProgress?.('Negative Insights', 45, 'Analyzing negative feedback...');
    const negativeInsights = await fetchNegativeInsights(database, tableName, limit);
    onProgress?.('Negative Insights', 60);

    onProgress?.('Positive Insights', 65, 'Analyzing positive feedback...');
    const positiveInsights = await fetchPositiveInsights(database, tableName, limit);
    onProgress?.('Positive Insights', 80);

    onProgress?.('Text Analysis', 85, 'Processing text patterns...');
    const [textAnalysis, sentimentData] = await Promise.all([
      fetchTextAnalysis(database, tableName, limit),
      fetchSentimentInsights(database, tableName, limit),
    ]);
    onProgress?.('Text Analysis', 100);

    const stats = basicStats.data.toRows()[0];
    return {
      totalReviews: Number(stats.total_reviews),
      averageRating: Number(stats.avg_rating) || 0,
      sentimentScore: Number(stats.sentiment_score) || 0,
      competitorComparison: Number(stats.market_position) || 0,
      aspectAnalysis,
      negativeInsights,
      positiveInsights,
      textAnalysis,
      sentimentInsights: sentimentData,
    };
  } catch (error) {
    throw error;
  }
}
