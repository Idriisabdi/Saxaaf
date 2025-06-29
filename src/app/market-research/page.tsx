import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketResearchPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Market Research</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Insights into the digital landscape to inform your strategy.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Market Research Page</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This page is under construction. Check back soon for detailed market analysis.</p>
        </CardContent>
      </Card>
    </div>
  );
}
