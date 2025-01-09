export interface AirbyteConfig {
  bearerToken: string;
  connectionId: string;
}

export interface SyncJobResponse {
  jobId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  createdAt: number;
  updatedAt: number;
  connectionId: string;
  error?: {
    message: string;
    failureReason?: string;
  };
}

export interface StatusState {
  status: 'idle' | 'loading' | 'success' | 'error';
  lastUpdated: Date | null;
  message: string | null;
}