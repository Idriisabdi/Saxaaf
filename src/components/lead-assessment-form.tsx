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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Bot, FileText, Target, Sparkles } from 'lucide-react';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required.'),
  industry: z.string().min(2, 'Industry is required.'),
  companySize: z.string().min(1, 'Company size is required.'),
  leadDescription: z.string().min(10, 'Please provide a more detailed description.'),
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
      leadDescription: '',
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
        title: 'Consultation Complete',
        description: 'Your AI-powered analysis has been saved.',
      });
    } catch (error) {
      console.error('Assessment failed:', error);
      toast({
        title: 'Error',
        description: 'Failed to get consultation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center gap-2"><Sparkles className="w-6 h-6 text-primary" />Consultation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <Input placeholder="e.g., 50-200 employees, $10M ARR" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leadDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project, goals, and any relevant context."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Analyzing...' : 'Get AI Consultation'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="mt-8 text-center">
            <Bot className="w-12 h-12 mx-auto animate-bounce text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI is preparing your consultation...</p>
         </div>
      )}

      {assessment && (
        <Card className="mt-8 animate-fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Consultation Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <FormLabel>Lead Potential Score</FormLabel>
              <div className="flex items-center gap-4 mt-2">
                <Progress value={assessment.leadScore} className="w-full" />
                <span className="font-bold text-lg text-primary">{assessment.leadScore}/100</span>
              </div>
            </div>

            <div className="space-y-2">
                <h3 className="flex items-center gap-2 font-semibold text-lg font-headline"><FileText className="w-5 h-5 text-secondary" />Rationale</h3>
                <p className="text-muted-foreground">{assessment.rationale}</p>
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
