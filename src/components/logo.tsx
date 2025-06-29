'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <style>
        {`
          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
          .saxaaf-logo-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: draw 2s ease-out forwards;
          }
          .net-logo-text {
            opacity: 0;
            animation: fadeIn 0.5s ease-in forwards 1.8s;
          }
        `}
      </style>
      <svg
        className="h-8 w-auto"
        viewBox="0 0 160 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Saxaaf Net Logo"
      >
        <text
          x="0"
          y="28"
          fontFamily="Inter, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          className="saxaaf-logo-path"
        >
          Saxaaf
        </text>
        <text
          x="95"
          y="28"
          fontFamily="Inter, sans-serif"
          fontSize="24"
          fontWeight="bold"
          fill="hsl(var(--foreground))"
          className="net-logo-text"
        >
          Net
        </text>
      </svg>
    </Link>
  );
}
