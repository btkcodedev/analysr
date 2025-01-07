import { motion } from 'framer-motion';
import { BeakerIcon } from 'lucide-react';

export default function MockDataBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center gap-2"
    >
      <BeakerIcon className="w-4 h-4 text-purple-400" />
      <span className="text-sm text-purple-300">
        Using mock data for demonstration
      </span>
    </motion.div>
  );
}