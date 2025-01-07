import { getConnection } from '../connection';
import { getTableRef, buildLimitClause } from './utils';
import type { SentimentTrend } from '../../../types/analytics';

export async function fetchSentimentTrends(
  database: string,
  tableName: string,
  limit: number | 'All'
): Promise<SentimentTrend[]> {
  const connection = await getConnection();
  const tableRef = getTableRef(database, tableName);
  const limitClause = buildLimitClause(limit);

  const query = `
    WITH rating_groups AS (
      SELECT 
        stars as avg_rating,
        COUNT(*) as review_count
      FROM ${tableRef}
      GROUP BY stars
      ORDER BY stars DESC
      ${limitClause}
    )
    SELECT * FROM rating_groups
  `;

  const result = await connection.evaluateQuery(query);
  const rows = result.data.toRows();
  
  return rows.map((row, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (rows.length - index - 1));
    
    return {
      month: date.toISOString().split('T')[0],
      avgRating: Number(row.avg_rating),
      reviewCount: Number(row.review_count)
    };
  });
}
