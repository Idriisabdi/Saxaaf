import * as React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import ProcessIllustration from '@/components/illustrations/process-illustration';
import ServiceHeroAnimation from '@/components/illustrations/ServiceHeroAnimation';
import CameraLensIcon from '@/components/illustrations/CameraLensIcon';
import CodeBracketsIcon from '@/components/illustrations/CodeBracketsIcon';
import AiEyeIcon from '@/components/illustrations/AiEyeIcon';

const services = [
  {
    icon: <CameraLensIcon />,
    title: 'Media & Content Creation',
    description:
      'From brand films and promotional videos to podcast production and SEO-optimized content, we create media that captivates and converts.',
    details: [
      'Video Production',
      'Podcast Production & Strategy',
      'Branding & Visual Identity',
      'Content Marketing & SEO',
    ],
  },
  {
    icon: <CodeBracketsIcon />,
    title: 'Web & Software Development',
    description:
      'We design and build robust, mobile-first websites, and custom applications using modern, scalable technology.',
    details: [
      'Custom Website Design',
      'Mobile App Development',
      'Headless CMS & API Integration',
      'Cloud & DevOps',
    ],
  },
  {
    icon: <AiEyeIcon />,
    title: 'AI & Data Analytics',
    description:
      'Leverage the power of AI with our consulting, predictive analytics, and custom solution development, including advanced RAG models.',
    details: [
      'AI Systems Analysis & Consulting',
      'Predictive Analytics',
      'Custom AI Solutions (RAG)',
      'Interactive AI-Powered Demos',
    ],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Free Consultation & Discovery',
    description:
      "Every great project begins with a deep understanding of your vision. We start with a complimentary consultation to learn about your business goals, target audience, and technical requirements.",
  },
  {
    number: '02',
    title: 'Strategy & Concept',
    description:
      "This is where vision takes shape. Our integrated team of strategists, designers, and system architects collaborates to build a comprehensive blueprint for your project, translating your goals into a clear, actionable strategy.",
  },
  {
    number: '03',
    title: 'Development & Testing',
    description:
      "Our expert teams bring the blueprint to life with precision and skill. Our Media Production unit captures and creates stunning visual and audio content. Our Web and Software Design team writes clean, scalable code to build your custom platform.",
  },
  {
    number: '04',
    title: 'Launch & Handover',
    description:
      "We manage a smooth and secure transition from the development environment to a live server. Our meticulous launch process is designed to deploy your new digital asset without downtime or issues, ensuring it's ready to perform from the moment it goes live.",
  },
  {
    number: '05',
    title: 'Growth & Optimization',
    description:
      "Our partnership extends beyond the launch. We provide ongoing support to ensure your digital assets continue to perform optimally and drive results. We believe in building long-term relationships focused on sustained success.",
  },
];


export default function ServicesPage() {
  return (
    <div className="bg-background overflow-hidden">
       {/* Hero Section */}
      <div className="w-full bg-card/30 border-b">
        <div className="container mx-auto">
            <div className="grid min-h-[70vh] items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
                <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
                    <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl uppercase flex items-center gap-4">
                        <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                        Our Services
                    </h1>
                    <p className="max-w-2xl text-xl text-foreground">
                        A complete suite of digital services designed to work together to build your digital future. We combine strategy, design, and technology to deliver impactful results.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button asChild size="lg" variant="default">
                            <Link href="/lead-assessment">
                                Get Free AI Assessment
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="outline">
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
                <div className="relative flex items-center justify-center animate-in fade-in zoom-in-95 duration-700 md:order-first">
                    <ServiceHeroAnimation className="w-full h-auto max-w-lg" />
                </div>
            </div>
        </div>
      </div>
      
      {/* Services Cards Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="flex flex-col text-center animate-in fade-in zoom-in-95 duration-500"
              style={{ animationDelay: `${(index + 1) * 150}ms` }}
            >
              <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {React.cloneElement(service.icon, { className: 'h-10 w-10' })}
                  </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <CardTitle className="mb-3 font-bold uppercase">{service.title}</CardTitle>
                <CardDescription className="mb-6 flex-grow">
                  {service.description}
                </CardDescription>

                <div className="my-4 w-full border-t border-border/50"></div>

                <ul className="w-full space-y-3 text-left">
                  {service.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-foreground/80">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-card border-y animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="container mx-auto px-4 pt-16 pb-24 sm:pt-24 sm:pb-32">
          <div className="mb-16 text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight md:text-4xl uppercase flex items-center justify-center gap-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              Our Process: From Idea to Launch
            </h2>
          </div>
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
              {processSteps.map((step) => (
                <div key={step.number} className="flex items-start gap-6">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-3xl font-black text-primary">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-headline text-2xl font-bold uppercase">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="sticky top-24 -mt-8 hidden md:flex items-center justify-center p-8 animate-in fade-in slide-in-from-right-8 duration-700">
              <ProcessIllustration className="h-auto w-full max-w-sm"/>
            </div>
          </div>
          <div className="mt-24 flex flex-col items-center justify-center gap-4 text-center sm:flex-row animate-in fade-in zoom-in-95 duration-700">
            <p className="text-xl font-medium">Your first step</p>
            <ArrowRight className="h-6 w-6 shrink-0 -rotate-90 sm:rotate-0" />
            <Button asChild size="lg">
              <Link href="/lead-assessment">Book a free consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
