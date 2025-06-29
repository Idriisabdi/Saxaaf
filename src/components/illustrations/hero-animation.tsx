'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const pseudoRandom = (seed: number) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

const HeroAnimation = ({ className }: { className?: string }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particleCount = 50;
  const particles = Array.from({ length: particleCount }).map((_, i) => ({
    cx: `${pseudoRandom(i + 1) * 100}%`,
    cy: `${pseudoRandom(i + 2) * 100}%`,
    r: `${pseudoRandom(i + 3) * 1.5 + 0.5}`,
    animationDelay: `${pseudoRandom(i + 4) * 10}s`,
    animationDuration: `${pseudoRandom(i + 5) * 10 + 10}s`,
  }));

  return (
    <div className={cn("relative w-full h-full flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow-saxaaf" x="-50%" y="-50%" width="200%" height="200%">
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
              50% { transform: scale(1.05); opacity: 0.9; }
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
              25% { transform: translate(3px, 5px); }
              50% { transform: translate(-3px, -5px); }
              75% { transform: translate(5px, -3px); }
              100% { transform: translate(0, 0); }
            }

            .pulse { animation: pulse 5s ease-in-out infinite; }
            .slow-rotate { animation: slow-rotate 60s linear infinite; transform-origin: center; }
            .line { stroke-dasharray: 1000; animation: draw-line 4s ease-out forwards; }
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
                fill="hsl(var(--primary) / 0.15)"
                style={{ animationDelay: p.animationDelay, animationDuration: p.animationDuration }}
              />
            ))}
          </g>
        )}

        <g transform="translate(400, 300)">
          {/* Central Core */}
          <circle cx="0" cy="0" r="50" fill="hsl(var(--primary))" className="pulse" filter="url(#glow-saxaaf)" />
          <circle cx="0" cy="0" r="12" fill="hsl(var(--primary-foreground))" />

          <g className="slow-rotate">
            {/* Primary Orbit */}
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <line x1="0" y1="0" x2="150" y2="0" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1.5" className="line" style={{ animationDelay: `${i * 0.2}s` }} />
                <circle cx="150" cy="0" r="25" fill="hsl(var(--card))" stroke="hsl(var(--primary) / 0.8)" strokeWidth="2" />
                <circle cx="150" cy="0" r="7" fill="hsl(var(--primary))" className="pulse" style={{ animationDelay: `${i * 0.4}s` }}/>
              </g>
            ))}

            {/* Secondary Orbit with Accent Color */}
            {[30, 90, 150, 210, 270, 330].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <line x1="0" y1="0" x2="230" y2="0" stroke="hsl(var(--accent) / 0.3)" strokeWidth="1" className="line" style={{ animationDelay: `${0.5 + i * 0.2}s` }} />
                <circle cx="230" cy="0" r="15" fill="hsl(var(--card))" stroke="hsl(var(--accent) / 0.7)" strokeWidth="1.5" />
                <circle cx="230" cy="0" r="5" fill="hsl(var(--accent))" className="pulse" style={{ animationDelay: `${0.5 + i * 0.4}s` }} />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroAnimation;
