import { config } from 'dotenv';
config();

// The flows are now imported directly into the API handler
// in src/app/api/genkit/[...slug]/route.ts
// This file is still used by `npm run genkit:watch` for development.
import '@/ai/flows/adaptive-learning-paths.ts';
import '@/ai/flows/virtual-teacher.ts';
