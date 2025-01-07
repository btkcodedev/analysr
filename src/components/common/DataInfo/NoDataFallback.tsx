import { motion } from 'framer-motion';
import { Cat } from 'lucide-react';

interface NoDataFallbackProps {
  message?: string;
}

export default function NoDataFallback({ message = "No data available yet" }: NoDataFallbackProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1 
        }}
        className="relative"
      >
        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
        <Cat className="w-24 h-24 text-blue-400 relative z-10" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center"
      >
        <h3 className="text-xl font-semibold mb-2">Oops! No Data Found</h3>
        <p className="text-gray-400">{message}</p>
        <p className="text-gray-500 text-sm mt-4">
          Our cat is still looking for your data...
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 text-sm text-gray-500"
      >
        Try adjusting your filters or check back later
      </motion.div>
    </motion.div>
  );
}