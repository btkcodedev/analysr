import { useState, useEffect } from "react";
import { Brain, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatusIndicator from "../../common/ProgressLoader/StatusIndicator";
import Tooltip from "../../common/Tooltip/Tooltip";
import { useGroqConnection } from "../../../hooks/useGroqConnection";

interface GroqConnectionProps {
  token?: string;
  onTokenChange: (token: string) => void;
  onConnectionSuccess: () => void;
  onConnectionError: () => void;
}

export default function GroqConnection({
  token,
  onTokenChange,
  onConnectionSuccess,
  onConnectionError,
}: GroqConnectionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const connectionStatus = useGroqConnection(token);

  useEffect(() => {
    if (connectionStatus.status === "success") {
      onConnectionSuccess();
    } else if (connectionStatus.status === "error") {
      onConnectionError();
    }
  }, [connectionStatus.status, onConnectionSuccess, onConnectionError]);

  return (
    <div>
      <div className="flex items-center mb-2">
        <Brain className="mr-2 text-red-400" />
        <span className="text-lg font-medium">GROQ Configuration</span>
        <Tooltip
          content="Add a GROQ token to enable AI-powered insights. This is optional but recommended for enhanced analytics"
          icon={true}
          className="ml-2"
        />
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="password"
            value={token || ""}
            onChange={(e) => onTokenChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Enter your GROQ API key (optional)"
            className={`w-full px-4 py-3 pr-12 rounded-lg bg-gray-800/80 border transition-all duration-200 ${
              isFocused
                ? "border-purple-500 ring-1 ring-purple-500/50"
                : "border-gray-700"
            } ${
              connectionStatus.status === "error" ? "border-red-500/50" : ""
            }`}
          />
          <AnimatePresence>
            {connectionStatus.status === "loading" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {connectionStatus.status !== "stale" && (
          <AnimatePresence mode="wait">
            <motion.div
              key={connectionStatus.status}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <StatusIndicator {...connectionStatus} />
            </motion.div>
          </AnimatePresence>
        )}
        <p className="text-sm text-gray-400">
          GROQ integration enables AI-powered business insights and
          recommendations
        </p>
      </div>
    </div>
  );
}
