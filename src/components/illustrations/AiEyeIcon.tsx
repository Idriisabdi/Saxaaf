import type { SVGProps } from 'react';

const AiEyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <mask id="eye-mask">
        <circle cx="32" cy="32" r="30" fill="white" />
      </mask>
      <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="16" height="16">
        <path d="M0 8h8M8 0v8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      </pattern>
    </defs>
    <g mask="url(#eye-mask)">
      {/* Organic half (Orange) */}
      <rect x="0" y="0" width="32" height="64" fill="hsl(var(--secondary))" fillOpacity="0.5" />
      <circle cx="32" cy="32" r="10" fill="hsl(var(--secondary))" />
      <path d="M32,2 C16,10 12,24 12,32 S16,54 32,62" fill="none" stroke="hsl(var(--secondary))" strokeWidth="2" strokeOpacity="0.8" />
      
      {/* Tech half (Red) */}
      <rect x="32" y="0" width="32" height="64" fill="url(#circuit-pattern)" />
    </g>
    <circle cx="32" cy="32" r="30" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.5" strokeWidth="2" />
  </svg>
);
export default AiEyeIcon;
