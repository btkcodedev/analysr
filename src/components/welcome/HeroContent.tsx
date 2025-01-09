import { motion } from 'framer-motion';
import { welcomeScreenData } from './welcomeScreenData/index';

export default function HeroContent() {
  return (
    <div className="space-y-4 md:space-y-6">
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
      >
        <span className="gradient-text">{welcomeScreenData.title.gradient1}</span> {welcomeScreenData.title.textgradient1}{' '}
        <span className="gradient-text">{welcomeScreenData.title.gradient2}</span>
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-gray-400"
      >
        {welcomeScreenData.heroContent}
      </motion.p>
    </div>
  );
}