import { useState, useEffect } from 'react';
import { getConnection, closeConnection } from '../lib/motherduck/connection';

export function useMotherDuck() {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingState, setLoadingState] = useState({
    isComplete: false,
    stages: [
      {
        id: 'connection',
        label: 'Connecting to MotherDuck',
        status: 'pending',
        progress: 0
      }
    ]
  });

  useEffect(() => {
    const connect = async () => {
      try {
        setLoadingState(prev => ({
          ...prev,
          stages: prev.stages.map(stage => 
            stage.id === 'connection' 
              ? { ...stage, status: 'loading', progress: 50 }
              : stage
          )
        }));

        await getConnection();
        
        setLoadingState(prev => ({
          isComplete: true,
          stages: prev.stages.map(stage => 
            stage.id === 'connection'
              ? { ...stage, status: 'complete', progress: 100 }
              : stage
          )
        }));
        
        setIsConnected(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to MotherDuck');
        setLoadingState(prev => ({
          ...prev,
          stages: prev.stages.map(stage =>
            stage.id === 'connection'
              ? { ...stage, status: 'error', progress: 0 }
              : stage
          )
        }));
      }
    };

    connect();

    return () => {
      closeConnection();
    };
  }, []);

  return { isConnected, error, loadingState };
}