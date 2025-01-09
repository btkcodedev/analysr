import { motion } from "framer-motion";
import ProgressLoader from "../../common/ProgressLoader";
import DebugInfo from "../../common/DataInfo/DebugInfo";

interface DashboardLoadingProps {
  loadingState: any;
  debugInfo: {
    status: string;
    details?: string;
    timestamp?: string;
    queryCount?: number;
    groqStatus?: string;
  };
  onLoadComplete: () => void;
}

export default function DashboardLoading({
  loadingState,
  debugInfo,
  onLoadComplete,
}: DashboardLoadingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-6">
      <ProgressLoader
        loadingState={loadingState}
        onLoadComplete={onLoadComplete}
      />
      <DebugInfo title="Connection Status" info={debugInfo} />
      {debugInfo.groqStatus && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-gray-400"
        >
          GROQ Status: {debugInfo.groqStatus}
        </motion.div>
      )}
    </div>
  );
}
