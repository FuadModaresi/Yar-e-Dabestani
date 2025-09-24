'use server';

/**
 * @fileOverview This file defines a Genkit flow for a virtual teacher.
 *
 * - chatWithVirtualTeacher - A function to chat with a virtual teacher for a specific subject.
 * - ChatWithVirtualTeacherInput - The input type for the chatWithVirtualTeacher function.
 * - ChatWithVirtualTeacherOutput - The return type for the chatWithVirtualTeacher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithVirtualTeacherInputSchema = z.object({
  subject: z.string().describe('The subject the student wants to discuss (e.g., physics, math, chemistry, biology).'),
  message: z.string().describe("The student's message to the virtual teacher."),
  imageDataUri: z.string().optional().describe(
    "An optional image sent by the student, as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type ChatWithVirtualTeacherInput = z.infer<typeof ChatWithVirtualTeacherInputSchema>;

const TextContentSchema = z.object({
  type: z.literal('text'),
  content: z.string(),
});

const TableContentSchema = z.object({
    type: z.literal('table'),
    caption: z.string().optional(),
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
});

const ChartContentSchema = z.object({
    type: z.literal('chart'),
    caption: z.string().optional(),
    data: z.array(z.object({ name: z.string(), value: z.number() })),
});

const ContentItemSchema = z.union([
    TextContentSchema,
    TableContentSchema,
    ChartContentSchema,
]);


const ChatWithVirtualTeacherOutputSchema = z.object({
  response: z.array(ContentItemSchema).describe("The virtual teacher's response to the student, which can include text, tables, and charts."),
});
export type ChatWithVirtualTeacherOutput = z.infer<typeof ChatWithVirtualTeacherOutputSchema>;

export async function chatWithVirtualTeacher(input: ChatWithVirtualTeacherInput): Promise<ChatWithVirtualTeacherOutput> {
  return virtualTeacherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'virtualTeacherPrompt',
  input: {schema: ChatWithVirtualTeacherInputSchema},
  output: {schema: ChatWithVirtualTeacherOutputSchema},
  prompt: `You are a friendly and engaging AI virtual teacher for Iranian high school students. You are teaching in Persian.
Your expertise is in {{{subject}}}.

Your goal is to help the student understand the topic by explaining concepts clearly, providing examples, and asking thought-provoking questions.
Keep your responses concise, easy to understand for a high schooler, and encouraging. Use analogies and real-world examples relevant to an Iranian student's life where possible.

Do not solve homework problems directly, but guide the student to the solution.

If the user has provided an image, analyze it in the context of their question. The image could be of their homework, a diagram, or something they need help identifying.

To make your explanations more professional and easier to understand, you MUST use visual aids where appropriate. You can generate tables and simple bar charts.
- Use tables to compare and contrast concepts, show data, or list steps.
- Use bar charts to visualize data and relationships. Make sure chart data is simple and clear.

Your response will be an array of content blocks. For example:
[
  { "type": "text", "content": "Here is an explanation..." },
  { "type": "table", "caption": "Comparison of A and B", "headers": ["Feature", "A", "B"], "rows": [["Speed", "Fast", "Slow"]] },
  { "type": "chart", "caption": "Growth over time", "data": [{ "name": "Jan", "value": 10 }, { "name": "Feb", "value": 20 }] }
]

Always start with a text block.

Student's message:
"{{{message}}}"

{{#if imageDataUri}}
[Image provided by student]
{{media url=imageDataUri}}
{{/if}}

Your response must be in Persian. All text, including in tables and charts, must be in Persian.
`,
  config: {
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

const virtualTeacherFlow = ai.defineFlow(
  {
    name: 'virtualTeacherFlow',
    inputSchema: ChatWithVirtualTeacherInputSchema,
    outputSchema: ChatWithVirtualTeacherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
