import { LOADING_STAGES } from "../hooks/useAnalytics";

export interface SentimentTrend {
  month: string;
  avgRating: number;
  reviewCount: number;
}

export interface AspectAnalysis {
  description?: string;
  aspect: string;
  avgRating: number;
  mentionCount: number;
}

export interface NegativeInsight {
  phrase: string;
  frequency: number;
  rating: number;
  percentage: number;
  severity: string;
}

export interface KeyPhrase {
  text: string;
  sentiment: number;
  occurrences: number;
};

export interface PositiveInsight {
  category: string;
  rating: number;
  frequency: number;
  percentage: number;
  description: string;
}

export interface EmojiStat {
  emoji: string;
  count: number;
  avgRating: number;
}

export interface PunctuationStats {
  questionMarks: number;
  questionAvgRating: number;
  exclamationMarks: number;
  exclamationAvgRating: number;
}

export interface CapsAnalysis {
  stars: number;
  capsPercentage: number;
}

export interface KeyPhrase {
  text: string;
  occurrences: number;
  sentiment: number;
}

export interface TextAnalysis {
  emojiStats: EmojiStat[];
  punctuationStats: PunctuationStats;
  capsAnalysis: CapsAnalysis[];
  keyPhrases: KeyPhrase[];
}

export interface Analytics {
  totalReviews: number;
  averageRating: number;
  sentimentScore: number;
  competitorComparison: number;
  aspectAnalysis: AspectAnalysis[];
  negativeInsights: NegativeInsight[];
  positiveInsights: PositiveInsight[];
  textAnalysis: TextAnalysis;
}

export type LoadingStageId = (typeof LOADING_STAGES)[keyof typeof LOADING_STAGES];
