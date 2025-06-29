import Link from 'next/link';
import { ArrowRight, Rocket, Building, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HeroAnimation from '@/components/illustrations/hero-animation';
import HeroFloatingIcons from '@/components/illustrations/HeroFloatingIcons';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="container mx-auto">
        <div className="grid min-h-[calc(100vh-3.5rem)] items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24">
          <div className="relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-700 md:order-1">
            <HeroFloatingIcons />
            <HeroAnimation className="h-auto w-full max-w-lg" />
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

      {/* Target Audience Section */}
      <section className="bg-card/50 py-16 sm:py-24 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Target Audience & Market Focus</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our services are designed for ambitious businesses ready to lead in the digital age. We primarily serve two client profiles:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Rocket className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline uppercase text-xl">Ambitious SMEs & Startups</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Businesses that need to establish a strong, foundational digital presence. They are looking for a trusted partner to build a high-performance website, create compelling brand stories, and implement effective content strategies to attract customers and grow.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <div className="flex items-start gap-4">
                   <div className="flex-shrink-0">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="font-headline uppercase text-xl">Established Enterprises & Organizations</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Larger companies seeking to innovate and optimize. They require sophisticated solutions like custom software, complex e-commerce platforms, and bespoke AI systems to improve efficiency, analyze data, and maintain a competitive edge.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center bg-card p-8 rounded-lg border border-border/50 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '600ms' }}>
             <Globe className="h-10 w-10 text-primary mx-auto mb-4 animate-pulse" />
             <h3 className="font-headline text-2xl font-bold uppercase">Specialized Market Expertise</h3>
             <p className="mt-4 text-lg text-muted-foreground max-w-4xl mx-auto">
              While we are a global agency, we have a deep understanding of the Somali market, including its mobile-first nature and the significant economic and cultural role of the global diaspora. We are uniquely positioned to help brands connect with this dynamic and growing audience.
             </p>
          </div>
        </div>
      </section>
    </div>
  );
}