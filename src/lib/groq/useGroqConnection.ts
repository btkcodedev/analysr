import { useState, useEffect } from 'react';
import { Groq } from 'groq-sdk';
import type { StatusState } from '../../types/status';

export function useGroqConnection(token?: string): StatusState {
  const [status, setStatus] = useState<StatusState>({
    status: 'loading',
    lastUpdated: null,
    message: 'Initializing GROQ connection...'
  });

  useEffect(() => {
    if (!token) {
      setStatus({
        status: 'error',
        lastUpdated: null,
        message: 'Please enter your GROQ token'
      });
      return;
    }

    let isSubscribed = true;

    const checkConnection = async () => {
      try {
        setStatus(prev => ({
          ...prev,
          status: 'loading',
          message: 'Verifying GROQ token...'
        }));

        // Create a test client and make a simple request to verify the token
        const client = new Groq({
          apiKey: token,
          dangerouslyAllowBrowser: true
        });

        const completion = await client.chat.completions.create({
          messages: [{ role: 'user', content: 'Test connection' }],
          model: 'mixtral-8x7b-32768',
          max_tokens: 1
        });

        if (!isSubscribed) return;

        if (completion) {
          setStatus({
            status: 'success',
            lastUpdated: new Date(),
            message: 'Connected to GROQ'
          });
        }
      } catch (err) {
        if (!isSubscribed) return;
        
        setStatus({
          status: 'error',
          lastUpdated: new Date(),
          message: err instanceof Error ? err.message : 'GROQ connection failed'
        });
      }
    };

    checkConnection();

    return () => {
      isSubscribed = false;
    };
  }, [token]);

  return status;
}