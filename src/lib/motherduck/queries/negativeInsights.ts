import { getConnection } from '../connection';
import { getTableRef } from './utils';
import type { NegativeInsight } from '../types';
import type { DataLimit } from '../../../components/onboarding/DataSelectionStep';

export async function fetchNegativeInsights(
  database: string,
  tableName: string,
  limit: DataLimit
): Promise<NegativeInsight[]> {
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
    negative_reviews AS (
      SELECT 
        stars,
        review_text
      FROM sample_data
      WHERE stars <= 2
    ),
    business_terms AS (
      SELECT term, COUNT(*) as freq, AVG(CAST(stars as DOUBLE)) as rating
      FROM negative_reviews
      CROSS JOIN (
        SELECT unnest(array[
          'service', 'quality', 'staff', 'management', 'cleanliness',
          'price', 'value', 'wait', 'delivery', 'customer service',
          'communication', 'reliability', 'maintenance', 'response',
          'professionalism', 'scheduling', 'billing', 'support',
          'training', 'equipment', 'facilities', 'hygiene',
          'safety', 'accuracy', 'timeliness'
        ]) as term
      ) terms
      WHERE LOWER(review_text) LIKE '%' || term || '%'
      GROUP BY term
      HAVING COUNT(*) >= 3
    )
    SELECT 
      term as phrase,
      freq as frequency,
      rating,
      CAST(freq * 100.0 / (SELECT COUNT(*) FROM negative_reviews) as DOUBLE) as percentage,
      CASE 
        WHEN rating <= 1.5 THEN 'Critical issue requiring immediate attention'
        WHEN rating <= 2.0 THEN 'Significant concern among customers'
        ELSE 'Common complaint in negative reviews'
      END as severity
    FROM business_terms
    ORDER BY freq DESC, rating ASC
    LIMIT 8
  `;

  const result = await connection.evaluateQuery(query);
  return result.data.toRows().map(row => ({
    phrase: String(row.phrase),
    frequency: Number(row.frequency),
    rating: Number(row.rating),
    percentage: Number(row.percentage),
    severity: String(row.severity)
  }));
}