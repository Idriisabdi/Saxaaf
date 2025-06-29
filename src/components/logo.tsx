import Link from 'next/link';
import { Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Building2 className="w-6 h-6 text-primary" />
      <span className="text-xl font-headline font-bold">PillarClone</span>
    </Link>
  );
}
