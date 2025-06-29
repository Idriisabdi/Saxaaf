'use client';

import { useState, useEffect } from 'react';
import Logo from '@/components/logo';

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%_200%] text-primary-foreground animate-animated-gradient">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <Logo width={180} />
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 border-t border-primary-foreground/20 pt-4 text-sm text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p>&copy; {year} Saxaaf Network. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
