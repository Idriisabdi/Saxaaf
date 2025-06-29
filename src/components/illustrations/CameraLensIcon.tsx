import type { SVGProps } from 'react';

const CameraLensIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`
      @keyframes lens-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes lens-pulse {
        0%, 100% { stroke-width: 2; opacity: 0.5; }
        50% { stroke-width: 3; opacity: 0.8; }
      }
      .lens-aperture {
        transform-origin: center;
        animation: lens-rotate 20s linear infinite;
      }
      .lens-outer-ring {
        animation: lens-pulse 4s ease-in-out infinite;
        transform-origin: center;
      }
    `}</style>
    <circle cx="32" cy="32" r="30" fill="none" stroke="hsl(var(--foreground))" className="lens-outer-ring" />
    <g className="lens-aperture" stroke="hsl(var(--secondary))" strokeWidth="6" strokeLinecap="round" fill="none">
      <path d="M48,16 A24,24 0 0,0 32,10" />
      <path d="M16,48 A24,24 0 0,0 32,54" />
      <path d="M10,32 A24,24 0 0,0 16,16" />
      <path d="M54,32 A24,24 0 0,0 48,48" />
    </g>
    <circle cx="32" cy="32" r="12" fill="hsl(var(--primary))" fillOpacity="0.1" />
  </svg>
);
export default CameraLensIcon;
