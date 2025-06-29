'use client';

import { Computer } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';
import CinematicCameraIcon from './CinematicCameraIcon';


const icons = [
  { Icon: CinematicCameraIcon, style: { top: '15%', left: '10%', animationDelay: '0s', animationDuration: '10s' }, size: 60 },
  { Icon: Computer, style: { top: '20%', left: '80%', animationDelay: '2s', animationDuration: '12s' }, size: 45 },
  { Icon: CinematicCameraIcon, style: { top: '70%', left: '5%', animationDelay: '4s', animationDuration: '9s' }, size: 75 },
  { Icon: Computer, style: { top: '80%', left: '90%', animationDelay: '1s', animationDuration: '14s' }, size: 35 },
  { Icon: CinematicCameraIcon, style: { top: '50%', left: '50%', animationDelay: '3s', animationDuration: '8s' }, size: 55 },
  { Icon: Computer, style: { top: '5%', left: '40%', animationDelay: '5s', animationDuration: '15s' }, size: 45 },
];

const HeroFloatingIcons = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("absolute inset-0 -z-10 overflow-hidden pointer-events-none", className)} {...props}>
     <style>{`
        @keyframes float {
          0% { transform: translate(0, 0px) rotate(0deg); opacity: 0; }
          25% { opacity: 0.1; }
          50% { transform: translate(15px, -25px) rotate(15deg); }
          75% { opacity: 0.1; }
          100% { transform: translate(0, 0px) rotate(0deg); opacity: 0; }
        }
        .floating-icon {
          animation: float ease-in-out infinite;
          position: absolute;
          color: hsl(var(--primary));
        }
      `}</style>
    {icons.map(({ Icon, style, size }, index) => (
      <Icon
        key={index}
        className="floating-icon"
        style={style as React.CSSProperties}
        width={size}
        height={size}
        strokeWidth={1}
      />
    ))}
  </div>
);

export default HeroFloatingIcons;
