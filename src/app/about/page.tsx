import { Sparkles } from 'lucide-react';
import CompanyOverviewAnimation from '@/components/illustrations/CompanyOverviewAnimation';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24 animate-in fade-in duration-500">
        <div className="text-center mb-16 animate-in fade-in zoom-in-95 duration-500">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl uppercase flex items-center justify-center gap-4">
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            About Us
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-foreground/80">
            Fusing creative vision with intelligent technology to build the future of digital engagement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                <CompanyOverviewAnimation className="w-full h-auto max-w-lg mx-auto" />
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
      </div>
    </div>
  );
}
