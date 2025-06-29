import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";
import { Lightbulb, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import HeroAnimation from "@/components/illustrations/hero-animation";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="py-20 sm:py-32 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start space-y-6 animate-fade-in-up">
              <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
                Driving Growth, Building Futures
              </h1>
              <p className="text-lg text-muted-foreground">
                We are a strategic partner for businesses looking to navigate the complexities of the modern market. Our expertise helps you unlock potential, foster innovation, and achieve sustainable success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/services">Our Services</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/lead-assessment">Get AI Assessment</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in h-80 md:h-auto md:min-h-[400px]">
              <HeroAnimation />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Our Core Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer a range of services designed to address your most critical business challenges.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, index) => (
              <Card key={service.slug} className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 150}ms` }}>
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-lg w-16 h-16 flex items-center justify-center mb-4">
                     <Image src={`https://lucide.dev/icons/${service.icon.toLowerCase()}.svg`} alt={service.title} width={32} height={32} />
                  </div>
                  <CardTitle className="font-headline">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                   <Button variant="link" asChild className="mt-4">
                     <Link href={`/services/${service.slug}`}>Learn More</Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-card">
         <div className="container mx-auto px-4">
           <div className="text-center space-y-4 mb-12">
             <h2 className="text-3xl md:text-4xl font-headline font-bold">Why Partner With Us?</h2>
             <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
               Our approach is rooted in partnership, expertise, and a relentless commitment to delivering measurable results for our clients.
             </p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             <div className="flex items-start space-x-4">
               <div className="flex-shrink-0">
                <Lightbulb className="w-8 h-8 text-secondary" />
               </div>
               <div>
                 <h3 className="text-xl font-headline font-semibold">Innovative Solutions</h3>
                 <p className="text-muted-foreground mt-1">We bring fresh perspectives and cutting-edge solutions to your most complex problems.</p>
               </div>
             </div>
             <div className="flex items-start space-x-4">
               <div className="flex-shrink-0">
                <Users className="w-8 h-8 text-secondary" />
               </div>
               <div>
                 <h3 className="text-xl font-headline font-semibold">Expert Team</h3>
                 <p className="text-muted-foreground mt-1">Our team consists of industry veterans with deep expertise and a passion for what they do.</p>
               </div>
             </div>
             <div className="flex items-start space-x-4">
               <div className="flex-shrink-0">
                 <Zap className="w-8 h-8 text-secondary" />
               </div>
               <div>
                 <h3 className="text-xl font-headline font-semibold">Results-Driven</h3>
                 <p className="text-muted-foreground mt-1">We are focused on delivering tangible results that drive your business forward.</p>
               </div>
             </div>
           </div>
         </div>
       </section>
    </div>
  );
}
