import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

export default function AnimatedLogo() {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1.1, 1.05, 1],
        rotate: [0, 15, 30, 15, 0],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="relative"
    >
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 1, 0.6, 0.3],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 blur-xl bg-blue-500/30 rounded-full"
      />
      <BarChart3 size={48} className="text-blue-500 relative z-10" />
    </motion.div>
  );
}
