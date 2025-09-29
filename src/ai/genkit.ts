'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import next from '@genkit-ai/next';

// Import flows directly
import * as adaptiveLearningFlow from '@/ai/flows/adaptive-learning-paths';
import * as virtualTeacherFlow from '@/ai/flows/virtual-teacher';

export const ai = genkit({
  plugins: [
    googleAI(),
    next({
      flows: [adaptiveLearningFlow, virtualTeacherFlow],
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});