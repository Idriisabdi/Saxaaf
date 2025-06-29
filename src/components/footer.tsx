'use client';

import Link from 'next/link';
import { Twitter, Linkedin, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-primary via-secondary to-primary bg-[size:200%_200%] text-primary-foreground animate-animated-gradient">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="font-headline text-2xl font-bold uppercase">
              Saxaaf Network
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="group" aria-label="Twitter">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-all duration-300 group-hover:bg-primary-foreground/20">
                <Twitter className="h-5 w-5" />
              </div>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="group" aria-label="LinkedIn">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-all duration-300 group-hover:bg-primary-foreground/20">
                <Linkedin className="h-5 w-5" />
              </div>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="group" aria-label="Facebook">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10 text-primary-foreground/80 transition-all duration-300 group-hover:bg-primary-foreground/20">
                <Facebook className="h-5 w-5" />
              </div>
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-4 border-t border-primary-foreground/20 pt-4 text-sm text-primary-foreground/60 sm:flex-row sm:justify-between">
          <p suppressHydrationWarning>&copy; {new Date().getFullYear()} Saxaaf Network. All rights reserved.</p>
          <Link href="/admin" className="transition-colors hover:text-primary-foreground">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
