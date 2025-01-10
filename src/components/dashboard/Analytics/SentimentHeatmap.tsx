import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import TooltipComponent from '../../common/Tooltip/Tooltip';
import NoDataFallback from '../../common/DataInfo/NoDataFallback';

export interface SentimentData {
  name: string;
  size: number;
  sentiment: number;
}

const getSentimentColor = (sentiment: number) => {
  if (sentiment > 0.5) return '#22c55e'; // Green for very positive
  if (sentiment > 0) return '#86efac'; // Light green for positive
  if (sentiment === 0) return '#6b7280'; // Gray for neutral
  if (sentiment > -0.5) return '#fca5a5'; // Light red for negative
  return '#ef4444'; // Red for very negative
};

const CustomizedContent = (props: any) => {
  const { x, y, width, height, name, sentiment } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={getSentimentColor(sentiment)}
        stroke="#1f2937"
        strokeWidth={1}
      />
      {width > 40 && height > 25 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={12}
          className="select-none pointer-events-none"
        >
          {name}
        </text>
      )}
    </g>
  );
};

interface SentimentHeatmapProps {
  data: SentimentData[];
}

export default function SentimentHeatmap({ data }: SentimentHeatmapProps) {
  if (!data || data.length === 0) {
    return <NoDataFallback message="No sentiment heatmap insights available yet" />;
  }

  const transformedData = {
    name: 'sentiment',
    children: data.map(item => ({
      name: item.name,
      value: item.size,
      size: item.size,
      sentiment: item.sentiment
    }))
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6"
    >
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Heart className="text-red-400" />
        Word Sentiment Analysis
        <TooltipComponent content="Heatmap showing the sentiment distribution of common words in reviews" />
      </h3>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer>
          <Treemap
            data={transformedData.children}
            dataKey="value"
            aspectRatio={4/3}
            stroke="#1f2937"
            animationDuration={450}
            content={<CustomizedContent />}
          >
            <Tooltip
              content={({ payload }) => {
                if (!payload?.[0]?.payload) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-sm text-gray-400">
                      Frequency: {data.size}
                    </p>
                    <p className="text-sm text-gray-400">
                      Sentiment: {(data.sentiment * 100).toFixed(0)}%
                    </p>
                  </div>
                );
              }}
            />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}