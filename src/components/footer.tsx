'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/logo';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-card border-t border-border/20">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <Logo width={180} />
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 border-t border-foreground/10 pt-4 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>&copy; {year} Saxaaf Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
