'use client';

import { useState, useEffect } from 'react';

interface Particle {
  id: number;
  left: string;
  top: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
  color: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default function BokehBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i): Particle => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 150 + 50}px`,
      animationDuration: `${Math.random() * 20 + 20}s`,
      animationDelay: `${Math.random() * 10}s`,
      color: Math.random() > 0.3 ? 'hsl(var(--secondary))' : 'hsl(var(--accent))',
      x1: Math.random() * 100 - 50,
      y1: Math.random() * 100 - 50,
      x2: Math.random() * 100 - 50,
      y2: Math.random() * 100 - 50,
    }));
    setParticles(newParticles);
  }, []);

  if (!particles.length) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none bg-background">
      <style>
        {`
        @keyframes bokeh-float {
            0% { transform: translate(var(--x1-pos), var(--y1-pos)) scale(1); }
            50% { transform: translate(var(--x2-pos), var(--y2-pos)) scale(1.2); }
            100% { transform: translate(var(--x1-pos), var(--y1-pos)) scale(1); }
        }
        `}
      </style>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `bokeh-float ${p.animationDuration} ${p.animationDelay} ease-in-out infinite`,
            filter: 'blur(40px)',
            opacity: 0.2,
            '--x1-pos': `${p.x1}px`,
            '--y1-pos': `${p.y1}px`,
            '--x2-pos': `${p.x2}px`,
            '--y2-pos': `${p.y2}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
