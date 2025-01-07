import { motion } from 'framer-motion';
import { Check, AlertCircle, Loader2 } from 'lucide-react';
import type { LoadingStage as LoadingStageType } from '../../../lib/motherduck/types';

interface LoadingStageProps {
  stage: LoadingStageType;
}

export default function LoadingStage({ stage }: LoadingStageProps) {
  const Icon = stage.status === 'complete' ? Check 
    : stage.status === 'error' ? AlertCircle 
    : Loader2;

  const statusColor = stage.status === 'complete' ? 'emerald' 
    : stage.status === 'error' ? 'red'
    : 'blue';

  return (
    <div className="flex items-center gap-3">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative h-6 w-6"
      >
        <motion.div
          animate={stage.status === 'loading' ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: stage.status === 'loading' ? Infinity : 0, ease: "linear" }}
          className={`h-6 w-6 ${
            stage.status === 'pending' ? 'border-2 border-gray-700' : ''
          } rounded-full flex items-center justify-center ${
            stage.status !== 'pending' ? `text-${statusColor}-500` : ''
          }`}
        >
          {stage.status !== 'pending' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Icon className="h-4 w-4" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-300">{stage.label}</span>
          <span className="text-sm text-gray-400">
            {stage.status === 'complete' ? '100%' : `${Math.round(stage.progress)}%`}
          </span>
        </div>
        <motion.div 
          className="h-2 bg-gray-700 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stage.progress}%` }}
            className={`h-full rounded-full ${
              stage.status === 'complete' ? 'bg-emerald-500'
                : stage.status === 'error' ? 'bg-red-500'
                : 'bg-blue-500'
            }`}
          />
        </motion.div>
      </div>
    </div>
  );
}