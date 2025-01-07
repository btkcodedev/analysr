import type { AirbyteConfig, SyncJobResponse } from './types';

const AIRBYTE_API_URL = 'https://api.airbyte.com/v1';

export async function checkConnectionStatus(config: AirbyteConfig): Promise<boolean> {
  try {
    if (!config.bearerToken) {
      return false;
    }

    const response = await fetch(`${AIRBYTE_API_URL}/connections`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${config.bearerToken}`,
        'Accept': 'application/json'
      }
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function triggerJob(config: AirbyteConfig, jobType: 'sync' | 'reset'): Promise<SyncJobResponse> {
  try {
    if (!config.bearerToken || !config.connectionId) {
      throw new Error('Missing required Airbyte configuration');
    }

    const response = await fetch(`${AIRBYTE_API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.bearerToken}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        jobType,
        connectionId: config.connectionId
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || 
        `Airbyte API error: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Airbyte job error:', error);
    throw error;
  }
}
