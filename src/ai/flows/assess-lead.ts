'use server';
/**
 * @fileOverview Assesses lead potential using AI.
 *
 * - assessLead - A function that handles the lead assessment process.
 * - AssessLeadInput - The input type for the assessLead function.
 * - AssessLeadOutput - The return type for the assessLead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessLeadInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  industry: z.string().describe('The industry the company operates in.'),
  companySize: z.string().describe('The size of the company (e.g., number of employees, revenue).'),
  leadDescription: z.string().describe('A detailed description of the lead and their potential needs.'),
});
export type AssessLeadInput = z.infer<typeof AssessLeadInputSchema>;

const AssessLeadOutputSchema = z.object({
  leadScore: z.number().describe('A score from 0 to 100 indicating the lead potential, with higher scores indicating better potential.'),
  rationale: z.string().describe('The AI rationale for the assigned lead score.'),
  nextSteps: z.string().describe('Recommended next steps for engaging the lead based on the assessment.'),
});
export type AssessLeadOutput = z.infer<typeof AssessLeadOutputSchema>;

export async function assessLead(input: AssessLeadInput): Promise<AssessLeadOutput> {
  return assessLeadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessLeadPrompt',
  input: {schema: AssessLeadInputSchema},
  output: {schema: AssessLeadOutputSchema},
  prompt: `You are an AI-powered lead assessment tool. Analyze the following lead information and provide a lead score, rationale, and next steps.

Company Name: {{{companyName}}}
Industry: {{{industry}}}
Company Size: {{{companySize}}}
Lead Description: {{{leadDescription}}}

Consider factors like the company's industry, size, and the lead description to determine the potential value of the lead.  Provide a lead score between 0 and 100.
`,
});

const assessLeadFlow = ai.defineFlow(
  {
    name: 'assessLeadFlow',
    inputSchema: AssessLeadInputSchema,
    outputSchema: AssessLeadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
