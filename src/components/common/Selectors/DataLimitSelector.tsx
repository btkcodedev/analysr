import { motion } from 'framer-motion';
import { ListFilter, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export type LimitOption = number | 'All';

interface DataLimitSelectorProps {
  value: LimitOption;
  onChange: (limit: LimitOption) => void;
  onFocusChange?: (isFocused: boolean) => void;
  isActive?: boolean;
  availableLimits: LimitOption[];
}

export default function DataLimitSelector({ 
  value, 
  onChange, 
  onFocusChange, 
  isActive,
  availableLimits 
}: DataLimitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        onFocusChange?.(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onFocusChange]);

  const formatValue = (val: LimitOption) => {
    if (val === 'All') return 'All Records';
    return `${val.toLocaleString()} Records`;
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
    onFocusChange?.(true);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={handleButtonClick}
        className={`flex items-center gap-2 px-4 py-2.5 bg-gray-800/50 backdrop-blur-sm rounded-lg border transition-all w-full ${
          isActive || isOpen ? 'border-blue-500 ring-1 ring-blue-500/50' : 'border-gray-700 hover:border-gray-600'
        }`}
      >
        <ListFilter className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium">
          {formatValue(value)}
        </span>
        <ChevronDown 
          className={`w-4 h-4 ml-auto transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </motion.button>

      {isOpen && availableLimits && availableLimits.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 mt-2 w-full bg-gray-800 rounded-lg border border-gray-700 shadow-xl overflow-y-auto max-h-[240px]"
          onClick={(e) => e.stopPropagation()}
        >
          {availableLimits.map((option) => (
            <motion.button
              key={typeof option === 'number' ? option : 'all'}
              whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onChange(option);
                setIsOpen(false);
                onFocusChange?.(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-700/50 transition-colors flex items-center gap-2 ${
                option === value ? 'bg-blue-500/10' : ''
              }`}
            >
              <ListFilter 
                className={`w-4 h-4 ${option === value ? 'text-blue-400' : 'text-gray-400'}`} 
              />
              <span>{formatValue(option)}</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}