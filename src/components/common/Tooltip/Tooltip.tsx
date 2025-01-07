import { Tooltip as MuiTooltip } from '@mui/material';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
  content: string;
  icon?: boolean;
  className?: string;
}

export default function Tooltip({ content, icon = true, className = '' }: TooltipProps) {
  return (
    <MuiTooltip 
      title={content}
      arrow
      placement="top"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'rgb(31 41 55 / 0.95)',
            '& .MuiTooltip-arrow': {
              color: 'rgb(31 41 55 / 0.95)',
            },
            border: '1px solid rgb(55 65 81 / 0.5)',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            fontSize: '0.875rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", Inter, system-ui, sans-serif',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: 280,
            padding: '0.5rem 0.75rem',
          },
        },
      }}
    >
      <span 
        className={`text-gray-400 hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full inline-flex ${className}`}
      >
        {icon && <HelpCircle className="w-4 h-4" />}
      </span>
    </MuiTooltip>
  );
}