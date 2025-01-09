import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenStore {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useTokenStore = create<TokenStore>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
    }),
    {
      name: "motherduck-token",
    }
  )
);
