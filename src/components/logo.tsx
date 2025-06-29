import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import Image from 'next/image';

type LogoProps = {
  className?: string;
  onClick?: () => void;
  width?: number;
} & Omit<ComponentProps<typeof Link>, 'href' | 'onClick'>;


export default function Logo({ className, onClick, width = 160, ...props }: LogoProps) {
  // Assume a 4:1 aspect ratio based on original defaults (160x40)
  const height = width / 4;

  const content = (
    <Image
      src="/image/logo.png"
      alt="Saxaaf Network Logo"
      width={width}
      height={height}
      className="object-contain"
      priority
    />
  );

  const wrapperClasses = cn('flex items-center justify-center', className);

  if (onClick) {
    return (
      <button onClick={onClick} className={wrapperClasses}>
        {content}
      </button>
    )
  }

  return (
    <Link href="/" className={wrapperClasses} {...props}>
      {content}
    </Link>
  );
}
