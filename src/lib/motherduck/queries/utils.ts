import type { DataLimit } from '../../../components/onboarding/DataSelectionStep';

export function sanitizeIdentifier(value: string | undefined | null): string {
  if (!value) {
    throw new Error('Database identifier cannot be empty');
  }
  return String(value).replace(/[^a-zA-Z0-9_]/g, '');
}

export function getTableRef(database: string, tableName: string): string {
  const safeDb = sanitizeIdentifier(database);
  const safeTable = sanitizeIdentifier(tableName);
  return `${safeDb}.${safeTable}`;
}

export function buildLimitClause(limit: DataLimit): string {
  if (limit === 'All') return '';
  const numericLimit = Number(limit);
  if (isNaN(numericLimit) || numericLimit <= 0) return '';
  return `LIMIT ${numericLimit}`;
}

export function buildSampleClause(tableRef: string, limit: DataLimit): string {
  const limitClause = buildLimitClause(limit);
  return `
    WITH sample_data AS (
      SELECT *
      FROM ${tableRef}
      ${limitClause ? `ORDER BY RANDOM() ${limitClause}` : ''}
    )
  `;
}