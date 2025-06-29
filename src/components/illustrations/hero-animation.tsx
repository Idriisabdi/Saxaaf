'use client';

import { useState, useEffect, type SVGProps } from 'react';

const HeroAnimation = (props: SVGProps<SVGSVGElement>) => {
  const [particleRadii, setParticleRadii] = useState<number[]>([]);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    const radii = Array.from({ length: 25 }, () => 1 + Math.random() * 2);
    setParticleRadii(radii);
  }, []); // Empty dependency array ensures this runs only once.

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <defs>
        <linearGradient id="creative-stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="tech-stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
        </linearGradient>
        <filter id="glow-filter">
          <feGaussianBlur stdDeviation="5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="center-clip">
          <rect x="350" y="0" width="100" height="600" />
        </clipPath>
      </defs>
      
      <style>{`
        @keyframes pulse-core {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes creative-flow {
          from { stroke-dashoffset: 1200; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes tech-flow {
          from { stroke-dashoffset: 800; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes tech-construct {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.8); }
        }
        @keyframes icon-fade-in-out {
          0%, 100% { opacity: 0; transform: translateY(20px) scale(0.8); }
          50% { opacity: 0.7; transform: translateY(0) scale(1); }
        }
        @keyframes particle-drift {
          from { transform: translateX(0px) scale(1); opacity: 1; }
          to { transform: translateX(50px) scale(0.5); opacity: 0; }
        }
        @keyframes synergy-burst {
            0% { transform: scale(0); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: scale(1.5); opacity: 0; }
        }
        .ai-core { animation: pulse-core 5s ease-in-out infinite; transform-origin: center; }
        .creative-stream-path {
          stroke-dasharray: 1200;
          animation: creative-flow 10s ease-in-out infinite alternate;
        }
        .tech-stream-path {
          stroke-dasharray: 800;
          animation: tech-flow 6s linear infinite;
        }
        .tech-ui {
          animation: tech-construct 6s ease-in-out infinite;
          transform-origin: 150px 300px;
        }
        .creative-icon {
          animation: icon-fade-in-out 6s ease-in-out infinite;
          transform-origin: center;
        }
        .creative-particle {
          animation: particle-drift 4s ease-in-out infinite;
        }
        .synergy-burst {
            animation: synergy-burst 3s ease-out infinite;
            transform-origin: center;
        }
      `}</style>

      {/* Background Grids */}
      <g opacity="0.2" stroke="hsl(var(--primary))" strokeWidth="0.5">
          {Array.from({ length: 20 }).map((_, i) => (
              <line key={'v-' + i} x1={i * 40} y1="0" x2={i * 40} y2="600" />
          ))}
          {Array.from({ length: 15 }).map((_, i) => (
              <line key={'h-' + i} x1="0" y1={i * 40} x2="800" y2={i * 40} />
          ))}
      </g>

      {/* AI Core */}
      <g className="ai-core" transform="translate(400, 300)" filter="url(#glow-filter)">
        <circle cx="0" cy="0" r="40" fill="hsl(var(--foreground))" />
        <circle cx="0" cy="0" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="1"/>
        <path d="M -20 -5 a 20 10 0 0 1 40 0" stroke="hsl(var(--secondary))" strokeWidth="3" fill="none" />
        <path d="M -20 5 a 20 10 0 0 0 40 0" stroke="hsl(var(--secondary))" strokeWidth="3" fill="none" />
      </g>

      {/* Creative Stream (Left) */}
      <g>
        <path className="creative-stream-path" d="M 400,300 C 200,100 250,500 50,300" fill="none" stroke="url(#creative-stream-gradient)" strokeWidth="40" filter="url(#glow-filter)"/>
        {/* Creative Particles */}
        {particleRadii.length > 0 && particleRadii.map((radius, i) => (
           <circle key={'p-' + i} className="creative-particle" r={radius} fill="hsl(var(--secondary))" style={{ animationDelay: `${i * 0.15}s` }}>
             <animateMotion dur="10s" repeatCount="indefinite" path="M 400,300 C 200,100 250,500 50,300" />
           </circle>
        ))}
        {/* Creative Icons */}
        <g fill="hsl(var(--secondary))" opacity="0.7">
          <path className="creative-icon" d="M 200 180 l 15 10 l -15 10 z" style={{ animationDelay: '0s' }}/>
          <circle className="creative-icon" cx="250" cy="350" r="10" style={{ animationDelay: '2s' }}/>
          <path className="creative-icon" d="M 150 450 q 10 -20 20 0 t 20 0" stroke="hsl(var(--secondary))" strokeWidth="2" fill="none" style={{ animationDelay: '4s' }} />
        </g>
      </g>

      {/* Tech Stream (Right) */}
      <g>
        <path className="tech-stream-path" d="M 400,300 C 600,100 550,500 750,300" fill="none" stroke="url(#tech-stream-gradient)" strokeWidth="2" />
        {/* Tech UI Wireframe */}
        <g className="tech-ui" transform="translate(450, 150)" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity="0.15" strokeWidth="1">
            <rect x="0" y="0" width="250" height="300" rx="10" />
            <line x1="0" y1="40" x2="250" y2="40" />
            <rect x="10" y="10" width="20" height="20" rx="4" fillOpacity="1" />
            <rect x="10" y="60" width="80" height="150" rx="5" />
            <rect x="100" y="60" width="140" height="80" rx="5" />
            <rect x="100" y="150" width="140" height="60" rx="5" />
        </g>
      </g>

       {/* Synergy and Logo formation */}
       <g clipPath="url(#center-clip)">
            <g filter="url(#glow-filter)">
                <path className="creative-stream-path" d="M50,300 C 350,200 350,400 400,300" stroke="hsl(var(--secondary))" strokeWidth="3" fill="none" style={{ animationDelay: '-2s' }}/>
                <path className="tech-stream-path" d="M750,300 C 450,200 450,400 400,300" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" style={{ animationDelay: '-1s' }}/>
            </g>
       </g>
       <g transform="translate(400, 300)" filter="url(#glow-filter)">
            <circle className="synergy-burst" cx="0" cy="0" r="50" fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" style={{ animationDelay: '0s' }} />
            <circle className="synergy-burst" cx="0" cy="0" r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" style={{ animationDelay: '0.5s' }} />
        </g>
    </svg>
  );
};

export default HeroAnimation;
