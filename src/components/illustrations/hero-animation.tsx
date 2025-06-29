'use client';

import { useState, useEffect } from 'react';

const pseudoRandom = (seed: number) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const HeroAnimation = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particleCount = 40;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    cx: `${pseudoRandom(i + 1) * 100}%`,
    cy: `${pseudoRandom(i + 2) * 100}%`,
    r: `${pseudoRandom(i + 3) * 1.5 + 0.5}`,
    animationDelay: `${pseudoRandom(i + 4) * 10}s`,
    animationDuration: `${pseudoRandom(i + 5) * 10 + 10}s`,
  }));

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <style>
          {`
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.1); opacity: 0.8; }
            }
            @keyframes slow-rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes draw-line {
              from { stroke-dashoffset: 1000; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes drift {
              0% { transform: translate(0, 0); }
              25% { transform: translate(5px, 10px); }
              50% { transform: translate(-5px, -10px); }
              75% { transform: translate(10px, -5px); }
              100% { transform: translate(0, 0); }
            }

            .pulse { animation: pulse 6s ease-in-out infinite; }
            .slow-rotate { animation: slow-rotate 45s linear infinite; transform-origin: center; }
            .line { stroke-dasharray: 1000; animation: draw-line 5s ease-out forwards; }
            .particle { animation-name: drift; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
          `}
        </style>
        
        {isMounted && (
          <g className="particles">
            {particles.map((p, i) => (
              <circle
                key={i}
                cx={p.cx}
                cy={p.cy}
                r={p.r}
                className="particle"
                fill="hsl(var(--primary) / 0.2)"
                style={{ animationDelay: p.animationDelay, animationDuration: p.animationDuration }}
              />
            ))}
          </g>
        )}

        <g transform="translate(400, 300)">
          <circle cx="0" cy="0" r="40" fill="hsl(var(--primary))" className="pulse" filter="url(#glow)" />
          <circle cx="0" cy="0" r="10" fill="hsl(var(--primary-foreground))" />

          <g className="slow-rotate">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <line x1="0" y1="0" x2="180" y2="0" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" className="line" style={{ animationDelay: `${i * 0.3}s` }} />
                <circle cx="180" cy="0" r="20" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
                 <circle cx="180" cy="0" r="6" fill="hsl(var(--primary))" className="pulse" style={{ animationDelay: `${i * 0.5}s` }}/>
              </g>
            ))}

             {[36, 108, 180, 252, 324].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <line x1="0" y1="0" x2="250" y2="0" stroke="hsl(var(--secondary) / 0.3)" strokeWidth="1" className="line" style={{ animationDelay: `${0.5 + i * 0.3}s` }} />
                <circle cx="250" cy="0" r="12" fill="hsl(var(--card))" stroke="hsl(var(--secondary))" strokeWidth="1.5" />
                <circle cx="250" cy="0" r="4" fill="hsl(var(--secondary))" className="pulse" style={{ animationDelay: `${0.5 + i * 0.5}s` }} />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroAnimation;
