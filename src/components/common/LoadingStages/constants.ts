import type { LoadingStageId } from '../../../lib/motherduck/types';

interface LoadingStageConfig {
  id: LoadingStageId;
  label: string;
  duration: number;
}

export const LOADING_STAGES: Record<string, LoadingStageConfig> = {
  connection: {
    id: 'connection',
    label: 'Connecting to database',
    duration: 1000
  },
  data: {
    id: 'data',
    label: 'Fetching analytics data',
    duration: 1500
  },
  processing: {
    id: 'processing',
    label: 'Processing results',
    duration: 1000
  },
  visualization: {
    id: 'visualization',
    label: 'Preparing visualization',
    duration: 800
  }
} as const;