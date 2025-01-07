import { motion } from 'framer-motion';
import LoadingStage from './LoadingStage';
import type { LoadingState } from '../../../lib/motherduck/types';

interface ProgressLoaderProps {
  loadingState: LoadingState;
  onLoadComplete?: () => void;
}

export default function ProgressLoader({ loadingState, onLoadComplete }: ProgressLoaderProps) {
  if (loadingState.isComplete && onLoadComplete) {
    onLoadComplete();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl"
    >
      <div className="space-y-6">
        {loadingState.stages.map((stage) => (
          <LoadingStage key={stage.id} stage={stage} />
        ))}
      </div>
    </motion.div>
  );
}