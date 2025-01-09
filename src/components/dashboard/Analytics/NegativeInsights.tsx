import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown } from "lucide-react";
import type { NegativeInsight } from "../../../lib/motherduck/types";
import Tooltip from "../../common/Tooltip/Tooltip";
import NoDataFallback from "../../common/DataInfo/NoDataFallback";

interface NegativeInsightsProps {
  data: NegativeInsight[];
}

export default function NegativeInsights({ data }: NegativeInsightsProps) {
  if (!data || data.length === 0) {
    return <NoDataFallback message="No negative insights found - great job!" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="text-red-400" />
        Areas for Improvement
        <Tooltip content="Most frequent issues mentioned in negative reviews" />
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((insight) => (
          <motion.div
            key={insight.phrase}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/80 p-4 rounded-lg border border-gray-700/50"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    insight.rating <= 1.5
                      ? "bg-red-500/20 text-red-400"
                      : insight.rating <= 2.0
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {insight.frequency} mentions
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-300">
                "{insight.phrase}"
              </p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>
                  {insight.percentage.toFixed(1)}% of negative reviews
                </span>
                <span>{insight.rating.toFixed(1)}★</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-red-400/80">
              {insight.severity}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
