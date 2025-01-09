import { AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react";
import type { StatusState } from "../../../types/status";
import { getStatusConfig } from "../../../utils/statusConfig";

const statusIcons = {
  error: AlertCircle,
  loading: Loader2,
  success: CheckCircle,
  stale: Clock,
} as const;

export default function StatusIndicator({
  status,
  lastUpdated,
  message,
}: StatusState) {
  const config = getStatusConfig(status);
  const Icon = statusIcons[status];

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.bgColor} ${config.borderColor} border`}
    >
      <div className={status === "loading" ? "animate-spin" : ""}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <div className="flex flex-col">
        <span className={`text-sm font-medium ${config.color}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
        {message && <span className="text-xs text-gray-400">{message}</span>}
        {lastUpdated && (
          <span className="text-xs text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}
