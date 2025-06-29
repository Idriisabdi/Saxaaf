import { Sparkles, Target, Eye, Gem } from 'lucide-react';
import CompanyOverviewAnimation from '@/components/illustrations/CompanyOverviewAnimation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-0.5 animate-in fade-in duration-500">
        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                <CompanyOverviewAnimation className="w-full h-auto max-w-md mx-auto" />
            </div>
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">
                <h2 className="font-headline text-3xl font-bold uppercase text-primary">
                    Company Overview
                </h2>
                <div className="space-y-4 text-lg text-foreground/80">
                    <p>
                        Saxaaf Network is a premier integrated digital agency positioned at the intersection of creative storytelling and intelligent technology. Founded on the principle that modern success requires a seamless fusion of both art and engineering, we provide a comprehensive suite of services designed to build brands, captivate audiences, and drive measurable growth.
                    </p>
                    <p>
                        We are a new breed of digital partner, composed of a diverse team of master storytellers, brand strategists, software engineers, and AI specialists. We believe that the most compelling brand experiences are created when captivating Media Production and Content Creation are built upon a foundation of powerful, scalable Web & Software Design. By infusing this entire process with insightful AI System Analysis, we move beyond simply completing projects—we architect sustainable competitive advantages for our clients.
                    </p>
                    <p>
                        Our commitment to our clients transcends the traditional vendor relationship. We operate as a dedicated strategic partner, deeply invested in your growth and equipped to navigate the complexities of the digital frontier with you. Our ultimate purpose is to ensure your vision is not only realized but amplified, creating a measurable and lasting impact in your market and beyond.
                    </p>
                </div>
            </div>
        </div>

        {/* Mission, Vision, Values Section */}
        <div className="mt-24 sm:mt-32">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl uppercase flex items-center justify-center gap-4">
               <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              Our Core Principles
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="flex flex-col text-center animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: '200ms' }}>
              <CardHeader className="items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Target className="h-8 w-8 animate-pulse" />
                </div>
                <CardTitle className="font-headline uppercase mt-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-foreground/80">
                <p>
                  To empower businesses by fusing creative storytelling with intelligent technology, delivering digital solutions that drive measurable growth and build lasting connections.
                </p>
              </CardContent>
            </Card>

            <Card className="flex flex-col text-center animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: '400ms' }}>
              <CardHeader className="items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Eye className="h-8 w-8 animate-pulse" />
                </div>
                <CardTitle className="font-headline uppercase mt-4">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-foreground/80">
                <p>
                  To be the leading digital partner in transforming how organizations engage with their audiences in the digital frontier, setting new standards for innovation and impact.
                </p>
              </CardContent>
            </Card>

            <Card className="flex flex-col text-center animate-in fade-in zoom-in-95 duration-500" style={{ animationDelay: '600ms' }}>
              <CardHeader className="items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Gem className="h-8 w-8 animate-pulse" />
                </div>
                <CardTitle className="font-headline uppercase mt-4">Our Values</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-foreground/80">
                <ul className="space-y-2 text-left">
                  <li className="flex items-start"><Gem className="w-4 h-4 mt-1 mr-2 text-primary/80 flex-shrink-0" /><span><strong>Innovation:</strong> Relentlessly pursuing new ideas.</span></li>
                  <li className="flex items-start"><Gem className="w-4 h-4 mt-1 mr-2 text-primary/80 flex-shrink-0" /><span><strong>Partnership:</strong> Succeeding when our clients succeed.</span></li>
                  <li className="flex items-start"><Gem className="w-4 h-4 mt-1 mr-2 text-primary/80 flex-shrink-0" /><span><strong>Excellence:</strong> Delivering world-class quality.</span></li>
                  <li className="flex items-start"><Gem className="w-4 h-4 mt-1 mr-2 text-primary/80 flex-shrink-0" /><span><strong>Integrity:</strong> Operating with transparency and trust.</span></li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
