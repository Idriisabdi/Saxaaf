'use client';

import { Film, CodeXml, BrainCircuit, Sparkles, ArrowRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const icons = [
  { icon: Film, size: 'w-16 h-16' },
  { icon: CodeXml, size: 'w-20 h-20' },
  { icon: BrainCircuit, size: 'w-12 h-12' },
  { icon: Sparkles, size: 'w-10 h-10' },
  { icon: ArrowRight, size: 'w-14 h-14' },
  { icon: Film, size: 'w-8 h-8' },
  { icon: CodeXml, size: 'w-16 h-16' },
  { icon: BrainCircuit, size: 'w-24 h-24' },
];

const pseudoRandom = (seed: number) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function AnimatedServiceIcons() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
       <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          .floating-icon {
            animation: float linear infinite;
          }
        `}
      </style>
      {icons.map((item, index) => {
        const Icon = item.icon;
        const top = `${pseudoRandom(index * 5) * 100}%`;
        const left = `${pseudoRandom(index * 3) * 100}%`;
        const duration = `${pseudoRandom(index * 7) * 10 + 10}s`;
        const delay = `${pseudoRandom(index * 9) * 5}s`;

        return (
          <div
            key={index}
            className="floating-icon absolute text-primary/5"
            style={{
              top,
              left,
              animationDuration: duration,
              animationDelay: delay,
            }}
          >
            <Icon className={item.size} strokeWidth={1} />
          </div>
        );
      })}
    </div>
  );
}
