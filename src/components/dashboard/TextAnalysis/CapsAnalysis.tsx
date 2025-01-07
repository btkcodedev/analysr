import { motion } from 'framer-motion';
import type { CapsAnalysis as CapsAnalysisType } from '../../../lib/motherduck/types';
import Tooltip from '../../common/Tooltip/Tooltip';

interface CapsAnalysisProps {
  data: CapsAnalysisType[];
}

export default function CapsAnalysis({ data }: CapsAnalysisProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-300">CAPS Analysis</h4>
        <Tooltip content="Correlation between CAPS LOCK usage and review ratings" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {data.map((item) => (
          <motion.div
            key={item.stars}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 p-2 rounded-lg text-center"
          >
            <div className="text-sm mb-1">{item.stars}★</div>
            <div className="text-xs text-gray-400">
              {item.capsPercentage.toFixed(1)}% CAPS
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
