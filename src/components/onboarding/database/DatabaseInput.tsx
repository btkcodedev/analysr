import { useState } from 'react';
import { Database } from 'lucide-react';
import Tooltip from '../../common/Tooltip/Tooltip';

interface DatabaseInputProps {
  onDatabaseSelect: (database: string, table: string) => void;
}

export default function DatabaseInput({ onDatabaseSelect }: DatabaseInputProps) {
  const [dbName, setDbName] = useState('');
  const [tableName, setTableName] = useState('');
  const [focusedField, setFocusedField] = useState<'db' | 'table' | null>(null);

  const handleChange = () => {
    if (dbName && tableName) {
      onDatabaseSelect(dbName.trim(), tableName.trim());
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center mb-2">
          <Database className="mr-2 text-blue-400" />
          <span className="text-lg font-medium">Database Details</span>
          <Tooltip 
            content="Enter your database and table names" 
            icon={true}
            className="ml-2"
          />
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={dbName}
              onChange={(e) => {
                setDbName(e.target.value);
                handleChange();
              }}
              onFocus={() => setFocusedField('db')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter database name"
              className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 border transition-all duration-200 ${
                focusedField === 'db' ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-gray-700'
              }`}
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              value={tableName}
              onChange={(e) => {
                setTableName(e.target.value);
                handleChange();
              }}
              onFocus={() => setFocusedField('table')}
              onBlur={() => setFocusedField(null)}
              placeholder="Enter table name"
              className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 border transition-all duration-200 ${
                focusedField === 'table' ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-gray-700'
              }`}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
