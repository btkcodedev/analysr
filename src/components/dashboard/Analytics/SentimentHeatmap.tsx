import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import TooltipComponent from '../../common/Tooltip/Tooltip';

interface SentimentData {
  name: string;
  size: number;
  sentiment: number;
}

const SENTIMENT_WORDS: SentimentData[] = [
  { name: 'Love', size: 800, sentiment: 1 },
  { name: 'Amazing', size: 700, sentiment: 0.9 },
  { name: 'Great', size: 600, sentiment: 0.8 },
  { name: 'Good', size: 500, sentiment: 0.6 },
  { name: 'Okay', size: 400, sentiment: 0.2 },
  { name: 'Neutral', size: 300, sentiment: 0 },
  { name: 'Poor', size: 250, sentiment: -0.4 },
  { name: 'Bad', size: 200, sentiment: -0.6 },
  { name: 'Terrible', size: 150, sentiment: -0.8 },
  { name: 'Hate', size: 100, sentiment: -1 }
];

const getSentimentColor = (sentiment: number) => {
  if (sentiment > 0.5) return '#22c55e'; // Green for very positive
  if (sentiment > 0) return '#86efac'; // Light green for positive
  if (sentiment === 0) return '#6b7280'; // Gray for neutral
  if (sentiment > -0.5) return '#fca5a5'; // Light red for negative
  return '#ef4444'; // Red for very negative
};

export default function SentimentHeatmap() {
  const data = {
    name: 'sentiment',
    children: SENTIMENT_WORDS
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
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={[data]}
            dataKey="size"
            stroke="#374151"
            fill="#374151"
            content={(props: any) => {
              const { depth, x, y, width, height, name, sentiment } = props;
          
              if (depth === 1) {
                return (
                  <g>
                    <rect
                      x={x}
                      y={y}
                      width={width}
                      height={height}
                      fill={getSentimentColor(sentiment)}
                      stroke="#374151"
                    />
                    {width > 30 && height > 30 && (
                      <text
                        x={x + width / 2}
                        y={y + height / 2}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize={12}
                        className="select-none pointer-events-none"
                      >
                        {name}
                      </text>
                    )}
                  </g>
                );
              }
              return null;
            }}
          >
            <Tooltip
              content={({ payload }) => {
                if (!payload?.[0]?.payload) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                    <p className="font-medium">{data.name}</p>
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
