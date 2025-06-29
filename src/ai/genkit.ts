
import {config} from 'dotenv';
import {resolve} from 'path';
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

config({path: resolve(process.cwd(), '.env')});

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
});
