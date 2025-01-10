import { motion } from "framer-motion";
import { Brain, Lightbulb, TrendingUp, Crown } from "lucide-react";
import { useState } from "react";
import Tooltip from "../../common/Tooltip/Tooltip";
import NoDataFallback from "../../common/DataInfo/NoDataFallback";
import StatusIndicator from "../../common/ProgressLoader/StatusIndicator";
import ModelSelector from "./ModelSelector";
import { useGroqInsights } from "../../../hooks/useGroqInsights";
import type { ProcessedAnalytics } from "../../../lib/motherduck/types";

interface BusinessInsightsProps {
  data: ProcessedAnalytics;
  stack: string;
  substack: string;
  interests?: string;
  groqToken?: string;
}

export default function BusinessInsights({
  data,
  stack,
  substack,
  interests,
  groqToken,
}: BusinessInsightsProps) {
  const [selectedModel, setSelectedModel] = useState("mixtral-8x7b-32768");
  const { insights, status, refreshInsights } = useGroqInsights(
    stack,
    substack,
    data,
    groqToken,
    selectedModel,
    interests
  );

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    refreshInsights(modelId);
  };

  if (!groqToken) {
    return (
      <NoDataFallback message="No cheating! You haven't provided a GROQ token. Add one to unlock AI-powered insights." />
    );
  }

  if (status.status === "error") {
    return (
      <NoDataFallback
        message={status.message || "Failed to load business insights"}
      />
    );
  }

  const sections = insights?.split(/\d\.\s+/).filter(Boolean) || [];
  const sectionIcons = [
    <Lightbulb className="w-5 h-5 mt-1 text-green-400" />,
    <TrendingUp className="w-5 h-5 mt-1 text-blue-400" />,
    <Crown className="w-5 h-5 mt-1 text-purple-400" />,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="text-purple-400" />
          <h3 className="text-xl font-semibold">Business Growth Insights</h3>
          <Tooltip content="AI-powered insights for business growth based on your analytics data" />
        </div>
        <div className="flex items-center gap-4">
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
          />
          <StatusIndicator {...status} />
        </div>
      </div>

      {status.status === "loading" ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-700/20 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {sections.map((section, index) => {
            const [title, ...content] = section.split("\n").filter(Boolean);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/80 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  {sectionIcons[index]}
                  <div className="space-y-2">
                    <h4 className="font-medium">{title}</h4>
                    <div className="text-gray-300 text-sm space-y-2">
                      {content.map((point, i) => (
                        <p key={i}>{point.replace(/^-\s*/, "")}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
