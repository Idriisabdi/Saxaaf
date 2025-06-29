'use client';

import { useState, useEffect, type SVGProps } from 'react';
import { BrainCircuit, Code, Film } from 'lucide-react';

const CompanyOverviewAnimation = (props: SVGProps<SVGSVGElement>) => {
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<{ cx: number; cy: number; r: number; delay: string; duration: string }[]>([]);

  useEffect(() => {
    setIsMounted(true);
    const generatedParticles = Array.from({ length: 20 }, () => ({
      cx: Math.random() * 500,
      cy: Math.random() * 500,
      r: Math.random() * 1.5 + 0.5,
      delay: `${Math.random() * 5}s`,
      duration: `${Math.random() * 10 + 10}s`,
    }));
    setParticles(generatedParticles);
  }, []);

  if (!isMounted) {
    return <svg viewBox="0 0 500 500" {...props}><rect width="500" height="500" fill="transparent" /></svg>;
  }

  return (
    <svg viewBox="0 0 500 500" {...props}>
      <defs>
        <filter id="company-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="grad-center">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
      </defs>
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          @keyframes slow-rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes draw-line {
            to { stroke-dashoffset: 0; }
          }
          @keyframes drift {
            0% { transform: translate(0, 0); }
            25% { transform: translate(5px, 10px); }
            50% { transform: translate(-5px, -5px); }
            75% { transform: translate(10px, -10px); }
            100% { transform: translate(0, 0); }
          }
          .pulse-node {
            animation: pulse 6s ease-in-out infinite;
            transform-origin: center;
          }
          .rotating-group {
            animation: slow-rotate 40s linear infinite;
            transform-origin: center;
          }
          .connecting-line {
            stroke-dasharray: 200;
            stroke-dashoffset: 200;
            animation: draw-line 4s ease-out forwards;
          }
          .particle-drift {
            animation: drift linear infinite;
          }
        `}
      </style>
      
      {/* Background Particles */}
      <g opacity="0.4">
        {particles.map((p, i) => (
          <circle 
            key={i} 
            cx={p.cx} 
            cy={p.cy} 
            r={p.r} 
            fill="hsl(var(--primary))" 
            className="particle-drift"
            style={{ animationDelay: p.delay, animationDuration: p.duration }}
          />
        ))}
      </g>
      
      {/* Central Node */}
      <g transform="translate(250, 250)" filter="url(#company-glow)">
        <circle className="pulse-node" r="50" fill="url(#grad-center)" />
        <text y="8" textAnchor="middle" fill="hsl(var(--primary-foreground))" fontSize="18" fontWeight="bold" className="pulse-node" style={{animationDelay: '0.2s'}}>SN</text>
      </g>

      {/* Orbiting Nodes */}
      <g className="rotating-group">
        {/* Node 1: Media */}
        <g transform="translate(120, 150)">
          <circle r="30" fill="hsl(var(--card))" stroke="hsl(var(--secondary))" strokeWidth="2" />
          <foreignObject x="-15" y="-15" width="30" height="30">
            <Film className="w-full h-full text-secondary" />
          </foreignObject>
        </g>
        
        {/* Node 2: Web Dev */}
        <g transform="translate(380, 180)">
          <circle r="30" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
           <foreignObject x="-15" y="-15" width="30" height="30">
            <Code className="w-full h-full text-primary" />
          </foreignObject>
        </g>
        
        {/* Node 3: AI */}
        <g transform="translate(250, 390)">
          <circle r="30" fill="hsl(var(--card))" stroke="hsl(var(--accent))" strokeWidth="2" />
           <foreignObject x="-15" y="-15" width="30" height="30">
            <BrainCircuit className="w-full h-full text-accent" />
          </foreignObject>
        </g>
      </g>
      
      {/* Connecting Lines */}
      <g stroke="hsl(var(--border))" strokeWidth="1.5" fill="none">
        <path d="M250 250 L120 150" className="connecting-line" style={{animationDelay: '0.5s'}} />
        <path d="M250 250 L380 180" className="connecting-line" style={{animationDelay: '1s'}} />
        <path d="M250 250 L250 390" className="connecting-line" style={{animationDelay: '1.5s'}} />
      </g>
    </svg>
  );
};

export default CompanyOverviewAnimation;
