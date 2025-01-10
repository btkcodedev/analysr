import { getConnection } from "../connection";
import { getTableRef, buildSampleClause } from "./utils";
import type { DataLimit } from "../../../components/onboarding/DataSelectionStep";

export async function fetchTextAnalysis(
  database: string,
  tableName: string,
  limit: DataLimit
): Promise<any> {
  const connection = await getConnection();
  const tableRef = getTableRef(database, tableName);
  const sampleClause = buildSampleClause(tableRef, limit);

  const punctuationQuery = `
    ${sampleClause},
    punctuation_stats AS (
      SELECT
        stars,
        LENGTH(regexp_replace(review_text, '[^!]', '', 'g')) as exclamation_count,
        LENGTH(regexp_replace(review_text, '[^?]', '', 'g')) as question_count
      FROM sample_data
      WHERE LENGTH(review_text) > 0
    ),
    exclamation_stats AS (
      SELECT 
        COUNT(*) as total_count,
        AVG(CAST(stars as DOUBLE)) as avg_rating
      FROM punctuation_stats
      WHERE exclamation_count > 0
    ),
    question_stats AS (
      SELECT 
        COUNT(*) as total_count,
        AVG(CAST(stars as DOUBLE)) as avg_rating
      FROM punctuation_stats
      WHERE question_count > 0
    )
    SELECT
      (SELECT total_count FROM exclamation_stats) as exclamation_marks,
      (SELECT avg_rating FROM exclamation_stats) as exclamation_avg_rating,
      (SELECT total_count FROM question_stats) as question_marks,
      (SELECT avg_rating FROM question_stats) as question_avg_rating
  `;

  const keyPhrasesQuery = `
    ${sampleClause},
    action_words AS (
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
      AND word IN (
        'excellent', 'amazing', 'outstanding', 'improved', 'recommended',
        'efficient', 'effective', 'innovative', 'reliable', 'consistent',
        'performed', 'delivered', 'enhanced', 'optimized', 'streamlined',
        'accelerated', 'transformed', 'scaled', 'grew', 'expanded',
        'profitable', 'productive', 'successful', 'valuable', 'beneficial'
      )
      GROUP BY word
      HAVING COUNT(*) >= 5
    )
    SELECT *
    FROM action_words
    ORDER BY occurrences DESC
    LIMIT 15
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

  const [emojiResult, punctuationResult, keyPhrasesResult, capsResult] =
    await Promise.all([
      connection.evaluateQuery(emojiQuery),
      connection.evaluateQuery(punctuationQuery),
      connection.evaluateQuery(keyPhrasesQuery),
      connection.evaluateQuery(capsAnalysisQuery),
    ]);

  const punctuationStats = punctuationResult.data.toRows()[0];

  return {
    emojiStats: emojiResult.data.toRows().map((row) => ({
      emoji: String(row.emoji),
      count: Number(row.count),
      avgRating: Number(row.avg_rating),
    })),
    punctuationStats: {
      questionMarks: Number(punctuationStats.question_marks) || 0,
      questionAvgRating: Number(punctuationStats.question_avg_rating) || 0,
      exclamationMarks: Number(punctuationStats.exclamation_marks) || 0,
      exclamationAvgRating:
        Number(punctuationStats.exclamation_avg_rating) || 0,
    },
    capsAnalysis: capsResult.data.toRows().map((row) => ({
      stars: Number(row.stars),
      capsPercentage: Number(row.caps_percentage),
    })),
    keyPhrases: keyPhrasesResult.data.toRows().map((row) => ({
      text: String(row.text),
      occurrences: Number(row.occurrences),
      sentiment: Number(row.sentiment),
    })),
  };
}
