'use server';
/**
 * @fileOverview Assesses a business's needs using AI for a complete assessment.
 *
 * - assessLead - A function that handles the business assessment process.
 * - AssessLeadInput - The input type for the assessLead function.
 * - AssessLeadOutput - The return type for the assessLead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AssessLeadInputSchema = z.object({
  companyName: z.string().describe('The name of the company.'),
  industry: z.string().describe('The industry the company operates in.'),
  companySize: z.string().describe('The size of the company (e.g., number of employees, revenue).'),
  businessModel: z.string().describe('The company\'s business model (e.g., B2B, B2C, Subscription).'),
  targetAudience: z.string().describe('A description of the company\'s target customers.'),
  challenges: z.string().describe('The primary challenges or pain points the company is currently facing.'),
  goals: z.string().describe('The company\'s main goals for the near future.'),
  onlinePresence: z.string().optional().describe('Links to the company\'s website or social media profiles.'),
  competitors: z.string().optional().describe('A list of the company\'s main competitors.'),
});
export type AssessLeadInput = z.infer<typeof AssessLeadInputSchema>;

const AssessLeadOutputSchema = z.object({
  leadScore: z.number().min(0).max(100).describe('A score from 0 to 100 indicating the lead potential, with higher scores indicating better potential.'),
  strategicSummary: z.string().describe('A detailed analysis and strategic summary of the business based on the provided information.'),
  swotAnalysis: z.object({
    strengths: z.string().describe('Key internal strengths of the business.'),
    weaknesses: z.string().describe('Key internal weaknesses or areas for improvement.'),
    opportunities: z.string().describe('External market opportunities the business can leverage.'),
    threats: z.string().describe('External threats or competitive challenges the business faces.'),
  }),
  recommendedServices: z.array(z.enum(["Media & Content Creation", "Web & Software Development", "AI & Data Analytics"])).describe('A list of recommended services based on the analysis. Choose from the provided options.'),
  nextSteps: z.string().describe('Actionable, recommended next steps for engaging the lead and addressing their needs.'),
});
export type AssessLeadOutput = z.infer<typeof AssessLeadOutputSchema>;

export async function assessLead(input: AssessLeadInput): Promise<AssessLeadOutput> {
  return assessLeadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'assessLeadPrompt',
  input: {schema: AssessLeadInputSchema},
  output: {schema: AssessLeadOutputSchema},
  prompt: `You are a senior business strategist and digital transformation consultant. Your task is to conduct a comprehensive business assessment based on the information provided by a potential client.

Analyze the following business details thoroughly:

- Company Name: {{{companyName}}}
- Industry: {{{industry}}}
- Company Size: {{{companySize}}}
- Business Model: {{{businessModel}}}
- Target Audience: {{{targetAudience}}}
- Current Challenges: {{{challenges}}}
- Primary Goals: {{{goals}}}
- Online Presence: {{{onlinePresence}}}
- Competitors: {{{competitors}}}

Based on your analysis, provide a complete assessment in the required JSON format.
1.  **Lead Score**: Assign a lead potential score from 0-100. Base this on their clarity of goals, articulation of challenges, and alignment with our services (Media, Web/Software, AI). A high score indicates a well-defined problem and a strong fit for our services.
2.  **Strategic Summary**: Write a concise but insightful summary of the business's current situation and potential.
3.  **SWOT Analysis**: Provide a brief but specific SWOT analysis (Strengths, Weaknesses, Opportunities, Threats).
4.  **Recommended Services**: Based on their goals and challenges, recommend a list of our core services. Your options are ONLY: "Media & Content Creation", "Web & Software Development", "AI & Data Analytics".
5.  **Next Steps**: Suggest clear, actionable next steps for us to take to engage this lead. Be specific.
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
