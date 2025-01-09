import { motion } from 'framer-motion';
import { HelpCircle, AlertTriangle } from 'lucide-react';
import type { PunctuationStats } from '../../../types/analytics';
import Tooltip from '../../common/Tooltip/Tooltip';

interface PunctuationAnalysisProps {
  data: PunctuationStats;
}

export default function PunctuationAnalysis({ data }: PunctuationAnalysisProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-300">Punctuation</h4>
        <Tooltip content="Question and exclamation mark usage" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/50 p-2 rounded-lg"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-blue-400" />
              <span className="text-xs">Questions</span>
            </div>
            <span className="text-sm font-medium">{data.questionMarks}</span>
          </div>
          <div className="text-xs text-gray-400">
            Avg: {data.questionAvgRating.toFixed(1)}★
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-gray-800/50 p-2 rounded-lg"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-yellow-400" />
              <span className="text-xs">Exclamations</span>
            </div>
            <span className="text-sm font-medium">{data.exclamationMarks}</span>
          </div>
          <div className="text-xs text-gray-400">
            Avg: {data.exclamationAvgRating.toFixed(1)}★
          </div>
        </motion.div>
      </div>
    </div>
  );
}
