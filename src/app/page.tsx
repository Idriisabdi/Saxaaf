import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BrainCircuit, CodeXml, Film } from 'lucide-react';
import HeroAnimation from '@/components/illustrations/hero-animation';
import Logo from '@/components/logo';

const services = [
  {
    icon: <Film className="h-8 w-8 mb-4 text-primary" />,
    title: 'Media & Content Creation',
    description: 'Crafting compelling brand stories through video, podcasts, and content marketing.',
  },
  {
    icon: <CodeXml className="h-8 w-8 mb-4 text-primary" />,
    title: 'Web & Software Development',
    description: 'Building high-performance, scalable websites and custom applications.',
  },
  {
    icon: <BrainCircuit className="h-8 w-8 mb-4 text-primary" />,
    title: 'AI & Data Analytics',
    description: 'Deploying AI solutions and data analysis to drive innovation and efficiency.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center overflow-hidden py-24 sm:py-32">
        <div className="container px-4 z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="text-center md:text-left animate-in fade-in slide-in-from-left duration-700">
              <div className="mb-4">
                <Logo className="h-16 w-auto mx-auto md:mx-0" />
              </div>
              <p className="mt-6 text-lg text-foreground/80 max-w-xl mx-auto md:mx-0">
                We integrate world-class media production, expert web & software design, and transformative AI systems to build your digital future and connect you with a global audience.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Button size="lg" asChild>
                  <Link href="/services">
                    Explore Our Services
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/lead-assessment">Get a Free Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-full flex items-center justify-center animate-in fade-in zoom-in-95 duration-700">
               <HeroAnimation className="w-full h-full max-w-lg mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-24 bg-card/50">
        <div className="container px-4">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-headline uppercase">Our Core Pillars</h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/70">
              Three specialized fields, one integrated team. We are your complete partner for digital transformation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title} 
                className="text-center bg-card shadow-lg transition-shadow duration-300 animate-in fade-in zoom-in-95 duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader>
                  {service.icon}
                  <CardTitle className="uppercase font-bold text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <Button variant="secondary" asChild>
                <Link href="/services">Learn More About Our Process <ArrowRight className="ml-2" /></Link>
             </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
