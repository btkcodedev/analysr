import { useState, useEffect } from 'react';
import { checkConnectionStatus, triggerJob } from './service';
import type { StatusState } from '../../types/status';

export function useSyncStatus(
  token?: string, 
  connectionId?: string,
  jobType: 'sync' | 'reset' = 'sync'
): StatusState {
  const [status, setStatus] = useState<StatusState>({
    status: 'loading',
    lastUpdated: null,
    message: 'Initializing...'
  });

  useEffect(() => {
    if (!token || !connectionId) {
      setStatus({
        status: 'error',
        lastUpdated: null,
        message: 'Missing Airbyte configuration'
      });
      return;
    }

    let isSubscribed = true;

    const checkStatus = async () => {
      try {
        const config = { bearerToken: token, connectionId };
        const isConnected = await checkConnectionStatus(config);
        
        if (!isConnected) {
          throw new Error('Invalid Airbyte connection');
        }

        if (!isSubscribed) return;

        setStatus({
          status: 'loading',
          lastUpdated: new Date(),
          message: `Starting ${jobType} job...`
        });

        const jobResult = await triggerJob(config, jobType);

        if (!isSubscribed) return;

        if (jobResult.error) {
          throw new Error(jobResult.error.message);
        }

        setStatus({
          status: 'success',
          lastUpdated: new Date(),
          message: `${jobType.charAt(0).toUpperCase() + jobType.slice(1)} job started: ${jobResult.jobId}`
        });
      } catch (err) {
        if (!isSubscribed) return;

        setStatus({
          status: 'error',
          lastUpdated: new Date(),
          message: err instanceof Error ? err.message : 'Job failed'
        });
      }
    };

    checkStatus();

    return () => {
      isSubscribed = false;
    };
  }, [token, connectionId, jobType]);

  return status;
}
