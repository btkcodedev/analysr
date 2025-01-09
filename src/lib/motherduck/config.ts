import { z } from "zod";
import { useTokenStore } from "./tokenStore";

const configSchema = z.object({
  token: z.string().min(1, "Token is required"),
  database: z.string(),
});

export function getMotherDuckConfig() {
  const storedToken = useTokenStore.getState().token;

  if (!storedToken) {
    throw new Error("Please enter your MotherDuck token");
  }

  return configSchema.parse({
    token: storedToken,
    database: "analysr",
  });
}
