import type { LoadingStageId } from "../../../types/analytics";

interface LoadingStageConfig {
  id: LoadingStageId;
  label: string;
  duration: number;
}

export const LOADING_STAGES: Record<string, LoadingStageConfig> = {
  connection: {
    id: "CONNECTION",
    label: "Connecting to database",
    duration: 1000,
  },
  data: {
    id: "DATA",
    label: "Fetching analytics data",
    duration: 1500,
  },
  processing: {
    id: "PROCESSING",
    label: "Processing results",
    duration: 1000,
  },
  visualization: {
    id: "VISUALIZATION",
    label: "Preparing visualization",
    duration: 800,
  },
} as const;
