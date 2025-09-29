import {createApiHandler} from '@genkit-ai/next';
import '@/ai/flows/adaptive-learning-paths';
import '@/ai/flows/virtual-teacher';

export const {GET, POST} = createApiHandler();
