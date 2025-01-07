import { useState } from 'react';
import type { BusinessData } from '../components/onboarding/OnboardingForm';
export type DataLimit = number | 'All';

const DEFAULT_VALUES: BusinessData = {
  stack: '',
  substack: '',
  interests: '',
  database: '',
  tableName: '',
  limit: 1000,
  motherduckToken: '',
  groqToken: '',
  airbyteToken: '',
  airbyteConnectionId: ''
};

export function useOnboardingForm() {
  const [formData, setFormData] = useState<BusinessData>(DEFAULT_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const updateFormData = (updates: Partial<BusinessData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };
  
  return {
    formData,
    isSubmitting,
    setIsSubmitting,
    updateFormData
  };
}