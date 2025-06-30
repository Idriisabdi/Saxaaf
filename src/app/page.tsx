import Link from 'next/link';
import { ArrowRight, Rocket, Building, Globe, Sparkles, Film, Code, BrainCircuit } from 'lucide-react';
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
          <div className="relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-700">
            <HeroFloatingIcons />
            <HeroAnimation className="h-auto w-full max-w-lg" />
          </div>
          <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700 md:order-2">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight font-headline">
              WHERE CREATIVE VISION MEETS{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-[size:200%_200%] animate-animated-gradient">
                INTELLIGENT TECHNOLOGY
              </span>
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              We craft compelling narratives through world-class Media Production, build powerful digital platforms with expert Web & Software Design, and deploy transformative AI Systems to drive measurable growth and connect our clients with a global audience.
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

      {/* Integrated Services Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Our Integrated Services</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              We offer a comprehensive suite of services designed to work in synergy, providing our clients with a unified and powerful digital solution.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Film className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline uppercase text-xl pt-4">Media Production & Content Creation</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">
                  We tell your story. Our creative team specializes in producing high-impact video content, from cinematic brand films to engaging social media campaigns and professional podcasts. We develop content strategies that build brand authority, captivate your target audience, and drive meaningful engagement.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Code className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline uppercase text-xl pt-4">Web & Software Design</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">
                  We build your platform. Our development team engineers high-performance, scalable websites and custom software applications that are secure, intuitive, and optimized for growth. We create digital experiences that are not only visually stunning but also functionally robust.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-headline uppercase text-xl pt-4">AI System Analysis & Building</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">
                  We unlock your intelligence. We leverage the power of artificial intelligence to automate processes, analyze complex data, and provide predictive insights. We build intelligent systems that give your business a decisive competitive advantage and tangible business outcomes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Target Audience Section */}
      <section className="bg-card/50 py-16 sm:py-24 border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Who We Serve</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
              Our services are designed for ambitious businesses ready to lead in the digital age. We primarily serve two client profiles:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '200ms' }}>
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

            <Card className="animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '400ms' }}>
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

      {/* Call to Action Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Sparkles className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="font-headline text-3xl font-bold uppercase tracking-tight">Ready to Build Your Digital Future?</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Let's discuss how our expertise can help you achieve your goals. Schedule a free, no-obligation consultation with our team today.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="destructive">
              <Link href="/lead-assessment">
                Schedule a Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
