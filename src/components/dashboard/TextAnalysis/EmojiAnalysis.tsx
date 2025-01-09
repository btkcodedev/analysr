import { motion } from "framer-motion";
import type { EmojiStat } from "../../../types/analytics";
import Tooltip from "../../common/Tooltip/Tooltip";

interface EmojiAnalysisProps {
  data: EmojiStat[];
}

export default function EmojiAnalysis({ data }: EmojiAnalysisProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-300">Emoji Usage</h4>
        <Tooltip content="Emoji usage patterns in reviews" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {data.map((stat) => (
          <motion.div
            key={stat.emoji}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/50 p-2 rounded-lg text-center"
          >
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="text-xs text-gray-400">
              {stat.count} uses · {stat.avgRating.toFixed(1)}★
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
