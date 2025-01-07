import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GetStartedButton() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex justify-center"
    >
      <Link to="/onboarding">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex items-center px-8 py-3 bg-blue-500 rounded-full text-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
        </motion.button>
      </Link>
    </motion.div>
  );
}