import { Zap, Target, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: Target,
    title: 'Smart Insights',
    description: 'Hugging face powered analytics to understand customer sentiment and trends'
  },
  {
    icon: TrendingUp,
    title: 'Competitive Edge',
    description: 'Track market position and stay ahead of industry trends'
  },
  {
    icon: Zap,
    title: 'Suggestions',
    description: 'Live data and instant insights for quick decision making'
  }
] as const;

export default function FeatureGrid() {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 md:mt-12"
    >
      {features.map((feature, index) => (
        <FeatureCard key={feature.title} {...feature} index={index} />
      ))}
    </motion.div>
  );
}