import { getConnection } from '../connectionManager';
import { getTableRef, buildSampleClause } from './utils';
import { fetchAspectAnalysis } from './aspectAnalysis';
import { fetchNegativeInsights } from './negativeInsights';
import { fetchPositiveInsights } from './positiveInsights';
import { fetchTextAnalysis } from './textAnalysis';
import type { ProcessedAnalytics } from '../types';
import type { DataLimit } from '../../../components/onboarding/DataSelectionStep';

export async function fetchAnalytics(
  database: string,
  tableName: string,
  limit: DataLimit,
  stack?: string,
  substack?: string
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

    const [
      basicStats,
      aspectAnalysis,
      negativeInsights,
      positiveInsights,
      textAnalysis
    ] = await Promise.all([
      connection.evaluateQuery(basicStatsQuery),
      fetchAspectAnalysis(database, tableName, limit),
      fetchNegativeInsights(database, tableName, limit),
      fetchPositiveInsights(database, tableName, limit),
      fetchTextAnalysis(database, tableName, limit)
    ]);

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
      textAnalysis
    };
  } catch (error) {
    console.error('Analytics query execution failed:', error);
    throw error;
  }
}