import { BarChart3 } from 'lucide-react';

export function Logo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 blur-xl bg-blue-500/30 rounded-full" />
      <BarChart3 className={`${className} text-blue-500 relative z-10`} />
    </div>
  );
}

export function LogoSVG() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-blue-500"
    >
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}