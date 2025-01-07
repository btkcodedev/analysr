import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface DebugInfoProps {
  title: string;
  info: {
    status: string;
    details?: string;
    timestamp?: string;
    queryCount?: number;
  };
}

export default function DebugInfo({ title, info }: DebugInfoProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-8 w-full max-w-2xl bg-gray-800/50 rounded-lg p-4 font-mono text-sm"
    >
      <div className="flex items-center gap-2 mb-2 text-yellow-400">
        <Terminal size={16} />
        <span>{title}</span>
      </div>
      <div className="space-y-2 text-gray-400">
        <div>Status: {info.status}</div>
        {info.details && <div>Details: {info.details}</div>}
        {info.timestamp && <div>Time: {info.timestamp}</div>}
        {info.queryCount !== undefined && (
          <div>Queries executed: {info.queryCount}</div>
        )}
      </div>
    </motion.div>
  );
}
