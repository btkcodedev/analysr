import { getConnection } from '../connection';
import { getTableReference } from './utils';
import type { KeyPhrase } from '../../../types/analytics';
import type { Dataset } from '../types';

export async function fetchKeyPhrases(dataset: Dataset, limit: number | 'All'): Promise<KeyPhrase[]> {
  const connection = await getConnection();
  const limitClause = limit === 'All' ? '' : `LIMIT ${limit}`;
  const tableRef = getTableReference(dataset);

  const query = `
    WITH review_stats AS (
      SELECT 
        CASE 
          WHEN stars >= 4 THEN 'excellent service'
          WHEN stars = 3 THEN 'average experience'
          ELSE 'poor quality'
        END as phrase,
        COUNT(*) as occurrences,
        AVG(CASE 
          WHEN stars >= 4 THEN 1
          WHEN stars <= 2 THEN -1
          ELSE 0
        END) as sentiment
      FROM ${tableRef}
      GROUP BY 
        CASE 
          WHEN stars >= 4 THEN 'excellent service'
          WHEN stars = 3 THEN 'average experience'
          ELSE 'poor quality'
        END
      HAVING COUNT(*) >= 5
      ORDER BY occurrences DESC
      ${limitClause}
    )
    SELECT * FROM review_stats
  `;

  const result = await connection.evaluateQuery(query);
  return result.data.toRows().map(row => ({
    text: String(row.phrase),
    occurrences: Number(row.occurrences),
    sentiment: Number(row.sentiment)
  }));
}
