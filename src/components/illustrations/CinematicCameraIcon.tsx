import type { SVGProps } from 'react';

const CinematicCameraIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Tripod */}
    <path d="M12 14.5L9 22" />
    <path d="M12 14.5L15 22" />
    <path d="M12 14.5V12" />

    {/* Camera Body */}
    <rect x="1" y="5" width="16" height="7" rx="1" />
    
    {/* Lens with Matte Box */}
    <path d="M17 8.5H23L21 11.5H17Z" />

    {/* Film Magazines */}
    <circle cx="5" cy="5" r="2" />
    <circle cx="12" cy="5" r="2" />
  </svg>
);

export default CinematicCameraIcon;
