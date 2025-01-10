import { getConnection } from '../connection';
import { getTableRef } from './utils';
import type { DataLimit } from '../../../components/onboarding/DataSelectionStep';
import type { SentimentData } from '../../../components/dashboard/Analytics/SentimentHeatmap';


export async function fetchSentimentInsights(
    database: string,
    tableName: string,
    limit: DataLimit
  ): Promise<SentimentData[]> {
    const connection = await getConnection();
    const tableRef = getTableRef(database, tableName);
    const limitClause = limit === 'All' ? '' : `LIMIT ${limit}`;
  
    try {
      const query = `
        WITH sample_data AS (
          SELECT review_text, stars
          FROM ${tableRef}
          WHERE review_text IS NOT NULL 
            AND stars IS NOT NULL
          ORDER BY RANDOM()
          ${limitClause}
        ),
        words AS (
          SELECT 
            word.value as word,
            stars
          FROM sample_data,
          UNNEST(string_split(
            regexp_replace(lower(review_text), '[^a-z\s]', ' ', 'g'),
            ' '
          )) as word(value)
          WHERE strlen(trim(word.value)) > 3
        ),
        word_sentiments AS (
          SELECT 
            word,
            COUNT(*) as frequency,
            AVG(CASE 
              WHEN stars >= 4 THEN 1
              WHEN stars = 3 THEN 0
              ELSE -1
            END) as sentiment_score
          FROM words
          WHERE word NOT IN (
            'this', 'that', 'with', 'from', 'what', 'where', 'when',
            'have', 'here', 'there', 'they', 'their', 'were', 'would',
            'could', 'should', 'about', 'which', 'thing', 'some', 'these'
          )
          GROUP BY word
          HAVING COUNT(*) >= 5
        )
        SELECT 
          word as name,
          frequency as size,
          ROUND(CAST(
            (sentiment_score + 1) / 2 as DOUBLE
          ), 2) as sentiment
        FROM word_sentiments
        WHERE frequency > 0
        ORDER BY frequency DESC
        LIMIT 30
      `;

      const result = await connection.evaluateQuery(query);
      const rows = result.data.toRows();
  
      return rows.map((row) => ({
        name: String(row.name),
        size: Number(row.size),
        sentiment: Number(row.sentiment)
      }));
    } catch (error) {
      return [];
    }
  }