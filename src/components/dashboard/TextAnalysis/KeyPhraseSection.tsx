import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import type { KeyPhrase } from '../../../lib/motherduck/types';
import Tooltip from '../../common/Tooltip/Tooltip';

interface KeyPhraseSectionProps {
  data: KeyPhrase[];
}

export default function KeyPhraseSection({ data }: KeyPhraseSectionProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-medium text-gray-300">Key Phrases</h4>
        <Tooltip content="Most frequently mentioned phrases and their sentiment" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {data.map((phrase) => (
          <motion.div
            key={phrase.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800/80 p-3 rounded-lg flex items-center justify-between"
          >
            <span className="text-sm font-medium text-gray-300">"{phrase.text}"</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              phrase.sentiment > 0 ? 'bg-green-500/20 text-green-400' :
              phrase.sentiment < 0 ? 'bg-red-500/20 text-red-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {phrase.occurrences} mentions
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
