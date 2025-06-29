import { SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = SERVICES.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const otherServices = SERVICES.filter((s) => s.slug !== params.slug);

  return (
    <div className="animate-fade-in">
      <section className="relative h-64 sm:h-80 md:h-96">
        <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" className="opacity-20" data-ai-hint={service.dataAiHint}/>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container mx-auto px-4 relative h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl font-headline font-bold">{service.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">{service.description}</p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <h2 className="text-3xl font-headline font-bold mb-6">Service Details</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-foreground">
                        <p>{service.details}</p>
                        <h3 className="font-headline">Key Benefits</h3>
                        <ul className="space-y-2">
                            <li className="flex items-start"><Check className="w-5 h-5 mt-1 mr-3 text-primary flex-shrink-0" /><span>Gain a competitive advantage with expert strategy.</span></li>
                            <li className="flex items-start"><Check className="w-5 h-5 mt-1 mr-3 text-primary flex-shrink-0" /><span>Improve efficiency and reduce operational costs.</span></li>
                            <li className="flex items-start"><Check className="w-5 h-5 mt-1 mr-3 text-primary flex-shrink-0" /><span>Leverage cutting-edge technology for growth.</span></li>
                            <li className="flex items-start"><Check className="w-5 h-5 mt-1 mr-3 text-primary flex-shrink-0" /><span>Make data-driven decisions with confidence.</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle className="font-headline">Other Services</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {otherServices.map(other => (
                          <li key={other.slug}>
                            <Link href={`/services/${other.slug}`} className="font-medium hover:text-primary transition-colors">
                              {other.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                       <Button asChild className="w-full mt-6">
                         <Link href="/lead-assessment">Get AI Assessment</Link>
                       </Button>
                    </CardContent>
                  </Card>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
