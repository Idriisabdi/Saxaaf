'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type LogoProps = {
  className?: string;
  onClick?: () => void;
  asImage?: boolean;
} & Omit<ComponentProps<typeof Link>, 'href' | 'onClick'>;


export default function Logo({ className, onClick, asImage = false, ...props }: LogoProps) {
  const content = asImage ? (
    <Image
        src="https://placehold.co/120x40.png"
        alt="Saxaaf Network Logo"
        width={120}
        height={40}
        priority
        data-ai-hint="logo"
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
