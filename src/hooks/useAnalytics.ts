import { useState, useEffect } from 'react';
import { fetchAnalytics } from '../lib/motherduck/queries';
import { initializeConnection } from '../lib/motherduck/analyticsConnectionManager';
import type { Analytics, LoadingStageId } from '../types/analytics';
import type { DataLimit } from '../components/onboarding/DataSelectionStep';

export interface LoadingStage {
  id: LoadingStageId;
  label: string;
  status: 'pending' | 'loading' | 'complete' | 'error';
  progress: number;
}

export interface LoadingState {
  isComplete: boolean;
  stages: LoadingStage[];
}

export interface QueryStats {
  count: number;
  lastQuery: string;
}

export interface UseAnalyticsResult {
  data: Analytics | null;
  loading: boolean;
  error: string | null;
  lastFetchTime: Date | null;
  isMockData: boolean;
  loadingState: LoadingState;
  queryStats: QueryStats;
  groqStatus: string;
}

export const LOADING_STAGES = {
  CONNECTION: 'CONNECTION',
  DATA: 'DATA',
  PROCESSING: 'PROCESSING',
  VISUALIZATION: 'VISUALIZATION',
} as const;


export const STAGE_LABELS: Record<LoadingStageId, string> = {
  [LOADING_STAGES.CONNECTION]: 'Connecting to database',
  [LOADING_STAGES.DATA]: 'Fetching analytics data',
  [LOADING_STAGES.PROCESSING]: 'Processing results',
  [LOADING_STAGES.VISUALIZATION]: 'Preparing visualization',
};

const INITIAL_LOADING_STATE: LoadingState = {
  isComplete: false,
  stages: [
    {
      id: LOADING_STAGES.CONNECTION,
      label: STAGE_LABELS[LOADING_STAGES.CONNECTION],
      status: 'pending',
      progress: 0,
    },
    {
      id: LOADING_STAGES.DATA,
      label: STAGE_LABELS[LOADING_STAGES.DATA],
      status: 'pending',
      progress: 0,
    },
    {
      id: LOADING_STAGES.PROCESSING,
      label: STAGE_LABELS[LOADING_STAGES.PROCESSING],
      status: 'pending',
      progress: 0,
    },
    {
      id: LOADING_STAGES.VISUALIZATION,
      label: STAGE_LABELS[LOADING_STAGES.VISUALIZATION],
      status: 'pending',
      progress: 0,
    },
  ],
};

const INITIAL_STATE: UseAnalyticsResult = {
  data: null,
  loading: true,
  error: null,
  lastFetchTime: null,
  isMockData: false,
  loadingState: INITIAL_LOADING_STATE,
  queryStats: { count: 0, lastQuery: '' },
  groqStatus: 'Not initialized',
};

export function useAnalytics(
  database: string,
  tableName: string,
  limit: DataLimit,
  stack?: string,
  substack?: string,
  groqToken?: string
): UseAnalyticsResult {
  const [result, setResult] = useState<UseAnalyticsResult>(() => ({
    ...INITIAL_STATE,
    groqStatus: groqToken ? 'Initializing GROQ...' : 'GROQ token not provided',
  }));

  const updateQueryStats = (query: string) => {
    setResult((prev) => ({
      ...prev,
      queryStats: {
        count: prev.queryStats.count + 1,
        lastQuery: query,
      },
    }));
  };

  const updateLoadingStage = (
    stageId: LoadingStageId,
    status: LoadingStage['status'],
    progress: number
  ) => {
    setResult((prev) => ({
      ...prev,
      loadingState: {
        ...prev.loadingState,
        stages: prev.loadingState.stages.map((stage) =>
          stage.id === stageId ? { ...stage, status, progress } : stage
        ),
      },
    }));
  };

  const handleError = (error: unknown, failedStage: LoadingStageId) => {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An error occurred while fetching analytics';

    setResult((prev) => ({
      ...prev,
      loading: false,
      error: errorMessage,
      groqStatus: 'GROQ error',
      loadingState: {
        isComplete: false,
        stages: prev.loadingState.stages.map((stage) => ({
          ...stage,
          status: stage.id === failedStage ? 'error' : stage.status,
          progress: stage.id === failedStage ? 0 : stage.progress,
        })),
      },
    }));
  };

  const handleProgress = (_stage: string, progress: number, currentQuery?: string) => {
    if (currentQuery) {
      updateQueryStats(currentQuery);
    }

    if (progress <= 20) {
      updateLoadingStage(LOADING_STAGES.DATA, 'loading', progress * 2);
    } else if (progress <= 60) {
      updateLoadingStage(LOADING_STAGES.DATA, 'loading', 80);
      updateLoadingStage(LOADING_STAGES.PROCESSING, 'loading', (progress - 20) * 2.5);
    } else {
      updateLoadingStage(LOADING_STAGES.VISUALIZATION, 'loading', (progress - 60) * 2.5);
    }
  };

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      if (!database || !tableName) {
        setResult((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        if (isSubscribed) {
          setResult((_prev) => ({
            ...INITIAL_STATE,
            groqStatus: groqToken
              ? 'Connecting to GROQ...'
              : 'GROQ token not provided',
          }));
        }

        updateLoadingStage(LOADING_STAGES.CONNECTION, 'loading', 50);
        await initializeConnection();
        if (!isSubscribed) return;
        updateLoadingStage(LOADING_STAGES.CONNECTION, 'complete', 100);

        updateLoadingStage(LOADING_STAGES.DATA, 'loading', 5);
        setResult(prev => ({
          ...prev,
          queryStats: { count: 0, lastQuery: '' }
        }));

        const [analyticsData] = await Promise.all([
          fetchAnalytics(database, tableName, limit, handleProgress),
        ]);
        updateLoadingStage(LOADING_STAGES.DATA, 'complete', 100);
        if (!isSubscribed) return;
        const processedData: Analytics = {
          ...analyticsData,
        };

        if (isSubscribed) {
          setResult((prev) => ({
            ...prev,
            data: processedData,
            loading: false,
            error: null,
            lastFetchTime: new Date(),
            groqStatus: groqToken ? 'GROQ ready' : 'GROQ token not provided',
            loadingState: {
              isComplete: true,
              stages: prev.loadingState.stages.map((stage) => ({
                ...stage,
                status: 'complete',
                progress: 100,
              })),
            },
          }));
        }
      } catch (error) {
        if (isSubscribed) {
          handleError(error, LOADING_STAGES.CONNECTION);
        }
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, [database, tableName, limit, stack, substack, groqToken]);

  return result;
}
