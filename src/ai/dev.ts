import { config } from 'dotenv';
config();

// The flows are now imported directly into the genkit.ts configuration.
// This file is still used by `npm run genkit:watch` for local development outside of Next.js,
// so we need to ensure the main config file is loaded.
import '@/ai/genkit';
