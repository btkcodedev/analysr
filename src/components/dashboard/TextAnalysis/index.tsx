import { motion } from 'framer-motion';
import { Type } from 'lucide-react';
import type { TextAnalysis as TextAnalysisType } from '../../../types/analytics';
import EmojiAnalysis from './EmojiAnalysis';
import PunctuationAnalysis from './PunctuationAnalysis';
import CapsAnalysis from './CapsAnalysis';
import KeyPhraseSection from './KeyPhraseSection';
import Tooltip from '../../common/Tooltip/Tooltip';

interface TextAnalysisProps {
  data: TextAnalysisType;
}

export default function TextAnalysis({ data }: TextAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4"
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Type className="text-indigo-400" />
        Advanced Text Analysis
        <Tooltip content="Analysis of text patterns in reviews" />
      </h3>

      <div className="grid gap-4">
        <KeyPhraseSection data={data.keyPhrases} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmojiAnalysis data={data.emojiStats} />
          <PunctuationAnalysis data={data.punctuationStats} />
        </div>
        <CapsAnalysis data={data.capsAnalysis} />
      </div>
    </motion.div>
  );
}
