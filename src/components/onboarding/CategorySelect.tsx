import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { BusinessCategory, SubStack } from "../../data/businessCategories";

interface CategorySelectProps {
  categories: BusinessCategory[];
  onSelect: (stack: string, substack: string) => void;
  onFocusChange?: (isFocused: boolean) => void;
  isActive?: boolean;
}

export default function CategorySelect({
  categories,
  onSelect,
  onFocusChange,
  isActive,
}: CategorySelectProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<BusinessCategory | null>(null);
  const [selectedSubstack, setSelectedSubstack] = useState<SubStack | null>(
    null
  );
  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsMainOpen(false);
        setIsSubOpen(false);
        onFocusChange?.(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onFocusChange]);

  const handleCategorySelect = (category: BusinessCategory) => {
    setSelectedCategory(category);
    setSelectedSubstack(null);
    setIsMainOpen(false);
    if (selectedSubstack) {
      onSelect(category.label, selectedSubstack.label);
    }
  };

  const handleSubstackSelect = (substack: SubStack) => {
    setSelectedSubstack(substack);
    setIsSubOpen(false);
    if (selectedCategory) {
      onSelect(selectedCategory.label, substack.label);
    }
  };

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="button"
          onClick={() => {
            setIsMainOpen(!isMainOpen);
            onFocusChange?.(true);
          }}
          className={`w-full px-4 py-3.5 rounded-lg bg-gray-800/80 border transition-all duration-200 flex items-center justify-between ${
            isActive || isMainOpen
              ? "border-blue-500 ring-1 ring-blue-500/50"
              : "border-gray-700 hover:border-gray-600"
          }`}
        >
          <span className="text-gray-300">
            {selectedCategory
              ? selectedCategory.label
              : "Select Business Category"}
          </span>
          <ChevronDown
            className={`transition-transform duration-200 ${
              isMainOpen ? "rotate-180" : ""
            }`}
          />
        </motion.button>

        {isMainOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar"
          >
            {categories.map((category) => (
              <motion.button
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
                type="button"
                key={`category-${category.id}`}
                onClick={() => handleCategorySelect(category)}
                className="w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {selectedCategory && (
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            onClick={() => {
              setIsSubOpen(!isSubOpen);
              onFocusChange?.(true);
            }}
            className={`w-full px-4 py-3.5 rounded-lg bg-gray-800/80 border transition-all duration-200 flex items-center justify-between ${
              isActive || isSubOpen
                ? "border-blue-500 ring-1 ring-blue-500/50"
                : "border-gray-700 hover:border-gray-600"
            }`}
          >
            <span className="text-gray-300">
              {selectedSubstack
                ? selectedSubstack.label
                : "Select Specialization"}
            </span>
            <ChevronDown
              className={`transition-transform duration-200 ${
                isSubOpen ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          {isSubOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 w-full mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-60 overflow-y-auto custom-scrollbar"
            >
              {selectedCategory.substacks.map((substack) => (
                <motion.button
                  whileHover={{ backgroundColor: "rgba(55, 65, 81, 1)" }}
                  type="button"
                  key={`substack-${selectedCategory.id}-${substack.id}`}
                  onClick={() => handleSubstackSelect(substack)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-700/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {substack.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
