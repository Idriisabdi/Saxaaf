'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type LogoProps = {
  className?: string;
  onClick?: () => void;
  asImage?: boolean;
  width?: number;
  height?: number;
} & Omit<ComponentProps<typeof Link>, 'href' | 'onClick'>;


export default function Logo({ className, onClick, asImage = false, width = 120, height = 40, ...props }: LogoProps) {
  const content = asImage ? (
    <Image
        src="/Image/log.png"
        alt="Saxaaf Network Logo"
        width={width}
        height={height}
        priority
      />
  ) : (
    <span className="font-headline text-2xl font-bold uppercase tracking-wider text-foreground">
      Saxaaf Network
    </span>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={cn('flex items-center', className)}>
        {content}
      </button>
    )
  }

  return (
    <Link href="/" className={cn('flex items-center', className)} {...props}>
      {content}
    </Link>
  );
}
