'use server';

/**
 * @fileOverview This file defines a Genkit flow for adaptive learning paths.
 *
 * - analyzeStudentResponses - A function that analyzes student responses and adapts future lessons.
 * - AnalyzeStudentResponsesInput - The input type for the analyzeStudentResponses function.
 * - AnalyzeStudentResponsesOutput - The return type for the analyzeStudentResponses function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStudentResponsesInputSchema = z.object({
  lessonContent: z.string().describe('The content of the current lesson.'),
  studentResponses: z.array(z.string()).describe('The student\'s responses to the quiz questions.'),
  studentPreviousPerformance: z.number().describe('The student\'s previous performance score (0-100).'),
  schoolType: z.string().describe('The type of Iranian school the student attends.'),
  topic: z.string().describe('The subject of the lesson (e.g., physics, math, chemistry, biology).'),
});
export type AnalyzeStudentResponsesInput = z.infer<typeof AnalyzeStudentResponsesInputSchema>;

const AnalyzeStudentResponsesOutputSchema = z.object({
  adaptedLessonContent: z.string().describe('The adapted content of the next lesson.'),
  suggestedDifficulty: z.string().describe('Suggested difficulty level for the next lesson (easy, medium, hard).'),
  explanation: z.string().describe('Explanation of why the lesson was adapted in this way.'),
});
export type AnalyzeStudentResponsesOutput = z.infer<typeof AnalyzeStudentResponsesOutputSchema>;

export async function analyzeStudentResponses(input: AnalyzeStudentResponsesInput): Promise<AnalyzeStudentResponsesOutput> {
  return analyzeStudentResponsesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeStudentResponsesPrompt',
  input: {schema: AnalyzeStudentResponsesInputSchema},
  output: {schema: AnalyzeStudentResponsesOutputSchema},
  prompt: `You are an expert AI tutor specializing in creating tailored lesson plans for Iranian high school students, teaching in Persian.

You will analyze the student\'s responses to the quiz questions, their previous performance, and the lesson content to adapt the next lesson.
Consider the school type when adapting the lesson to ensure cultural and curriculum relevance.

Based on the student\'s performance, adjust the difficulty level and content of the next lesson, focusing on areas where the student needs more support.

Current Lesson Topic: {{{topic}}}
School Type: {{{schoolType}}}
Previous performance score: {{{studentPreviousPerformance}}}

Lesson Content: {{{lessonContent}}}
Student Responses:{{#each studentResponses}} - {{{this}}}{{/each}}


Adapt the lesson content, suggest a difficulty level (easy, medium, hard) for the next lesson, and explain why you made these changes in Persian.
Make sure the output is easily understandable by high schoolers.
`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const analyzeStudentResponsesFlow = ai.defineFlow(
  {
    name: 'analyzeStudentResponsesFlow',
    inputSchema: AnalyzeStudentResponsesInputSchema,
    outputSchema: AnalyzeStudentResponsesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
