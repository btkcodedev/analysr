import { Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GROQ_MODELS, fetchAvailableModels } from '../../../lib/groq/models';
import type { GroqModel } from '../../../lib/groq/types';
import Tooltip from '../../common/Tooltip/Tooltip';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (modelId: string) => void;
  groqToken?: string;
}

export default function ModelSelector({ selectedModel, onModelChange, groqToken }: ModelSelectorProps) {
  const [models, setModels] = useState<GroqModel[]>(GROQ_MODELS);

  useEffect(() => {
    if (groqToken) {
      fetchAvailableModels(groqToken).then(setModels);
    }
  }, [groqToken]);

  return (
    <div className="flex items-center gap-2">
      <Cpu className="text-purple-400" />
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-colors"
      >
        {models.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
      <Tooltip content="Select the AI model for generating insights" />
    </div>
  );
}
