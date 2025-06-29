import Link from 'next/link';
import { Twitter, Linkedin, Facebook } from 'lucide-react';
import Logo from '@/components/logo';

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center md:items-start">
            <Logo asImage />
          </div>
          <div className="flex space-x-4">
            <Link href="#" className="group" aria-label="Twitter">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 text-secondary-foreground/80 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                <Twitter className="h-5 w-5" />
              </div>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="group" aria-label="LinkedIn">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 text-secondary-foreground/80 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </div>
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="#" className="group" aria-label="Facebook">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 text-secondary-foreground/80 transition-all duration-300 group-hover:bg-primary/10 group-hover:text-primary">
                <Facebook className="h-5 w-5" />
              </div>
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-secondary-foreground/20 pt-6 text-sm text-secondary-foreground/60 sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Saxaaf Network. All rights reserved.</p>
          <Link href="/admin" className="transition-colors hover:text-primary">
            Admin Panel
          </Link>
        </div>
      </div>
    </footer>
  );
}
