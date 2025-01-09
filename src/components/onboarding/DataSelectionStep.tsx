import { useState, useEffect } from "react";
import { Database, ListFilter } from "lucide-react";
import { motion } from "framer-motion";
import DataLimitSelector from "../common/Selectors/DataLimitSelector";
import Tooltip from "../common/Tooltip/Tooltip";
import { getConnection } from "../../lib/motherduck/connection";
import type { LimitOption } from "../common/Selectors/DataLimitSelector";

export type DataLimit = number | "All";

interface DataSelectionStepProps {
  selectedLimit: DataLimit;
  onLimitSelect: (limit: DataLimit) => void;
  onDatabaseSelect: (database: string, table: string) => void;
  onFocusChange?: (field: string | null) => void;
  isActive?: boolean;
}

const DEFAULT_LIMITS: DataLimit[] = [
  "All",
  10000,
  5000,
  2000,
  1000,
  500,
  100,
  50,
  10,
];

export default function DataSelectionStep({
  selectedLimit,
  onLimitSelect,
  onDatabaseSelect,
  onFocusChange,
  isActive,
}: DataSelectionStepProps) {
  const [databases, setDatabases] = useState<string[]>([]);
  const [selectedDb, setSelectedDb] = useState<string>("");
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableLimits, setAvailableLimits] =
    useState<LimitOption[]>(DEFAULT_LIMITS);
  const [totalRows, setTotalRows] = useState<number | null>(null);

  useEffect(() => {
    const fetchDatabases = async () => {
      setLoading(true);
      setError(null);
      try {
        const conn = await getConnection();
        const result = await conn.evaluateQuery(`SHOW DATABASES`);
        const dbList = result.data
          .toRows()
          .map((row) => row.database_name as string)
          .filter(Boolean);

        setDatabases(dbList);
      } catch (err) {
        console.error("Error fetching databases:", err);
        setError("Failed to fetch databases");
      } finally {
        setLoading(false);
      }
    };
    fetchDatabases();
  }, []);

  useEffect(() => {
    const fetchTables = async () => {
      if (!selectedDb) {
        setTables([]);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const conn = await getConnection();
        await conn.evaluateQuery(`USE ${selectedDb}`);
        const result = await conn.evaluateQuery("SHOW TABLES");
        const tableList = result.data
          .toRows()
          .map((row) => String(row.table_name || row.name))
          .filter(Boolean)
          .sort();
        setTables(tableList);
      } catch (err) {
        console.error("Error fetching tables:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch tables");
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [selectedDb]);

  useEffect(() => {
    const updateLimits = async () => {
      if (!selectedDb || !selectedTable) {
        setTotalRows(null);
        setAvailableLimits(DEFAULT_LIMITS);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const conn = await getConnection();
        await conn.evaluateQuery(`USE ${selectedDb}`);

        const countResult = await conn.evaluateQuery(`
          SELECT COUNT(*) as total_rows 
          FROM ${selectedTable}
        `);

        const total = Number(countResult.data.toRows()[0]?.total_rows || 0);
        setTotalRows(total);

        if (total) {
          const customLimits: LimitOption[] = DEFAULT_LIMITS.filter(
            (limit) =>
              limit === "All" || (typeof limit === "number" && limit <= total)
          );

          if (!customLimits.includes("All")) {
            customLimits.push("All");
          }

          setAvailableLimits(customLimits);
          if (typeof selectedLimit === "number" && selectedLimit > total) {
            onLimitSelect(Math.min(total, 10000));
          }
        }
      } catch (err) {
        console.error("Error fetching row count:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch table information"
        );
      } finally {
        setLoading(false);
      }
    };

    updateLimits();
  }, [selectedDb, selectedTable, onLimitSelect]);

  const handleDatabaseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const db = e.target.value;
    setSelectedDb(db);
    setSelectedTable("");
    setTotalRows(null);
  };

  const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const table = e.target.value;
    setSelectedTable(table);
    if (table) {
      onDatabaseSelect(selectedDb, table);
    }
  };

  const handleLimitChange = (newLimit: LimitOption) => {
    if (newLimit === "All" || (totalRows !== null && newLimit <= totalRows)) {
      onLimitSelect(newLimit);
    } else if (totalRows !== null) {
      onLimitSelect(Math.min(totalRows, 10000));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-2">
          <Database className="mr-2 text-blue-400" />
          <span className="text-lg font-medium">Select Data Source</span>
          <Tooltip
            content="Choose your database and table for analysis"
            icon={true}
            className="ml-2"
          />
        </div>

        <div className="space-y-4">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          <select
            value={selectedDb}
            onChange={handleDatabaseChange}
            disabled={loading}
            className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 border transition-all duration-200 ${
              isActive
                ? "border-blue-500 ring-1 ring-blue-500/50"
                : "border-gray-700"
            } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <option value="">Select Database</option>
            {databases.map((db) => (
              <option key={db} value={db}>
                {db}
              </option>
            ))}
          </select>

          {selectedDb && (
            <select
              value={selectedTable}
              onChange={handleTableChange}
              disabled={loading}
              className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 border transition-all duration-200 ${
                isActive
                  ? "border-blue-500 ring-1 ring-blue-500/50"
                  : "border-gray-700"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <option value="">Select Table</option>
              {tables.map((table) => (
                <option key={table} value={table}>
                  {table}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {selectedDb && selectedTable && (
        <div>
          <div className="flex items-center mb-2">
            <ListFilter className="mr-2 text-blue-400" />
            <span className="text-lg font-medium">Data Limit</span>
            <Tooltip
              content="Set the maximum number of records to analyze"
              icon={true}
              className="ml-2"
            />
          </div>

          {totalRows !== null && (
            <div className="text-sm text-gray-400 mb-2">
              Total rows in table: {totalRows.toLocaleString()}
            </div>
          )}

          <DataLimitSelector
            value={selectedLimit}
            onChange={handleLimitChange}
            isActive={isActive}
            availableLimits={availableLimits}
            onFocusChange={(isFocused) =>
              onFocusChange?.(isFocused ? "limit" : null)
            }
          />
        </div>
      )}
    </div>
  );
}
