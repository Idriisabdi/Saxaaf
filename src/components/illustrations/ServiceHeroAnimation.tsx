'use client';

import { useState, useEffect, type SVGProps } from 'react';
import { BrainCircuit, Code, Film } from 'lucide-react';

const ServiceHeroAnimation = (props: SVGProps<SVGSVGElement>) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <svg viewBox="0 0 800 400" {...props}><rect width="800" height="400" fill="transparent" /></svg>;
  }

  return (
    <svg viewBox="0 0 800 400" {...props}>
      <defs>
        <filter id="service-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="grad-core">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <style>
        {`
          @keyframes pulse-strong {
            0%, 100% { transform: scale(0.9); opacity: 0.7; }
            50% { transform: scale(1.1); opacity: 1; }
          }
          @keyframes pulse-node {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes stream-draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes icon-appear {
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
          }
          .core-pulse {
            animation: pulse-strong 8s ease-in-out infinite;
            transform-origin: center;
          }
          .node-pulse {
            animation: pulse-node 5s ease-in-out infinite;
            transform-origin: center;
          }
          .stream-path {
            stroke-dasharray: 500;
            stroke-dashoffset: 500;
            animation: stream-draw 4s ease-out forwards;
          }
          .icon-node {
             animation: icon-appear 2s ease-out forwards;
          }
        `}
      </style>
      
      {/* Background Grid */}
      <g opacity="0.1" stroke="hsl(var(--border))" strokeWidth="0.5">
        {Array.from({ length: 40 }).map((_, i) => (
            <line key={'v' + i} x1={i * 20} y1="0" x2={i * 20} y2="400" />
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
            <line key={'h' + i} x1="0" y1={i * 20} x2="800" y2={i * 20} />
        ))}
      </g>
      
      {/* Central Core */}
      <g transform="translate(400, 200)" filter="url(#service-glow)">
        <circle className="core-pulse" r="40" fill="url(#grad-core)" />
      </g>
      
      {/* Streams and Nodes */}
      <g>
        {/* Stream 1: Media */}
        <g className="icon-node" style={{ animationDelay: '0.5s' }}>
          <path d="M400,200 C 250,100 200,150 150,100" fill="none" stroke="url(#stream-gradient)" strokeWidth="2" className="stream-path" />
          <g transform="translate(150, 100)" className="node-pulse">
            <circle r="35" fill="hsl(var(--card))" stroke="hsl(var(--secondary))" strokeWidth="2" />
            <foreignObject x="-20" y="-20" width="40" height="40">
              <Film className="w-full h-full text-secondary" />
            </foreignObject>
          </g>
        </g>
        
        {/* Stream 2: Web Dev */}
        <g className="icon-node" style={{ animationDelay: '1s' }}>
          <path d="M400,200 C 400,100 400,100 400,50" fill="none" stroke="url(#stream-gradient)" strokeWidth="2" className="stream-path" />
          <g transform="translate(400, 50)" className="node-pulse">
            <circle r="35" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
             <foreignObject x="-20" y="-20" width="40" height="40">
              <Code className="w-full h-full text-primary" />
            </foreignObject>
          </g>
        </g>
        
        {/* Stream 3: AI */}
        <g className="icon-node" style={{ animationDelay: '1.5s' }}>
          <path d="M400,200 C 550,100 600,150 650,100" fill="none" stroke="url(#stream-gradient)" strokeWidth="2" className="stream-path" />
          <g transform="translate(650, 100)" className="node-pulse">
            <circle r="35" fill="hsl(var(--card))" stroke="hsl(var(--accent))" strokeWidth="2" />
             <foreignObject x="-20" y="-20" width="40" height="40">
              <BrainCircuit className="w-full h-full text-accent" />
            </foreignObject>
          </g>
        </g>
      </g>
    </svg>
  );
};

export default ServiceHeroAnimation;
