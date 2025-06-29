'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Palette, Zap, Puzzle, BrainCircuit, Database, Server, FileCode, Copy, Check, Shield } from "lucide-react";
import GridBackground from "@/components/illustrations/grid-background";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function TechnicalGuidePage() {
  const { toast } = useToast();
  const [isPromptCopied, setIsPromptCopied] = useState(false);
  const [isRulesCopied, setIsRulesCopied] = useState(false);

  const prompt = `You are an AI-powered lead assessment tool. Analyze the following lead information and provide a lead score, rationale, and next steps.

Company Name: {{{companyName}}}
Industry: {{{industry}}}
Company Size: {{{companySize}}}
Lead Description: {{{leadDescription}}}

Consider factors like the company's industry, size, and the lead description to determine the potential value of the lead.  Provide a lead score between 0 and 100.`;

  const firestoreRules = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // LEADS & CONTACTS: Allows public form submission, but only authenticated
    // admins can read or manage the data.
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /contacts/{contactId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }

    // CHAT: Allows anyone to create a chat and send/receive messages,
    // but only authenticated admins can manage the top-level chat documents.
    match /chats/{chatId} {
      // Allow anyone to create a chat session (pre-chat form)
      allow create: if true;
      // Allow authenticated admins to read/update/delete chat session metadata
      allow read, update, delete: if request.auth != null;

      // Allow anyone to read/write messages within their own chat session.
      // This relies on client-side logic to only access the correct chat.
      match /messages/{messageId} {
        allow read, write: if true;
      }
    }

    // BEHAVIOR ANALYTICS: Allows anyone to log a page view, but only
    // authenticated admins can read the collected data.
    match /pageViews/{viewId} {
      allow create: if true;
      allow read: if request.auth != null;
    }

    // Fallback rule: Deny all other reads/writes by default for security.
    match /{document=**} {
        allow read, write: if false;
    }
  }
}`;

  const handlePromptCopy = () => {
    navigator.clipboard.writeText(prompt).then(() => {
      setIsPromptCopied(true);
      toast({ title: "Copied!", description: "AI system prompt copied to clipboard." });
      setTimeout(() => setIsPromptCopied(false), 2000);
    });
  };

  const handleRulesCopy = () => {
    navigator.clipboard.writeText(firestoreRules).then(() => {
      setIsRulesCopied(true);
      toast({ title: "Copied!", description: "Firestore rules copied to clipboard." });
      setTimeout(() => setIsRulesCopied(false), 2000);
    });
  };

  return (
    <div className="relative overflow-hidden animate-fade-in">
      <GridBackground />
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">PillarClone - Technical Guide</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            This guide provides a comprehensive overview of the application's architecture, styling, and core functionalities.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Palette className="w-6 h-6" /> Styling and UI</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full space-y-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-xl font-headline">Color Theme</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-base">
                    <p>The theme is defined in <code>src/app/globals.css</code> using CSS HSL variables for easy customization. The core colors are:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li><strong>Primary:</strong> A strong red (<code>#b42025</code>), used for buttons and key highlights.</li>
                      <li><strong>Secondary:</strong> An orange-gold (<code>#f5a623</code>), used for secondary actions and accents.</li>
                      <li><strong>Background:</strong> A very light grayish-blue (<code>#F0F2F5</code> in light mode).</li>
                      <li><strong>Cards & Popovers:</strong> White in light mode, dark gray in dark mode.</li>
                    </ul>
                    <p>Both light and dark mode variables are defined within the <code>:root</code> and <code>.dark</code> selectors.</p>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-xl font-headline">Typography</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-base">
                    <p>The application uses two primary fonts, loaded from Google Fonts in <code>src/app/layout.tsx</code> and configured in <code>tailwind.config.ts</code>:</p>
                    <ul className="list-disc list-inside space-y-1 pl-2">
                      <li><strong>Headline:</strong> 'Space Grotesk' provides a modern, techy feel for titles.</li>
                      <li><strong>Body:</strong> 'Inter' is used for all body text for its readability.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-xl font-headline">UI Components</AccordionTrigger>
                  <AccordionContent className="space-y-2 text-base">
                    <p>The UI is built with Tailwind CSS for utility-first styling and <strong>ShadCN UI</strong> for a rich set of pre-built, accessible, and customizable React components. All UI components are located in <code>src/components/ui</code> and are styled according to the theme variables in <code>globals.css</code>.</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Zap className="w-6 h-6" /> Animations & Interactivity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <p>Animations are used to create a dynamic and engaging user experience, powered by the <code>tailwindcss-animate</code> plugin.</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                <li><strong>Page Transitions:</strong> Most pages use a <code>animate-fade-in</code> effect for a smooth entrance.</li>
                <li><strong>Staggered Animations:</strong> On the homepage, service cards use <code>animate-fade-in-up</code> with an inline <code>animationDelay</code> to appear sequentially.</li>
                <li><strong>Icons:</strong> Icons are from the <code>lucide-react</code> library, offering a consistent and lightweight set of vector icons. There are no complex, custom SVG animations in this project.</li>
                <li><strong>Hover Effects:</strong> Interactive elements like buttons and cards have hover states (e.g., color changes, shadow elevation) to provide visual feedback, handled by Tailwind's hover variants.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Puzzle className="w-6 h-6" /> Content & Page Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <p>The application uses the Next.js App Router paradigm. Here is a map of the pages:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                  <li><code>/</code> - <strong>Homepage:</strong> The main landing page. (<code>src/app/page.tsx</code>)</li>
                  <li><code>/services</code> - <strong>Services Overview:</strong> A page listing all services. (<code>src/app/services/page.tsx</code>)</li>
                  <li><code>/services/[slug]</code> - <strong>Service Detail:</strong> A dynamic page for each specific service. (<code>src/app/services/[slug]/page.tsx</code>)</li>
                  <li><code>/about</code> - <strong>About Us:</strong> Company philosophy and team members. (<code>src/app/about/page.tsx</code>)</li>
                  <li><code>/lead-assessment</code> - <strong>AI Lead Assessment:</strong> The interactive form for lead analysis. (<code>src/app/lead-assessment/page.tsx</code>)</li>
                  <li><code>/technical-guide</code> - <strong>Technical Guide:</strong> This current page. (<code>src/app/technical-guide/page.tsx</code>)</li>
              </ul>
              <p className="mt-4">Reusable components like <code>Header</code>, <code>Footer</code>, and the <code>Logo</code> are in the <code>src/components</code> directory.</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><BrainCircuit className="w-6 h-6" /> Generative AI (Genkit)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base">
              <p>
                The AI-powered lead assessment is implemented using <strong>Genkit</strong>. The core logic resides in <code>src/ai/flows/assess-lead.ts</code>.
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground pl-2">
                <li>A <strong>Genkit Flow</strong> (<code>assessLeadFlow</code>) orchestrates the AI interaction as a server-side function.</li>
                <li>It uses Zod schemas (<code>AssessLeadInputSchema</code>, <code>AssessLeadOutputSchema</code>) to define and validate the input from the form and the structured output from the LLM.</li>
                <li>The <code>/lead-assessment</code> page contains the <code>LeadAssessmentForm</code> component, which calls the flow and displays the structured response (score, rationale, next steps).</li>
              </ol>
              <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-headline flex items-center gap-2"><FileCode className="w-5 h-5"/> View System Prompt</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">This is the core instruction given to the AI, defining its role and the expected output format.</p>
                    <div className="relative">
                      <pre className="bg-muted p-4 pr-12 rounded-md text-sm overflow-x-auto">
                        <code className="font-code">{prompt}</code>
                      </pre>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground"
                        onClick={handlePromptCopy}
                        aria-label="Copy prompt"
                      >
                        {isPromptCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3"><Database className="w-6 h-6" /> Data & Persistence</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="space-y-4 text-base">
                 <p>This application uses <strong>Firestore</strong> for data persistence, including leads, contacts, chat messages, and analytics. To ensure security, it is critical to configure Firestore Rules in your Firebase project.</p>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="firestore-rules">
                      <AccordionTrigger className="text-lg font-headline flex items-center gap-2">
                          <Shield className="w-5 h-5 text-primary" /> View Firestore Rules
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2 text-sm text-muted-foreground">Copy and paste these rules into the 'Rules' tab of your Firestore database in the Firebase Console.</p>
                         <div className="relative">
                            <pre className="bg-muted p-4 pr-12 rounded-md text-sm overflow-x-auto">
                              <code className="font-code">{firestoreRules}</code>
                            </pre>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground"
                              onClick={handleRulesCopy}
                              aria-label="Copy Firestore Rules"
                            >
                              {isRulesCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                         </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
