import { useState, useEffect } from "react";
import { checkConnectionStatus, triggerJob } from "../lib/airbyte/service";
import type { StatusState } from "../types/status";

export function useAirbyteSyncStatus(
  token?: string,
  connectionId?: string,
  jobType: "sync" | "reset" = "sync",
  isTriggered: boolean = false
): StatusState {
  const [status, setStatus] = useState<StatusState>({
    status: "stale",
    lastUpdated: null,
    message: "",
  });

  useEffect(() => {
    let isCancelled = false;

    if (!isTriggered || !token || !connectionId) {
      return;
    }

    const config = { bearerToken: token, connectionId };

    const checkConnection = async () => {
      setStatus({
        status: "loading",
        lastUpdated: new Date(),
        message: `Checking connection...`,
      });

      const isConnected = await checkConnectionStatus(config);
      if (!isConnected) {
        throw new Error("Invalid Airbyte connection");
      }
    };

    const triggerJobAsync = async () => {
      if (isCancelled) return;
      const jobResult = await triggerJob(config, jobType);
      if (jobResult.error) {
        throw new Error(jobResult.error.message);
      }
      if (!isCancelled) {
        setStatus({
          status: "success",
          lastUpdated: new Date(),
          message: `${
            jobType.charAt(0).toUpperCase() + jobType.slice(1)
          } job started: ${jobResult.jobId}`,
        });
      }
    };

    const handleError = (err: Error) => {
      if (!isCancelled) {
        setStatus({
          status: "error",
          lastUpdated: new Date(),
          message: err.message,
        });
      }
    };

    checkConnection().then(triggerJobAsync).catch(handleError);

    return () => {
      isCancelled = true;
    };
  }, [token, connectionId, jobType, isTriggered]);

  return status;
}
