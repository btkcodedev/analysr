import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  index: number;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  color,
  index,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-gray-400">{title}</span>
        <Icon className={`text-${color}-400`} size={24} />
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </motion.div>
  );
}
