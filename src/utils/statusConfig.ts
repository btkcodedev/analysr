import type { DataStatus, StatusConfig } from '../types/status';

export const getStatusConfig = (status: DataStatus): StatusConfig => {
  const configs: Record<DataStatus, StatusConfig> = {
    error: {
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20'
    },
    loading: {
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/20'
    },
    success: {
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    },
    stale: {
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20'
    }
  };

  return configs[status];
};