import type { SVGProps } from 'react';

const AiEyeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`
      @keyframes circuit-flow {
        from { background-position: 0 0; }
        to { background-position: 0 -32px; }
      }
       @keyframes pulse-organic {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      .circuit-rect {
        animation: circuit-flow 2s linear infinite;
      }
      .organic-half {
        animation: pulse-organic 4s ease-in-out infinite;
        transform-origin: 32px 32px;
      }
    `}</style>
    <defs>
      <mask id="eye-mask">
        <circle cx="32" cy="32" r="30" fill="white" />
      </mask>
      <pattern id="circuit-pattern" patternUnits="userSpaceOnUse" width="16" height="16">
        <path d="M0 8h8M8 0v8 M8 8h8 M16 0v8" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
      </pattern>
    </defs>
    <g mask="url(#eye-mask)">
      {/* Organic half (Orange) */}
      <g className="organic-half">
        <rect x="0" y="0" width="32" height="64" fill="hsl(var(--secondary))" fillOpacity="0.5" />
        <circle cx="32" cy="32" r="10" fill="hsl(var(--secondary))" />
        <path d="M32,2 C16,10 12,24 12,32 S16,54 32,62" fill="none" stroke="hsl(var(--secondary))" strokeWidth="2" strokeOpacity="0.8" />
      </g>
      
      {/* Tech half (Red) */}
      <rect x="32" y="0" width="32" height="64" fill="url(#circuit-pattern)" className="circuit-rect"/>
    </g>
    <circle cx="32" cy="32" r="30" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.5" strokeWidth="2" />
  </svg>
);
export default AiEyeIcon;
