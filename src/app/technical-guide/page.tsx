import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Palette, Zap, Puzzle, BrainCircuit, Database, Server } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TechnicalGuidePage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Technical Implementation Guide</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          A comprehensive overview of the technical stack, architecture, and features of this application.
        </p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Palette /> Styling & Theme</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Color Scheme</AccordionTrigger>
                <AccordionContent>
                  The application uses a themable color system defined in <code>src/app/globals.css</code>. Colors are managed via CSS variables for both light and dark modes, ensuring consistency. Key color variables include:
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">--background</Badge>
                    <Badge variant="secondary">--foreground</Badge>
                    <Badge>--primary</Badge>
                    <Badge variant="outline">--card</Badge>
                    <Badge variant="secondary">--secondary</Badge>
                    <Badge variant="secondary">--accent</Badge>
                    <Badge variant="destructive">--destructive</Badge>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Fonts</AccordionTrigger>
                <AccordionContent>
                  Typography is handled by Google Fonts, specifically <strong>Inter</strong> for body text and <strong>Space Grotesk</strong> for headlines. These are configured in <code>src/app/layout.tsx</code> and applied via Tailwind CSS in <code>tailwind.config.ts</code>.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Tailwind CSS & ShadCN</AccordionTrigger>
                <AccordionContent>
                  The UI is built with Tailwind CSS for utility-first styling and ShadCN for a rich set of pre-built, accessible, and customizable React components. The configuration in <code>tailwind.config.ts</code> extends the default theme with our custom color palette, fonts, and animations. ShadCN components are located in <code>src/components/ui</code>.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Zap /> Animations & Interactivity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Subtle animations and hover effects are used to create a dynamic user experience.</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Page Transitions:</strong> Pages use a fade-in effect on load, defined as <code>animate-fade-in</code> in <code>tailwind.config.ts</code>. Some elements also have a fade-in-up effect.</li>
              <li><strong>Hover Effects:</strong> Interactive elements like buttons and cards have hover states (e.g., color changes, shadow elevation) to provide visual feedback. These are primarily handled by Tailwind's hover variants.</li>
              <li><strong>Icons:</strong> Icons are provided by the <code>lucide-react</code> library, offering a consistent and lightweight set of vector icons.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Puzzle /> Content & Page Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>The application follows the Next.js App Router paradigm. Here is a map of the pages:</p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li><code>/</code> - <strong>Homepage:</strong> The main landing page. (<code>src/app/page.tsx</code>)</li>
                <li><code>/services</code> - <strong>Services:</strong> An overview of all services offered. (<code>src/app/services/page.tsx</code>)</li>
                <li><code>/services/[slug]</code> - <strong>Service Detail:</strong> A dynamic page for each specific service. (<code>src/app/services/[slug]/page.tsx</code>)</li>
                <li><code>/about</code> - <strong>About Us:</strong> Information about the team and company philosophy. (<code>src/app/about/page.tsx</code>)</li>
                <li><code>/lead-assessment</code> - <strong>AI Lead Assessment:</strong> An interactive form for lead analysis. (<code>src/app/lead-assessment/page.tsx</code>)</li>
                <li><code>/technical-guide</code> - <strong>Technical Guide:</strong> This page. (<code>src/app/technical-guide/page.tsx</code>)</li>
            </ul>
             <p className="mt-4">Key reusable components like <code>Header</code>, <code>Footer</code>, and UI elements are located in the <code>src/components</code> directory.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><BrainCircuit /> Generative AI Logic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The AI-powered lead assessment is implemented using <strong>Genkit</strong>, a framework for building AI-powered features. The core logic resides in <code>src/ai/flows/assess-lead.ts</code>.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
              <li>A <strong>Genkit Flow</strong> (<code>assessLeadFlow</code>) is defined to orchestrate the AI interaction. It's a server-side function.</li>
              <li>It defines input (<code>AssessLeadInputSchema</code>) and output (<code>AssessLeadOutputSchema</code>) structures using Zod schemas. This ensures type safety and structured data from the LLM.</li>
              <li>A <strong>Prompt</strong> is defined with instructions for the AI to act as a lead assessment expert. It uses Handlebars syntax <code>{"{{{...}}}"}</code> to insert user input from the form into the prompt.</li>
              <li>The <code>/lead-assessment</code> page's form calls this flow, sends the user's data, and displays the structured response (score, rationale, and next steps) back to the user.</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Database /> Data & Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-start gap-4 bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md">
                <Server className="w-6 h-6 text-amber-600 mt-1" />
                <div>
                    <h3 className="font-bold text-amber-800">No Database Integration</h3>
                    <p className="text-amber-700">
                    Currently, the application does not include a database connection (like Firestore). The lead assessment form submits data directly to the Genkit AI flow for analysis, and the results are displayed on the client-side without being persisted.
                    </p>
                </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
