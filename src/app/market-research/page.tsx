import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Lightbulb,
  Signal,
  Users,
  CreditCard,
  DollarSign,
  Goal,
  Building,
  Handshake,
  Landmark,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const tableData = [
  { metric: 'Total Population', figure: '19.3 Million', source: '3' },
  { metric: 'Urban vs. Rural Population', figure: '48.8% Urban / 51.2% Rural', source: '3' },
  { metric: 'Internet Users', figure: '10.7 Million', source: '3' },
  { metric: 'Internet Penetration Rate', figure: '55.2%', source: '3' },
  { metric: 'Internet User Growth (YoY)', figure: '+3.5%', source: '3' },
  { metric: 'Cellular Mobile Connections', figure: '11.3 Million', source: '3' },
  { metric: 'Mobile Connection Penetration', figure: '58.3% (of population)', source: '3' },
  { metric: 'Social Media Users', figure: '3.05 Million', source: '3' },
  { metric: 'Social Media Penetration Rate', figure: '15.8% (of population)', source: '3' },
  { metric: 'Social Media User Growth (YoY)', figure: '+4.7%', source: '3' },
  { metric: 'Dominant Social Media Platform', figure: 'Facebook (62.93% Market Share)', source: '13' },
  { metric: 'Dominant Mobile Browser', figure: 'Chrome (92.29% Market Share)', source: '6' },
];

export default function MarketResearchPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-card py-24 sm:py-32">
        <div className="container mx-auto px-4 text-center animate-in fade-in zoom-in-95 duration-500">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl uppercase flex items-center justify-center gap-4">
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
            Opportunity Analysis
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl font-medium text-muted-foreground">
            Unveiling the Somali Digital Revolution: A Strategic Market Guide
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-7xl space-y-24 px-4 py-16 sm:py-24">
        <section className="space-y-6 rounded-lg border border-border bg-card p-8 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-start gap-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Lightbulb className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-headline text-3xl font-bold uppercase">
                Executive Foreword
              </h2>
              <p className="mt-1 text-lg text-muted-foreground">
                Navigating Somalia's Digital Tipping Point
              </p>
            </div>
          </div>
          <div className="space-y-6 pt-4 text-lg text-muted-foreground">
            <p>
              Somalia stands at a pivotal moment in its history, a digital
              tipping point where the narrative is no longer defined by past
              challenges but by the immense opportunities of a dynamic,
              mobile-first nation. This transformation is a story of "digital leapfrogging," where a lack of legacy infrastructure has cleared the path for the swift adoption of cutting-edge mobile and digital technologies.
            </p>
            <p>
              This report serves as an essential strategic guide for any forward-thinking leader within Somalia's business, non-governmental, and public sectors. It provides the critical data, in-depth analysis, and a clear roadmap necessary to understand and harness the power of this digital transformation. The insights contained herein are designed to equip decision-makers with the foresight needed to navigate the new Somali reality and secure a prosperous, connected future.
            </p>
          </div>
        </section>

        <section>
          <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl uppercase flex items-center justify-center gap-4">
               <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              Strategic Market Analysis
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              The data-backed realities of Somalia's digital ecosystem and economic landscape.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle className="flex items-start gap-4 uppercase">
                  <Signal className="mt-1 h-6 w-6 flex-shrink-0 text-primary animate-pulse" />
                  <span>The Connectivity Explosion</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 text-muted-foreground">
                <p>
                  With internet penetration soaring from 9.8% in 2023 to 55.2% in 2025, Somalia has crossed a critical threshold of digital adoption.
                </p>
                <p>
                  This connectivity is overwhelmingly mobile, supported by a rapidly modernizing infrastructure with aggressive 4G and 5G rollouts.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '400ms' }}>
              <CardHeader>
                <CardTitle className="flex items-start gap-4 uppercase">
                  <Users className="mt-1 h-6 w-6 flex-shrink-0 text-primary animate-pulse" />
                  <span>The Somali Digital Consumer</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 text-muted-foreground">
                <p>
                  A youthful, tech-savvy population drives digital adoption, with social media (led by Facebook and TikTok) as their primary channel for news and engagement.
                </p>
                <p>
                  A major opportunity exists to engage the 7 million+ Somalis who are online but not active on social media through professional websites and apps.
                </p>
              </CardContent>
            </Card>
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '600ms' }}>
              <CardHeader>
                <CardTitle className="flex items-start gap-4 uppercase">
                  <CreditCard className="mt-1 h-6 w-6 flex-shrink-0 text-primary animate-pulse" />
                  <span>The E-commerce Frontier</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-4 text-muted-foreground">
                <p>
                  High demand for e-commerce is held back by a "trust deficit." The first to build a truly trustworthy, professional digital platform will define and capture the market.
                </p>
                 <p>
                  In an oral-tradition society, high-quality video content is the key to building the trust and legitimacy the market demands.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl uppercase flex items-center justify-center gap-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              Somali Digital Landscape - 2025 Snapshot
            </h2>
          </div>
          <Card className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Metric</TableHead>
                  <TableHead className="font-semibold">Figure (Early 2025)</TableHead>
                  <TableHead className="text-right font-semibold">Source(s)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row, index) => (
                  <TableRow key={row.metric} className={index % 2 === 0 ? 'bg-card/50' : 'bg-transparent'}>
                    <TableCell className="font-medium">{row.metric}</TableCell>
                    <TableCell>{row.figure}</TableCell>
                    <TableCell className="text-right">{row.source}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        <section className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-4 uppercase">
                <DollarSign className="h-8 w-8 text-primary animate-pulse" />
                <span>A New Economic Dawn: From Aid to Investment</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-lg text-muted-foreground">
              <p>
                Historic debt relief has created a "launchpad" for a new era of economic development driven by self-reliance and private capital. The engine of this new economy is the country's resilient private sector, primarily composed of Micro, Small, and Medium Enterprises (MSMEs).
              </p>
              <p>
                A crucial element in this economic equation is the Somali diaspora, a formidable economic force that sends approximately $1.3 billion in remittances back to Somalia annually, exceeding all international aid combined. Engaging this key audience and investment source requires a professional and compelling digital presence.
              </p>
            </CardContent>
          </Card>
        </section>

        <section>
          <div className="mb-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl uppercase flex items-center justify-center gap-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              The Imperative for Digital Transformation
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Why a strategic digital presence is indispensable for every organization.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '200ms' }}>
              <CardHeader className="items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Building className="h-8 w-8 animate-pulse" />
                  </div>
                  <CardTitle className="uppercase">For Businesses</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center text-muted-foreground">
                <p>The 10.7 million Somalis online represent a vast, untapped market. A professional digital footprint is essential for reaching consumers, building a brand, driving sales, and attracting investment.</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '400ms' }}>
              <CardHeader className="items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Handshake className="h-8 w-8 animate-pulse" />
                  </div>
                  <CardTitle className="uppercase">For NGOs</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center text-muted-foreground">
                <p>Digital platforms are a force multiplier for mission delivery, amplifying impact, improving operational efficiency, and enhancing transparency for donors and stakeholders.</p>
              </CardContent>
            </Card>
            <Card className="flex flex-col animate-in fade-in zoom-in-95 duration-500 transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-2" style={{ animationDelay: '600ms' }}>
              <CardHeader className="items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Landmark className="h-8 w-8 animate-pulse" />
                  </div>
                  <CardTitle className="uppercase">For Government</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center text-muted-foreground">
                <p>With ICT as a national priority, a user-friendly digital presence is fundamental to modernizing public services, enhancing transparency, and rebuilding the social contract with a connected citizenry.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="rounded-lg bg-card p-8 text-center shadow-lg md:p-12 animate-in fade-in zoom-in-95 duration-700">
            <Goal className="mx-auto h-12 w-12 text-primary animate-pulse" />
            <h2 className="font-headline mt-6 text-3xl font-bold uppercase">
              Your Partner in the Digital Frontier
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              Understanding the scale of Somalia's digital transformation is the first step. The second is taking decisive action. We bridge the gap between analysis and execution, offering world-class digital services to engineer the tools your organization needs to lead in this new era.
            </p>
        </section>
        
        <section className="py-16 text-center animate-in fade-in zoom-in-95 duration-700">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl uppercase flex items-center justify-center gap-4">
              <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              Seize Your Digital Advantage
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
              The digital transformation of Somalia is not a future event; it
              is happening now, and its pace is accelerating. The
              organizations that act decisively today will define the
              landscape for the decade to come. The time to build your
              digital future is now.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="destructive">
                <Link href="/lead-assessment">Schedule a Free Consultation</Link>
              </Button>
            </div>
        </section>
      </main>
    </div>
  );
}
