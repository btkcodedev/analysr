import { useState, useEffect } from "react";
import type { StatusState } from "../types/status";

const STALE_THRESHOLD = 5 * 60 * 1000; // 5 minutes

export function useStatus(
  isLoading: boolean,
  error: string | null,
  lastUpdated: Date | null
): StatusState {
  const [state, setState] = useState<StatusState>({
    status: "loading",
    lastUpdated: null,
  });

  useEffect(() => {
    if (error) {
      setState({
        status: "error",
        lastUpdated,
        message: error,
      });
      return;
    }

    if (isLoading) {
      setState({
        status: "loading",
        lastUpdated,
        message: "Loading...",
      });
      return;
    }

    if (lastUpdated) {
      const isStale = Date.now() - lastUpdated.getTime() > STALE_THRESHOLD;
      setState({
        status: isStale ? "stale" : "success",
        lastUpdated,
        message: isStale ? "Data might be outdated" : "Data up to date",
      });
      return;
    }

    setState({
      status: "loading",
      lastUpdated: null,
      message: "Initializing...",
    });
  }, [isLoading, error, lastUpdated]);

  return state;
}
