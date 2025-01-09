import { AlertCircle } from "lucide-react";

interface DashboardErrorProps {
  error: string;
  debugInfo: string;
}

export default function DashboardError({
  error,
  debugInfo,
}: DashboardErrorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center p-6">
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center gap-3 text-red-400 mb-4">
          <AlertCircle />
          <h2 className="text-lg font-semibold">Error Loading Dashboard</h2>
        </div>
        <p className="text-gray-300 mb-4">{error}</p>
        <pre className="bg-gray-900/50 p-4 rounded-lg text-sm font-mono text-gray-400 whitespace-pre-wrap">
          {debugInfo}
        </pre>
      </div>
    </div>
  );
}
