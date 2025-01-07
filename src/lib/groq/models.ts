import type { GroqModel } from './types';

export const GROQ_MODELS: GroqModel[] = [
  {
    id: 'mixtral-8x7b-32768',
    name: 'Mixtral 8x7B',
    description: 'Balanced performance for business analysis',
    maxTokens: 32768
  }
];

export async function fetchAvailableModels(token: string): Promise<GroqModel[]> {
  try {
    const response = await fetch('https://api.groq.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch GROQ models');
    }

    const data = await response.json();
    
    return data.data.map((model: any) => ({
      id: model.id,
      name: model.id.split('-').map((word: string) => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' '),
      description: 'AI model for analysis',
      maxTokens: model.context_window || 8192
    }));
  } catch (error) {
    console.error('Failed to fetch GROQ models:', error);
    return GROQ_MODELS;
  }
}
