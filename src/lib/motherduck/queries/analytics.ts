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
      ${sampleClause}
      SELECT 
        COUNT(*) as total_reviews,
        AVG(CAST(stars as DOUBLE)) as avg_rating,
        (CAST(COUNT(CASE WHEN stars >= 4 THEN 1 END) as DOUBLE) * 100.0 / NULLIF(COUNT(*), 0)) as sentiment_score
      FROM sample_data
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
    const industryAverage = 3.5;
    const competitorComparison = ((Number(stats.avg_rating) / industryAverage) - 1) * 100;

    return {
      totalReviews: Number(stats.total_reviews),
      averageRating: Number(stats.avg_rating) || 0,
      sentimentScore: Number(stats.sentiment_score) || 0,
      competitorComparison,
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