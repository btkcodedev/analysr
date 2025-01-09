import { motion } from "framer-motion";
import AnimatedLogo from "./AnimatedLogo";
import BackgroundAnimation from "./BackgroundAnimation";
import LoadingText from "./LoadingText";

export default function LoadingSpinner() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative flex flex-col items-center justify-center min-h-[200px] min-w-[200px]"
    >
      <BackgroundAnimation />
      <div className="relative z-10">
        <AnimatedLogo />
        <LoadingText />
      </div>
    </motion.div>
  );
}
