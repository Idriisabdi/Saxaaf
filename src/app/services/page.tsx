import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <div className="animate-fade-in">
      <section className="py-20 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Services</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            From strategy to execution, we offer a comprehensive suite of services to help your business achieve its goals.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {SERVICES.map((service) => (
              <Card key={service.slug} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-60 w-full">
                  <Image src={service.image} alt={service.title} layout="fill" objectFit="cover" data-ai-hint={service.dataAiHint} />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button asChild>
                    <Link href={`/services/${service.slug}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
