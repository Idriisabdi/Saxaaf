import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import HeroAnimation from '@/components/illustrations/hero-animation';
import Logo from '@/components/logo';

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto min-h-[calc(100vh-3.5rem)] px-4">
        <div className="grid h-full grid-cols-1 items-center gap-12 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col items-center text-center md:items-start md:text-left animate-in fade-in slide-in-from-left-8 duration-700">
            <Logo className="h-24 w-auto mb-6" />
            <p className="mx-auto max-w-lg text-lg text-foreground/80 md:mx-0">
              We are Saxaaf Network—a digital transformation partner that fuses
              world-class media production, enterprise-grade software development,
              and transformative AI systems to build your digital future.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/services">
                  Explore Our Services
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/lead-assessment">
                  Free AI Consultation
                  <Sparkles />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative flex h-full min-h-[300px] w-full items-center justify-center animate-in fade-in zoom-in-95 duration-700">
            <HeroAnimation className="h-auto w-full max-w-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
