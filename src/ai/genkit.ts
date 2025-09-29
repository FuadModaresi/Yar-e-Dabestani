import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import next from '@genkit-ai/next';

// Import your flows here
import * as adaptiveLearningPaths from '@/ai/flows/adaptive-learning-paths';
import * as virtualTeacher from '@/ai/flows/virtual-teacher';

export const ai = genkit({
  plugins: [
    googleAI(),
    next({
        flows: [
            adaptiveLearningPaths.analyzeStudentResponses,
            virtualTeacher.chatWithVirtualTeacher,
        ],
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
