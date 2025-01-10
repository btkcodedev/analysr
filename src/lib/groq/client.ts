import { Groq } from 'groq-sdk';
import { GROQ_MODELS } from './models';

export function getGroqClient(token: string) {
  if (!token) {
    throw new Error('GROQ token not provided');
  }

  return new Groq({
    apiKey: token,
    dangerouslyAllowBrowser: true
  });
}

export async function generateBusinessInsights({
  token,
  stack,
  substack,
  interests="",
  positiveInsights,
  negativeInsights,
  emojiStats,
  aspectAnalysis,
  totalReviews,
  averageRating,
  sentimentScore,
  model = 'mixtral-8x7b-32768'
}: {
  token: string;
  stack: string;
  substack: string;
  interests?: string;
  positiveInsights: Array<{
    category: string;
    rating: number;
    frequency: number;
  }>;
  negativeInsights: Array<{
    phrase: string;
    frequency: number;
    severity: string;
  }>;
  emojiStats: Array<{
    emoji: string;
    count: number;
    avgRating: number;
  }>;
  aspectAnalysis: Array<{
    aspect: string;
    avgRating: number;
    mentionCount: number;
  }>;
  totalReviews: number;
  averageRating: number;
  sentimentScore: number;
  model?: string;
}) {
  const client = getGroqClient(token);
  const selectedModel = GROQ_MODELS.find(m => m.id === model) || GROQ_MODELS[0];
  const extraQuery = interests.length ? `Return in favour for these categorys: ${interests}` : '';
  const prompt = `As a business analytics expert for ${stack}, specifically in ${substack}, analyze this data:

Key Metrics:
- Total Reviews: ${totalReviews}
- Average Rating: ${averageRating.toFixed(1)}/5.0
- Sentiment Score: ${sentimentScore.toFixed(1)}%

Top Performing Areas:
${positiveInsights.map(insight => `- ${insight.category}: ${insight.frequency} mentions, ${insight.rating.toFixed(1)}/5.0`).join('\n')}

Critical Issues:
${negativeInsights.map(insight => `- ${insight.phrase}: ${insight.frequency} mentions, Severity: ${insight.severity}`).join('\n')}

Customer Sentiment (Emoji Analysis):
${emojiStats.map(stat => `- ${stat.emoji}: ${stat.count} uses, ${stat.avgRating.toFixed(1)}/5.0`).join('\n')}

Service Aspects:
${aspectAnalysis.map(aspect => `- ${aspect.aspect}: ${aspect.avgRating.toFixed(1)}/5.0 (${aspect.mentionCount} mentions)`).join('\n')}

Provide three focused sections with exactly 2 actionable points each:

1. Immediate Actions (0-3 months):
- [Most critical action based on negative insights]
- [Most impactful improvement based on positive trends]

2. Growth Strategy (3-6 months):
- [Key opportunity from positive insights]
- [Strategic improvement from aspect analysis]

3. Long-term Excellence (6-12 months):
- [Innovation opportunity from customer sentiment]
- [Competitive advantage from top performing areas]

Keep each point specific, actionable, and directly tied to the data. Focus on the ${substack} sector specifically. ${extraQuery}`;

  const completion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: selectedModel.id,
    temperature: 0.7,
    max_tokens: Math.min(selectedModel.maxTokens, 768),
    // TODO: For next release
    // top_p: 0.8, //Focus finetuning
    // presence_penalty: 0.3 // Diverse insights finetuning
  });

  return completion.choices[0]?.message?.content || '';
}
