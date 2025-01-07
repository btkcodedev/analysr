import { getConnection } from '../connection';
import { getTableRef } from './utils';
import type { DataLimit } from '../../../components/onboarding/DataSelectionStep';

export interface PositiveInsight {
  category: string;
  rating: number;
  frequency: number;
  percentage: number;
  description: string;
}

export async function fetchPositiveInsights(
  database: string,
  tableName: string,
  limit: DataLimit
): Promise<PositiveInsight[]> {
  const connection = await getConnection();
  const tableRef = getTableRef(database, tableName);
  const limitClause = limit === 'All' ? '' : `LIMIT ${limit}`;

  const query = `
    WITH sample_data AS (
      SELECT *
      FROM ${tableRef}
      ORDER BY RANDOM()
      ${limitClause}
    ),
    positive_reviews AS (
      SELECT *
      FROM sample_data
      WHERE stars >= 4
    ),
    business_terms AS (
      SELECT term, COUNT(*) as freq, AVG(CAST(stars as DOUBLE)) as rating
      FROM positive_reviews
      CROSS JOIN (
        SELECT unnest(array[
          'excellent service', 'professional', 'expertise', 'quality',
          'efficient', 'responsive', 'helpful staff', 'value',
          'customer service', 'communication', 'reliability',
          'cleanliness', 'atmosphere', 'convenience', 'innovation',
          'technology', 'support', 'experience', 'satisfaction',
          'recommendation', 'improvement', 'consistency'
        ]) as term
      ) terms
      WHERE LOWER(review_text) LIKE '%' || term || '%'
      GROUP BY term
      HAVING COUNT(*) >= 5
    )
    SELECT 
      term as category,
      rating,
      freq as frequency,
      CAST(freq * 100.0 / (SELECT COUNT(*) FROM positive_reviews) as DOUBLE) as percentage,
      CASE 
        WHEN rating >= 4.8 THEN 'Consistently delivers exceptional results'
        WHEN rating >= 4.5 THEN 'Strong competitive advantage'
        ELSE 'Reliable business strength'
      END as description
    FROM business_terms
    ORDER BY freq DESC, rating DESC
    LIMIT 3
  `;

  const result = await connection.evaluateQuery(query);
  return result.data.toRows().map((row) => ({
    category: String(row.category),
    rating: Number(row.rating),
    frequency: Number(row.frequency),
    percentage: Number(row.percentage),
    description: String(row.description),
  }));
}
