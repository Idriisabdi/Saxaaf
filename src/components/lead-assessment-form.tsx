'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { assessLead, type AssessLeadOutput } from '@/ai/flows/assess-lead';
import { addLead } from '@/services/lead-service';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Bot, FileText, Target, Sparkles, Check, Lightbulb, Shield, Swords, Goal } from 'lucide-react';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  industry: z.string().min(2, 'Industry is required.'),
  companySize: z.string().min(1, 'Company size is required.'),
  businessModel: z.string().min(3, "Please describe your business model."),
  targetAudience: z.string().min(10, "Please describe your target audience."),
  challenges: z.string().min(10, "Please describe your main challenges."),
  goals: z.string().min(10, "Please describe your primary goals."),
  onlinePresence: z.string().optional(),
  competitors: z.string().optional(),
});

export default function LeadAssessmentForm() {
  const [assessment, setAssessment] = useState<AssessLeadOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      industry: '',
      companySize: '',
      businessModel: '',
      targetAudience: '',
      challenges: '',
      goals: '',
      onlinePresence: '',
      competitors: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAssessment(null);
    try {
      const result = await assessLead(values);
      setAssessment(result);
      await addLead(values, result);
      toast({
        title: 'Assessment Complete',
        description: 'Your AI-powered business analysis has been generated.',
      });
    } catch (error) {
      console.error('Assessment failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to get assessment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const SwotCard = ({ icon, title, content }: { icon: React.ReactNode, title: string, content: string }) => (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium uppercase">{title}</CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">{content}</p>
        </CardContent>
      </Card>
  )

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2"><Sparkles className="w-6 h-6 text-primary" />Business Details</CardTitle>
          <CardDescription>The more detail you provide, the more accurate your AI assessment will be.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., InnovateCorp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., SaaS, E-commerce" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 50-200 employees" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="businessModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Model</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., B2B, D2C, Subscription" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="targetAudience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Audience</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your ideal customers. Who are they, what are their needs?"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="challenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Challenges</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What are the biggest pain points or obstacles your business is facing right now?"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What are you hoping to achieve in the next 6-12 months? (e.g., increase sales, launch a new product)"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="onlinePresence"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Online Presence (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="your-website.com, social media links" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="competitors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Main Competitors (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Competitor A, Competitor B" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Analyzing...' : 'Get AI Business Assessment'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="mt-8 text-center">
            <Bot className="w-12 h-12 mx-auto animate-bounce text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI is preparing your business assessment...</p>
         </div>
      )}

      {assessment && (
        <Card className="mt-8 animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Business Assessment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <Label>Lead Potential Score</Label>
              <div className="flex items-center gap-4 mt-2">
                <Progress value={assessment.leadScore} className="w-full" />
                <span className="font-bold text-lg text-primary">{assessment.leadScore}/100</span>
              </div>
            </div>

            <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold text-lg font-headline"><FileText className="w-5 h-5 text-secondary" />Strategic Summary</h3>
                <p className="text-muted-foreground">{assessment.strategicSummary}</p>
            </div>

            <div>
                <h3 className="flex items-center gap-2 font-semibold text-lg font-headline mb-4"><Sparkles className="w-5 h-5 text-secondary" />SWOT Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SwotCard icon={<Lightbulb className="w-4 h-4 text-muted-foreground"/>} title="Strengths" content={assessment.swotAnalysis.strengths} />
                  <SwotCard icon={<Shield className="w-4 h-4 text-muted-foreground"/>} title="Weaknesses" content={assessment.swotAnalysis.weaknesses} />
                  <SwotCard icon={<Goal className="w-4 h-4 text-muted-foreground"/>} title="Opportunities" content={assessment.swotAnalysis.opportunities} />
                  <SwotCard icon={<Swords className="w-4 h-4 text-muted-foreground"/>} title="Threats" content={assessment.swotAnalysis.threats} />
                </div>
            </div>
            
             <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold text-lg font-headline"><Sparkles className="w-5 h-5 text-secondary" />Recommended Services</h3>
                <ul className="space-y-2 pt-2">
                    {assessment.recommendedServices.map(service => (
                       <li key={service} className="flex items-center gap-3">
                         <Check className="w-5 h-5 text-green-500" />
                         <span className="font-medium">{service}</span>
                       </li>
                    ))}
                </ul>
            </div>
            
            <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold text-lg font-headline"><Target className="w-5 h-5 text-secondary" />Next Steps</h3>
                <p className="text-muted-foreground">{assessment.nextSteps}</p>
            </div>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
