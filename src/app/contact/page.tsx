import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Contact Us</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          We'd love to hear from you.
        </p>
      </div>
      <Card className="max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is under construction. Please use the "Schedule a Consultation" button to reach us.</p>
        </CardContent>
      </Card>
    </div>
  );
}
