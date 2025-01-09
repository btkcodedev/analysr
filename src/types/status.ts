export type DataStatus = "loading" | "success" | "error" | "stale";

export interface StatusConfig {
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface StatusState {
  status: DataStatus;
  lastUpdated: Date | null;
  message?: string;
}
