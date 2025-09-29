import { config } from 'dotenv';
config();

// This file is used by `npm run genkit:watch` for local development.
import '@/ai/genkit';
import '@/ai/flows/adaptive-learning-paths';
import '@/ai/flows/virtual-teacher';
