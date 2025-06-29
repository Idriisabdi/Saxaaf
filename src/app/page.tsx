import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import HeroAnimation from '@/components/illustrations/hero-animation';

export default function Home() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="grid min-h-[calc(100vh-3.5rem)] items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="flex items-center justify-center animate-in fade-in zoom-in-95 duration-700 md:order-1">
            <HeroAnimation className="h-auto w-full max-w-2xl" />
          </div>
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700 md:order-2">
            <h1 className="text-3xl font-extrabold tracking-tight font-headline">
              WHERE CREATIVE VISION MEETS{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[size:200%_200%] animate-animated-gradient">
                INTELLIGENT TECHNOLOGY
              </span>
            </h1>
            <p className="max-w-2xl text-xl text-muted-foreground">
              We fuse world-class media production, powerful web & software
              design, and transformative AI systems to build the future of
              digital engagement.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/lead-assessment">
                  Get Free AI Assessment
                  <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
