import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";
import type { AspectAnalysis as AspectAnalysisType } from "../../../lib/motherduck/types";
import Tooltip from "../../common/Tooltip/Tooltip";

interface AspectAnalysisProps {
  data: AspectAnalysisType[];
}

export default function AspectAnalysis({ data }: AspectAnalysisProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6"
    >
      <h3 className="text-xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
        <BarChart3 className="text-purple-400" />
        Service Aspect Analysis
        <Tooltip content="Analysis of different service aspects and their average ratings based on customer feedback" />
      </h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="aspect"
              stroke="#9CA3AF"
              angle={-45}
              textAnchor="end"
              height={60}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis stroke="#9CA3AF" />
            <RechartsTooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-xl">
                    <p className="font-medium mb-1">{data.aspect}</p>
                    <p className="text-sm text-gray-300">{data.description}</p>
                    <div className="mt-2 pt-2 border-t border-gray-700">
                      <p className="text-sm text-gray-400">
                        Average Rating:{" "}
                        <span className="text-purple-400">
                          {data.avgRating.toFixed(1)}
                        </span>
                      </p>
                      <p className="text-sm text-gray-400">
                        Mentions:{" "}
                        <span className="text-purple-400">
                          {data.mentionCount}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="avgRating"
              fill="#8B5CF6"
              radius={[4, 4, 0, 0]}
              label={{
                position: "top",
                fill: "#9CA3AF",
                fontSize: 12,
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.map((aspect) => (
          <div key={aspect.aspect} className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-medium text-gray-300">
                {aspect.aspect}
              </h4>
              <Tooltip content={aspect.description!} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">
                {aspect.avgRating.toFixed(1)}
              </span>
              <span className="text-sm text-gray-400">
                {aspect.mentionCount} mentions
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
