import { useState } from "react";
import { Database } from "lucide-react";
import { motion } from "framer-motion";
import Tooltip from "../../common/Tooltip/Tooltip";
import AirbyteSyncButton from "./AirbyteSyncButton";

interface AirbyteConfigProps {
  airbyteToken?: string;
  onAirbyteTokenChange: (token: string) => void;
  airbyteConnectionId?: string;
  onAirbyteConnectionIdChange: (id: string) => void;
}

export default function AirbyteConfig({
  airbyteToken,
  onAirbyteTokenChange,
  airbyteConnectionId,
  onAirbyteConnectionIdChange,
}: AirbyteConfigProps) {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const showSyncButton = Boolean(airbyteToken && airbyteConnectionId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 pt-4 border-t border-gray-700"
    >
      <div className="flex items-center mb-2">
        <Database className="mr-2 text-purple-400" />
        <p className="text-lg font-medium">Optional Airbyte Configuration</p>
        <Tooltip
          content="Configure Airbyte integration to trigger sync from external sources"
          icon={true}
          className="ml-2"
        />
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="password"
            value={airbyteToken || ""}
            onChange={(e) => onAirbyteTokenChange(e.target.value)}
            onFocus={() => setFocusedField("token")}
            onBlur={() => setFocusedField(null)}
            placeholder="Airbyte bearer token (optional)"
            className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 border transition-all duration-200 ${
              focusedField === "token"
                ? "border-purple-500 ring-1 ring-purple-500/50"
                : "border-gray-700"
            }`}
          />
          <Tooltip
            content="Your Airbyte authentication token"
            icon={true}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        </div>

        <div className="relative">
          <input
            type="text"
            value={airbyteConnectionId || ""}
            onChange={(e) => onAirbyteConnectionIdChange(e.target.value)}
            onFocus={() => setFocusedField("connection")}
            onBlur={() => setFocusedField(null)}
            placeholder="Airbyte connection ID (optional)"
            className={`w-full px-4 py-3 rounded-lg bg-gray-800/80 border transition-all duration-200 ${
              focusedField === "connection"
                ? "border-purple-500 ring-1 ring-purple-500/50"
                : "border-gray-700"
            }`}
          />
          <Tooltip
            content="Find your unique Airbyte connection ID in the connections tab on https://cloud.airbyte.com/"
            icon={true}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          />
        </div>
        <p className="text-sm text-gray-400">
          Optionally, trigger an Airbyte sync or reset for your connection.
        </p>
        {showSyncButton && (
          <AirbyteSyncButton
            token={airbyteToken!}
            connectionId={airbyteConnectionId!}
          />
        )}
      </div>
    </motion.div>
  );
}
