export const AIRBYTE_SUPABASE_PROXY_URL = "https://lejxudxaxuqfkhtgddoe.supabase.co/functions/v1/apiProxy/airbyte";
export const AIRBYTE_LOCAL_PROXY_URL = "/api/airbyte";
export const AIRBYTE_API_BASE_URL = "https://api.airbyte.com/v1";
export const GROQ_SUPABASE_PROXY_URL = "https://lejxudxaxuqfkhtgddoe.supabase.co/functions/v1/apiProxy/groq";
export const GROQ_LOCAL_PROXY_URL = "/api/groq";
export const GROQ_API_BASE_URL = "https://api.groq.com/v1";

export const getAirbyteApiUrl = () => {
    if (import.meta.env.DEV) {
      return AIRBYTE_LOCAL_PROXY_URL;
    }
    return AIRBYTE_SUPABASE_PROXY_URL;
  };
  
  export const getGroqApiUrl = () => {
    if (import.meta.env.DEV) {
      return GROQ_LOCAL_PROXY_URL;
    }
    return GROQ_SUPABASE_PROXY_URL;
  };
