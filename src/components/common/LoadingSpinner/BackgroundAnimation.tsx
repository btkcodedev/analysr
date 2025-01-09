import { motion } from "framer-motion";

export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0.1, scale: 1 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}
