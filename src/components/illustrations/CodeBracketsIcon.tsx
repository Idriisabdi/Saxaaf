import type { SVGProps } from 'react';

const CodeBracketsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="code-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 0.8 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 0.2 }} />
      </linearGradient>
    </defs>
    <path d="M20,12 L4,32 L20,52" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M44,12 L60,32 L44,52" stroke="hsl(var(--primary))" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M22,16 L42,48" stroke="url(#code-grad)" strokeWidth="12" strokeLinecap="round" />
  </svg>
);
export default CodeBracketsIcon;
