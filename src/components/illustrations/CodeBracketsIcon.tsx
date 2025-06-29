import type { SVGProps } from 'react';

const CodeBracketsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`
      @keyframes bracket-float-left {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(-4px); }
      }
      @keyframes bracket-float-right {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(4px); }
      }
      .bracket-left { animation: bracket-float-left 5s ease-in-out infinite; }
      .bracket-right { animation: bracket-float-right 5s ease-in-out infinite; }
    `}</style>
    <defs>
      <linearGradient id="code-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 0.2 }} />
      </linearGradient>
    </defs>
    <path className="bracket-left" d="M20,12 L4,32 L20,52" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path className="bracket-right" d="M44,12 L60,32 L44,52" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M28,14 L36,50" stroke="url(#code-grad)" strokeWidth="8" strokeLinecap="round" />
  </svg>
);
export default CodeBracketsIcon;
