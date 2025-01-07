import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const competitors = [
  { name: "Competitor A", rating: 4.2, change: 0.3 },
  { name: "Competitor B", rating: 3.9, change: -0.1 },
  { name: "Competitor C", rating: 4.0, change: 0.2 }
];

export default function CompetitorAnalysis() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Competitor Analysis</h3>
      <div className="space-y-4">
        {competitors.map((competitor) => (
          <div
            key={competitor.name}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
          >
            <div>
              <h4 className="font-medium">{competitor.name}</h4>
              <div className="text-sm text-gray-400">Rating: {competitor.rating}</div>
            </div>
            <div className={`flex items-center ${
              competitor.change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {competitor.change > 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {Math.abs(competitor.change)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}