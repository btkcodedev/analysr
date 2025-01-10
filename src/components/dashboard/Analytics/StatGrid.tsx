import { BarChart, PieChart, TrendingUp, Users } from "lucide-react";
import StatCard from "./StatCard";

interface StatGridProps {
  analyticsData: {
    totalReviews: number;
    averageRating: number;
    sentimentScore: number;
    competitorComparison: number;
  };
}

export default function StatGrid({ analyticsData }: StatGridProps) {
  const stats = [
    {
      title: "Total Reviews",
      value: analyticsData.totalReviews,
      icon: BarChart,
      color: "blue",
    },
    {
      title: "Average Rating",
      value: analyticsData.averageRating.toFixed(1),
      icon: Users,
      color: "green",
    },
    {
      title: "Sentiment Score",
      value: `${analyticsData.sentimentScore.toFixed(2)}%`,
      icon: TrendingUp,
      color: "purple",
    },
    {
      title: "Competitive Advantage",
      value: `${
        analyticsData.competitorComparison > 0 ? "+" : ""
      }${analyticsData.competitorComparison.toFixed(1)}%`,
      icon: PieChart,
      color: analyticsData.competitorComparison >= 0 ? "emerald" : "red",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 max-w-7xl mx-auto px-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
}
