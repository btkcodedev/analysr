import { useState, useEffect, useCallback } from "react";
import { generateBusinessInsights } from "../lib/groq/client";
import type { StatusState } from "../types/status";

export function useGroqInsights(
  stack?: string,
  substack?: string,
  analyticsData?: any,
  groqToken?: string,
  model?: string
) {
  const [insights, setInsights] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusState>({
    status: "loading",
    lastUpdated: null,
    message: "Connecting to GROQ...",
  });

  const fetchInsights = useCallback(
    async (selectedModel?: string) => {
      if (!groqToken) {
        setStatus({
          status: "error",
          lastUpdated: new Date(),
          message: "GROQ token not provided",
        });
        return;
      }

      if (!stack || !substack || !analyticsData) {
        setStatus({
          status: "error",
          lastUpdated: new Date(),
          message: "Missing required data",
        });
        return;
      }

      try {
        setStatus({
          status: "loading",
          lastUpdated: null,
          message: "Generating AI insights...",
        });

        const result = await generateBusinessInsights({
          token: groqToken,
          stack,
          substack,
          positiveInsights: analyticsData.positiveInsights,
          negativeInsights: analyticsData.negativeInsights,
          emojiStats: analyticsData.textAnalysis.emojiStats,
          aspectAnalysis: analyticsData.aspectAnalysis,
          totalReviews: analyticsData.totalReviews,
          averageRating: analyticsData.averageRating,
          sentimentScore: analyticsData.sentimentScore,
          model: selectedModel,
        });

        setInsights(result);
        setStatus({
          status: "success",
          lastUpdated: new Date(),
          message: "Insights generated successfully",
        });
      } catch (err) {
        setStatus({
          status: "error",
          lastUpdated: new Date(),
          message:
            err instanceof Error ? err.message : "Failed to generate insights",
        });
      }
    },
    [stack, substack, analyticsData, groqToken]
  );

  useEffect(() => {
    fetchInsights(model);
  }, [fetchInsights, model]);

  const refreshInsights = (newModel: string) => {
    fetchInsights(newModel);
  };

  return { insights, status, refreshInsights };
}
