import { useState, useEffect } from 'react';
import { getConnection } from './connection';
import { useTokenStore } from './tokenStore';
import type { StatusState } from '../../types/status';

export function useConnectionStatus(inputToken: string | undefined): StatusState {
  const [status, setStatus] = useState<StatusState>({
    status: 'loading',
    lastUpdated: null,
    message: 'Initializing connection...'
  });

  const setStoreToken = useTokenStore(state => state.setToken);

  useEffect(() => {
    setStoreToken(inputToken || null);
  }, [inputToken, setStoreToken]);

  useEffect(() => {
    if (!inputToken) {
      setStatus({
        status: 'stale',
        lastUpdated: null,
        message: 'Please enter your MotherDuck token'
      });
      return;
    }

    let isSubscribed = true;

    const checkConnection = async () => {
      try {
        setStatus(prev => ({
          ...prev,
          status: 'loading',
          message: 'Establishing connection...'
        }));

        const connection = await getConnection();
        
        if (!isSubscribed) return;

        if (await connection.isInitialized()) {
          setStatus({
            status: 'success',
            lastUpdated: new Date(),
            message: 'Connected to MotherDuck'
          });
        }
      } catch (err) {
        if (!isSubscribed) return;
        
        setStatus({
          status: 'error',
          lastUpdated: new Date(),
          message: err instanceof Error ? err.message : 'Connection failed'
        });
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000);

    return () => {
      isSubscribed = false;
      clearInterval(interval);
    };
  }, [inputToken]);

  return status;
}
