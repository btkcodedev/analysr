import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import HeroContent from './HeroContent';
import FeatureGrid from './features/FeatureGrid';

export default function WelcomeHero() {
  return (
    <div className="flex flex-col justify-center p-6 md:p-8 lg:p-16 lg:border-r border-white/10 min-h-screen lg:min-h-0">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-block mb-8"
      >
        <div className="p-4 bg-blue-500/10 rounded-2xl backdrop-blur-sm border border-blue-500/20 w-fit">
          <BarChart3 size={48} className="text-blue-400" />
        </div>
      </motion.div>

      <HeroContent />
      <FeatureGrid />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 md:p-6 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 backdrop-blur-sm border border-white/5 rounded-xl"
      >
        <p className="text-gray-300 text-sm">
          Join to make data-driven decisions
        </p>
      </motion.div>
    </div>
  );
}