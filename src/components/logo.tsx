'use client';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type LogoProps = {
  className?: string;
  onClick?: () => void;
} & Omit<ComponentProps<typeof Link>, 'href' | 'onClick'>;


export default function Logo({ className, onClick, ...props }: LogoProps) {
  const content = (
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
