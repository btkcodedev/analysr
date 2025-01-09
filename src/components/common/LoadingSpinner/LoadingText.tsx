import { motion } from "framer-motion";

export default function LoadingText() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-4 text-gray-400 font-medium"
    >
      <motion.span
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading
      </motion.span>
      <motion.span
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
      >
        .
      </motion.span>
      <motion.span
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      >
        .
      </motion.span>
    </motion.p>
  );
}
