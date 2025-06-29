import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ComponentProps } from 'react';
import Image from 'next/image';

type LogoProps = {
  className?: string;
  onClick?: () => void;
  width?: number;
  height?: number;
} & Omit<ComponentProps<typeof Link>, 'href' | 'onClick'>;


export default function Logo({ className, onClick, width = 160, height = 40, ...props }: LogoProps) {
  const content = (
    <Image
      src={`https://placehold.co/${width}x${height}.png`}
      alt="Saxaaf Network Logo Placeholder"
      width={width}
      height={height}
      className="object-contain"
      data-ai-hint="logo"
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
