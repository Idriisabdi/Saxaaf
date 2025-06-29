import type { SVGProps } from 'react';

const CameraLensIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`
      @keyframes lens-rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      .lens-aperture {
        transform-origin: center;
        animation: lens-rotate 20s linear infinite;
      }
    `}</style>
    <circle cx="32" cy="32" r="30" fill="none" stroke="hsl(var(--foreground))" strokeOpacity="0.5" strokeWidth="2" />
    <g className="lens-aperture" stroke="hsl(var(--secondary))" strokeWidth="6" strokeLinecap="round" fill="none">
      <path d="M48,16 A24,24 0 0,0 32,10" />
      <path d="M16,48 A24,24 0 0,0 32,54" />
      <path d="M10,32 A24,24 0 0,0 16,16" />
      <path d="M54,32 A24,24 0 0,0 48,48" />
    </g>
  </svg>
);
export default CameraLensIcon;
