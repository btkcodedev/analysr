import { motion } from 'framer-motion';
import { Star, TrendingUp } from 'lucide-react';
import type { PositiveInsight } from '../../../lib/motherduck/queries/positiveInsights';
import Tooltip from '../../common/Tooltip/Tooltip';
import NoDataFallback from '../../common/DataInfo/NoDataFallback';

interface PositiveInsightsProps {
  data: PositiveInsight[];
}

export default function PositiveInsights({ data }: PositiveInsightsProps) {
  if (!data || data.length === 0) {
    return <NoDataFallback message="No positive insights available yet" />;
  }

  // Sort by frequency and get top 3
  const topPerformers = data
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6"
    >
      <h3 className="text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
        <Star className="text-yellow-400" />
        Top Performing Categories
        <Tooltip content="Most frequent positive aspects from customer reviews" />
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topPerformers.map((insight, index) => (
          <motion.div
            key={`${insight.category}-${insight.rating}`}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gray-800 rounded-lg p-4 ${
              index === 0 ? 'sm:col-span-2 lg:col-span-1 ring-2 ring-yellow-500/20' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  {index === 0 && (
                    <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full">
                      Top Performer
                    </span>
                  )}
                  {index === 1 && (
                    <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-xs font-medium rounded-full">
                      Runner Up
                    </span>
                  )}
                  {index === 2 && (
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-400 text-xs font-medium rounded-full">
                      Rising Star
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-lg mt-2">{insight.category}</h4>
                <p className="text-sm text-gray-400 mt-1">{insight.description}</p>
                <div className="flex items-center gap-1 text-yellow-400 mt-2">
                  {Array.from({ length: Math.round(insight.rating) }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 text-emerald-400">
                <TrendingUp size={16} />
                <span className="font-medium">{insight.percentage.toFixed(1)}%</span>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {insight.frequency.toLocaleString()} reviews
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${insight.percentage}%` }}
                className={`h-full rounded-full ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  'bg-orange-500'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
