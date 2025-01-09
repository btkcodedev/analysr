import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ChevronDown } from 'lucide-react';
import { useSyncStatus } from '../../../lib/airbyte/useSyncStatus';
import StatusIndicator from '../../common/ProgressLoader/StatusIndicator';

interface AirbyteSyncButtonProps {
  token: string;
  connectionId: string;
}

type JobType = 'sync' | 'reset';

export default function AirbyteSyncButton({ token, connectionId }: AirbyteSyncButtonProps) {
  const [isTriggered, setIsTriggered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedJobType, setSelectedJobType] = useState<JobType>('sync');
  const syncStatus = useSyncStatus(
    isTriggered ? token : undefined,
    isTriggered ? connectionId : undefined,
    selectedJobType,
    isTriggered
  );

  const handleTrigger = () => {
    setIsTriggered(true);
    setShowDropdown(false);
  };

  const handleTypeSelect = (type: JobType) => {
    setSelectedJobType(type);
    setShowDropdown(false);
  };

  if (isTriggered && (syncStatus.status === 'success' || syncStatus.status === 'error')) {
    setIsTriggered(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleTrigger}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 rounded-lg text-sm font-medium transition-all hover:bg-purple-600"
        >
          <RefreshCw className={`w-4 h-4 ${syncStatus.status === 'loading' ? 'animate-spin' : ''}`} />
          Trigger {selectedJobType === 'sync' ? 'Sync' : 'Reset'}
        </motion.button>

        <div className="relative">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-medium transition-all hover:bg-purple-500/30"
          >
            <span>Type</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </motion.button>

          {showDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 mt-2 w-32 bg-gray-800 rounded-lg border border-gray-700 shadow-xl z-50"
            >
              <button
                type="button"
                onClick={() => handleTypeSelect('sync')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700/50 transition-colors rounded-t-lg"
              >
                Sync
              </button>
              <button
                type="button"
                onClick={() => handleTypeSelect('reset')}
                className="w-full text-left px-4 py-2 hover:bg-gray-700/50 transition-colors rounded-b-lg"
              >
                Reset
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {(syncStatus.status !== 'stale') && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <StatusIndicator {...syncStatus} />
        </motion.div>
      )}
    </div>
  );
}
