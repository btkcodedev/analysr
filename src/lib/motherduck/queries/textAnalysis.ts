import { getConnection } from '../connection';
import { getTableRef, buildSampleClause } from './utils';
import type { TextAnalysis } from '../types';
import type { DataLimit } from '../../../components/onboarding/DataSelectionStep';

export async function fetchTextAnalysis(
  database: string,
  tableName: string,
  limit: DataLimit
): Promise<TextAnalysis> {
  const connection = await getConnection();
  const tableRef = getTableRef(database, tableName);
  const sampleClause = buildSampleClause(tableRef, limit);

  // Mock emoji query since DuckDB doesn't support emoji analysis directly
  const emojiQuery = `
    ${sampleClause}
    SELECT 
      '⭐' as emoji,
      COUNT(*) as count,
      AVG(CAST(stars as DOUBLE)) as avg_rating
    FROM sample_data
    WHERE stars >= 4
    UNION ALL
    SELECT 
      '👍' as emoji,
      COUNT(*) as count,
      AVG(CAST(stars as DOUBLE)) as avg_rating
    FROM sample_data
    WHERE stars >= 3
    UNION ALL
    SELECT 
      '😊' as emoji,
      COUNT(*) as count,
      AVG(CAST(stars as DOUBLE)) as avg_rating
    FROM sample_data
    WHERE review_text LIKE '%happy%' OR review_text LIKE '%great%'
    UNION ALL
    SELECT 
      '🎉' as emoji,
      COUNT(*) as count,
      AVG(CAST(stars as DOUBLE)) as avg_rating
    FROM sample_data
    WHERE stars = 5
  `;

  const keyPhrasesQuery = `
    ${sampleClause},
    word_stats AS (
      SELECT 
        word as text,
        COUNT(*) as occurrences,
        AVG(CASE 
          WHEN stars >= 4 THEN 1
          WHEN stars <= 2 THEN -1
          ELSE 0
        END) as sentiment
      FROM sample_data,
        UNNEST(regexp_split_to_array(
          LOWER(regexp_replace(review_text, '[^a-zA-Z\\s]', ' ', 'g')),
          '\\s+'
        )) as t(word)
      WHERE LENGTH(word) > 3
      GROUP BY word
      HAVING COUNT(*) >= 5
    )
    SELECT *
    FROM word_stats
    ORDER BY occurrences DESC
    LIMIT 20
  `;

  const capsAnalysisQuery = `
    ${sampleClause},
    text_stats AS (
      SELECT 
        stars,
        LENGTH(REGEXP_REPLACE(review_text, '[^A-Z]', '', 'g')) as caps_count,
        LENGTH(review_text) as total_length
      FROM sample_data
      WHERE LENGTH(review_text) > 0
    )
    SELECT 
      stars,
      ROUND(AVG(CAST(caps_count AS FLOAT) / NULLIF(total_length, 0) * 100), 1) as caps_percentage
    FROM text_stats
    GROUP BY stars
    ORDER BY stars DESC
  `;

  const [emojiResult, keyPhrasesResult, capsResult] = await Promise.all([
    connection.evaluateQuery(emojiQuery),
    connection.evaluateQuery(keyPhrasesQuery),
    connection.evaluateQuery(capsAnalysisQuery)
  ]);

  return {
    emojiStats: emojiResult.data.toRows().map(row => ({
      emoji: String(row.emoji),
      count: Number(row.count),
      avgRating: Number(row.avg_rating)
    })),
    punctuationStats: {
      questionMarks: 0,
      questionAvgRating: 0,
      exclamationMarks: 0,
      exclamationAvgRating: 0
    },
    capsAnalysis: capsResult.data.toRows().map(row => ({
      stars: Number(row.stars),
      capsPercentage: Number(row.caps_percentage)
    })),
    keyPhrases: keyPhrasesResult.data.toRows().map(row => ({
      text: String(row.text),
      occurrences: Number(row.occurrences),
      sentiment: Number(row.sentiment)
    }))
  };
}