import {
  AspectAnalysis,
  PositiveInsight,
  TextAnalysis,
} from "../../types/analytics";

export interface NegativeInsight {
  phrase: string;
  frequency: number;
  rating: number;
  percentage: number;
  severity: string;
}

export interface ProcessedAnalytics {
  keyPhrases?: any;
  totalReviews: number;
  averageRating: number;
  sentimentScore: number;
  competitorComparison: number;
  aspectAnalysis: AspectAnalysis[];
  negativeInsights: NegativeInsight[];
  positiveInsights: PositiveInsight[];
  textAnalysis: TextAnalysis;
}
export type { AspectAnalysis };

export interface Dataset {
  id: string;
  name: string;
  description: string;
  source: string;
  database: string;
  tableName: string;
}
