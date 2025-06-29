'use client';

import { useState, useEffect, type SVGProps } from 'react';

type Particle = {
  id: number;
  cx: number;
  cy: number;
  r: number;
  style: React.CSSProperties;
};

const HeroAnimation = (props: SVGProps<SVGSVGElement>) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // This code runs only on the client, after the component has mounted.
    // This prevents a hydration mismatch between server and client.
    setIsMounted(true);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      {...props}
    >
      <defs>
        <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </linearGradient>
        <linearGradient id="data-stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="1" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="7" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        @keyframes slow-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slow-rotate-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes grow-bar {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes drift {
          from { transform: translate(0, 20px); opacity: 0; }
          50% { opacity: 0.5; }
          to { transform: translate(0, -20px); opacity: 0; }
        }

        .pulse { animation: pulse 4s ease-in-out infinite; }
        .slow-rotate { animation: slow-rotate 60s linear infinite; transform-origin: center; }
        .slow-rotate-reverse { animation: slow-rotate-reverse 70s linear infinite; transform-origin: center; }

        .data-stream {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: draw-line 3s ease-out infinite alternate;
        }
        
        .analysis-chart-line {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
          animation: draw-line 5s ease-in-out infinite alternate;
        }
        
        .analysis-bar {
           transform-origin: bottom;
           animation: grow-bar 2.5s ease-in-out infinite alternate;
        }

        .particle {
          animation: drift 5s ease-in-out infinite;
        }
      `}</style>

      {/* Background Particles - Only render on client */}
      {isMounted && (
        <g opacity="0.4">
          {Array.from({ length: 50 }).map((_, i) => (
            <circle 
              key={`particle-${i}`}
              className="particle"
              cx={Math.random() * 800}
              cy={Math.random() * 800}
              r={Math.random() * 1.5 + 0.5}
              fill="hsl(var(--primary))"
              style={{ animationDelay: `-${(i * 0.1).toFixed(1)}s` }}
            />
          ))}
        </g>
      )}
      
      <g transform="translate(400, 400)" filter="url(#glow)">
          
          {/* AI Core (Neural Network) */}
          <g className="pulse">
              {/* Central Node */}
              <circle cx="0" cy="0" r="50" fill="url(#brain-gradient)" />
              <circle cx="0" cy="0" r="55" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeOpacity="0.5"/>

              {/* Orbiting Nodes and connections */}
              <g className="slow-rotate">
                  {Array.from({ length: 8 }).map((_, i) => (
                      <g key={`node-group-${i}`} transform={`rotate(${i * 45})`}>
                          <line x1="50" y1="0" x2="120" y2="0" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1"/>
                          <circle cx="120" cy="0" r="10" fill="hsl(var(--accent))" className="pulse" style={{ animationDelay: `${i * 0.5}s`}}/>
                      </g>
                  ))}
              </g>
              <g className="slow-rotate-reverse">
                  {Array.from({ length: 6 }).map((_, i) => (
                       <g key={`inner-node-group-${i}`} transform={`rotate(${i * 60})`}>
                          <line x1="0" y1="0" x2="80" y2="0" stroke="hsl(var(--accent) / 0.3)" strokeWidth="1" strokeDasharray="2 4"/>
                          <circle cx="80" cy="0" r="6" fill="hsl(var(--primary))" className="pulse" style={{ animationDelay: `${i * 0.7}s`}}/>
                      </g>
                  ))}
              </g>
          </g>
          
          {/* Data Streams flowing in */}
          <g strokeWidth="2" fill="none" stroke="url(#data-stream-gradient)">
              <path className="data-stream" d="M -300 -300 C -200 -100, -100 -150, -80 -80" style={{ animationDelay: '0s' }} />
              <path className="data-stream" d="M 300 -300 C 200 -100, 100 -150, 80 -80" style={{ animationDelay: '-0.5s' }} />
              <path className="data-stream" d="M -300 300 C -200 100, -100 150, -80 80" style={{ animationDelay: '-1s' }} />
              <path className="data-stream" d="M 300 300 C 200 100, 100 150, 80 80" style={{ animationDelay: '-1.5s' }} />
              <path className="data-stream" d="M 400 0 C 200 50, 150 50, 120 0" style={{ animationDelay: '-2s' }} />
              <path className="data-stream" d="M -400 0 C -200 -50, -150 -50, -120 0" style={{ animationDelay: '-2.5s' }} />
          </g>
          
          {/* Analysis Charts orbiting */}
          <g className="slow-rotate" style={{ animationDuration: '40s' }}>
              {/* Line Chart */}
              <g transform="translate(-250, -150)">
                   <path d="M 0 50 L 100 50 L 100 0" fill="none" stroke="hsl(var(--accent) / 0.3)" strokeWidth="1" />
                   <path className="analysis-chart-line" d="M 0 40 C 20 10, 40 50, 60 20, 80 0, 100 30" fill="none" stroke="hsl(var(--accent))" strokeWidth="2.5" />
              </g>
              
              {/* Bar Chart */}
              <g transform="translate(180, 200)">
                   <path d="M 0 50 L 80 50" fill="none" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
                   <rect className="analysis-bar" x="10" y="20" width="15" height="30" fill="hsl(var(--primary))" style={{ animationDelay: '0s' }}/>
                   <rect className="analysis-bar" x="35" y="5" width="15" height="45" fill="hsl(var(--primary))" style={{ animationDelay: '-0.5s' }}/>
                   <rect className="analysis-bar" x="60" y="30" width="15" height="20" fill="hsl(var(--primary))" style={{ animationDelay: '-1s' }}/>
              </g>
          </g>
      </g>
    </svg>
  );
};

export default HeroAnimation;
