'use client';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';

type LogoProps = {
  className?: string;
  onClick?: () => void;
} & Omit<ComponentProps<typeof Link>, 'href' | 'onClick'>;


export default function Logo({ className, onClick, ...props }: LogoProps) {
  const content = (
      <Image
        src="/IMAGE/log.png"
        width={256}
        height={64}
        alt="Saxaaf Network Logo"
      />
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
