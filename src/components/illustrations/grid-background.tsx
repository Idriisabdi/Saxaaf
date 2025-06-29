'use client';
import { cn } from '@/lib/utils';

export default function GridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 -z-10 h-full w-full overflow-hidden pointer-events-none bg-background", className)}>
       <div
        className="absolute h-full w-full bg-[linear-gradient(to_right,hsl(var(--primary)/.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/.05)_1px,transparent_1px)] bg-[size:4rem_4rem] animate-move-grid"
        style={{
            maskImage: 'radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_100%)'
        }}
       />
    </div>
  );
}
