import { motion } from 'framer-motion';
import { Database, ChevronDown } from 'lucide-react';
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { datasets, type Dataset } from '../../data/datasets';

interface DatasetSelectorProps {
  selectedDataset: Dataset;
  onSelect: (dataset: Dataset) => void;
}

export default function DatasetSelector({ selectedDataset, onSelect }: DatasetSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors"
      >
        <Database className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium">{selectedDataset.name}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 mt-2 w-64 bg-gray-800 rounded-lg border border-gray-700 shadow-xl"
        >
          {datasets.map((dataset: { id: Key | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <button
              key={dataset.id}
              onClick={() => {
                onSelect(dataset);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-700/50 transition-colors ${
                dataset.id === selectedDataset.id ? 'bg-blue-500/10' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className={`w-4 h-4 ${
                  dataset.id === selectedDataset.id ? 'text-blue-400' : 'text-gray-400'
                }`} />
                <div>
                  <div className="text-sm font-medium">{dataset.name}</div>
                  <div className="text-xs text-gray-400">{dataset.description}</div>
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}