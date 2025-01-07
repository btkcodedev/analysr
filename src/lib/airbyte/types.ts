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

export interface AirbyteError {
  message: string;
  status: number;
  failureReason?: string;
}
