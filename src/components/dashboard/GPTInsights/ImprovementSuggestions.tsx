import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle2, AlertTriangle } from 'lucide-react';

const suggestions = [
  {
    type: 'strength',
    text: 'Strong customer service ratings',
    icon: CheckCircle2,
    color: 'text-green-400'
  },
  {
    type: 'improvement',
    text: 'Response time to customer inquiries',
    icon: AlertTriangle,
    color: 'text-yellow-400'
  },
  {
    type: 'action',
    text: 'Implement automated response system',
    icon: Lightbulb,
    color: 'text-blue-400'
  }
];

export default function ImprovementSuggestions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-6">Insights & Suggestions</h3>
      <div className="space-y-4">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg"
            >
              <Icon className={`w-5 h-5 mt-0.5 ${suggestion.color}`} />
              <div>
                <p className="text-sm text-gray-300">{suggestion.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}