import { useState, useEffect } from 'react';
import { Database, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusIndicator from '../../common/ProgressLoader/StatusIndicator';
import Tooltip from '../../common/Tooltip/Tooltip';
import { useConnectionStatus } from '../../../lib/motherduck/useConnectionStatus';
import DataSelectionStep from '../DataSelectionStep';
import type { DataLimit } from '../DataSelectionStep';

interface MotherDuckConnectionProps {
  token: string | undefined;
  onTokenChange: (token: string) => void;
  onConnectionSuccess: () => void;
  onConnectionError: () => void;
  onDatabaseSelect: (database: string, table: string) => void;
  selectedLimit: DataLimit;
  onLimitSelect: (limit: DataLimit) => void;
}

export default function MotherDuckConnection({ 
  token, 
  onTokenChange,
  onConnectionSuccess,
  onConnectionError,
  onDatabaseSelect,
  selectedLimit,
  onLimitSelect
}: MotherDuckConnectionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const connectionStatus = useConnectionStatus(token);

  useEffect(() => {
    if (connectionStatus.status === 'success') {
      onConnectionSuccess();
    } else if (connectionStatus.status === 'error') {
      onConnectionError();
    }
  }, [connectionStatus.status, onConnectionSuccess, onConnectionError]);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-2">
          <Database className="mr-2 text-blue-400" />
          <span className="text-lg font-medium">MotherDuck Connection</span>
          <Tooltip 
            content="Enter your MotherDuck token to connect to your database" 
            icon={true}
            className="ml-2"
          />
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="password"
              value={token || ''}
              onChange={(e) => onTokenChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter your MotherDuck token"
              className={`w-full px-4 py-3 pr-12 rounded-lg bg-gray-800/80 border transition-all duration-200 ${
                isFocused ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-gray-700'
              }`}
            />
            {connectionStatus.status === 'loading' && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
              </div>
            )}
          </div>

          <StatusIndicator {...connectionStatus} />
        </div>
      </div>

      {connectionStatus.status === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <DataSelectionStep 
            selectedLimit={selectedLimit}
            onLimitSelect={onLimitSelect}
            onDatabaseSelect={onDatabaseSelect}
          />
        </motion.div>
      )}
    </div>
  );
}
