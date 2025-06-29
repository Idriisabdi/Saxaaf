import { TEAM_MEMBERS } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      <section className="py-20 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">About Us</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            We are a team of passionate strategists, technologists, and creatives dedicated to helping businesses thrive in an ever-changing world.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-headline font-bold">Our Philosophy</h2>
              <p className="mt-4 text-muted-foreground">
                We believe that the best results come from a combination of deep expertise, collaborative partnership, and a genuine desire to see our clients succeed. We approach every challenge with curiosity and a commitment to excellence.
              </p>
              <p className="mt-4 text-muted-foreground">
                Our mission is to empower organizations to reach their full potential by providing them with the strategic insights and digital tools they need to innovate and grow. We're not just consultants; we're partners in your success.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
               <Image src="https://placehold.co/600x400.png" alt="Our Team" fill={true} className="object-cover" data-ai-hint="team collaboration" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-headline font-bold">Meet the Team</h2>
            <p className="mt-2 text-muted-foreground">The driving force behind our success.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={member.imageUrl} alt={member.name} data-ai-hint={member.dataAiHint} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle className="font-headline">{member.name}</CardTitle>
                  <p className="text-sm text-primary font-semibold">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
