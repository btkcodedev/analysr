import type { AirbyteConfig, SyncJobResponse } from "./types";
import { getAirbyteApiUrl } from "../../config/services";

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  'X-Request-Timestamp': Date.now().toString(),
};

export async function checkConnectionStatus(
  config: AirbyteConfig
): Promise<boolean> {
  try {
    if (!config.bearerToken) {
      throw new Error("Bearer token is required");
    } 
    const url = getAirbyteApiUrl()
    const response = await fetch(`${url}/sources?_=${Date.now()}`, {
      method: "GET",
      headers: {
        ...noCacheHeaders,
        authorization: `Bearer ${config.bearerToken}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Connection check failed: ${response.statusText}`);
    }

    await response.json();
    return response.ok;
  } catch (error) {
    console.error("Connection check error:", error);
    return false;
  }
}

export async function triggerJob(
  config: AirbyteConfig,
  jobType: "sync" | "reset"
): Promise<SyncJobResponse> {
  if (!config.bearerToken || !config.connectionId) {
    throw new Error("Missing required Airbyte configuration");
  }

  try {
    const url = getAirbyteApiUrl()
    const response = await fetch(`${url}/jobs?_=${Date.now()}`, {
      method: "POST",
      headers: {
        ...noCacheHeaders,
        authorization: `Bearer ${config.bearerToken}`,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jobType,
        connectionId: config.connectionId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message ||
          `Airbyte API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return {
      jobId: data.jobId,
      status: data.status,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      connectionId: config.connectionId,
      error: data.error,
    };
  } catch (error) {
    console.error("Airbyte job error:", error);
    throw error;
  }
}
