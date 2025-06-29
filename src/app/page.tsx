import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import HeroAnimation from '@/components/illustrations/hero-animation';
import CameraLensIcon from '@/components/illustrations/CameraLensIcon';
import CodeBracketsIcon from '@/components/illustrations/CodeBracketsIcon';
import AiEyeIcon from '@/components/illustrations/AiEyeIcon';
import Image from 'next/image';
import Logo from '@/components/logo';

const services = [
  {
    icon: <CameraLensIcon />,
    title: 'Media & Content Creation',
    description: 'Crafting compelling brand stories through video, podcasts, and content marketing.',
  },
  {
    icon: <CodeBracketsIcon />,
    title: 'Web & Software Development',
    description: 'Building high-performance, scalable websites and custom applications.',
  },
  {
    icon: <AiEyeIcon />,
    title: 'AI & Data Analytics',
    description: 'Deploying AI solutions and data analysis to drive innovation and efficiency.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative flex-grow flex items-center justify-center overflow-hidden py-24 sm:py-32">
        <HeroAnimation className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="container px-4 z-10 text-center">
            <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-700">
                <Logo className="mx-auto" width={400} height={100} />
                <div className="mt-6 bg-card/60 backdrop-blur-sm p-6 rounded-lg max-w-3xl mx-auto">
                  <p className="text-xl text-foreground/90">
                      We integrate world-class media production, expert web & software design, and transformative AI systems to build your digital future and connect you with a global audience.
                  </p>
                </div>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
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
                  {React.cloneElement(service.icon, { className: 'h-16 w-16 mx-auto mb-4' })}
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
