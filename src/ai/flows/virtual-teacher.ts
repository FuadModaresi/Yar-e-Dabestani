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
  type: z.enum(['text']),
  content: z.string(),
});

const TableContentSchema = z.object({
    type: z.enum(['table']),
    caption: z.string().optional(),
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
});

const ChartContentSchema = z.object({
    type: z.enum(['chart']),
    caption: z.string().optional(),
    data: z.array(z.object({ name: z.string(), value: z.number() })),
});

const LinkContentSchema = z.object({
    type: z.enum(['link']),
    url: z.string().url(),
    text: z.string(),
});


const ContentItemSchema = z.union([
    TextContentSchema,
    TableContentSchema,
    ChartContentSchema,
    LinkContentSchema,
]);


const ChatWithVirtualTeacherOutputSchema = z.object({
  response: z.array(ContentItemSchema).describe("The virtual teacher's response to the student, which can include text, tables, charts, and links."),
});
export type ChatWithVirtualTeacherOutput = z.infer<typeof ChatWithVirtualTeacherOutputSchema>;

export async function chatWithVirtualTeacher(input: ChatWithVirtualTeacherInput): Promise<ChatWithVirtualTeacherOutput> {
  return virtualTeacherFlow(input);
}


// Mock tool for solving equations
const solveEquationTool = ai.defineTool(
  {
    name: 'solveEquation',
    description: 'Solves a mathematical equation. Use this for any kind of equation.',
    inputSchema: z.object({
      equation: z.string().describe('The equation to solve. e.g., "2x + 5 = 15"'),
    }),
    outputSchema: z.object({
      solution: z.string().describe('The solution to the equation. e.g., "x = 5"'),
    }),
  },
  async ({ equation }) => {
    // In a real application, you would use a math library like math.js
    // For this example, we'll just mock a response.
    console.log(`Solving equation: ${equation}`);
    // A real implementation would parse and solve the equation.
    // This is a simplified mock.
    if (equation.includes('2x + 5 = 15')) {
      return { solution: 'x = 5' };
    } else if (equation.includes('x^2 - 4 = 0')) {
      return { solution: 'x = 2 or x = -2' };
    }
    return { solution: 'Could not solve the equation (this is a mock response).' };
  }
);

// Tool for plotting diagrams using desmos.com
const plotWithDesmos = ai.defineTool(
    {
        name: 'plotDiagram',
        description: 'Generates a URL to an interactive graph for a mathematical function using Desmos. Use this to visualize equations.',
        inputSchema: z.object({
            func: z.string().describe('The function to plot, e.g., "y = 2x + 1"'),
            title: z.string().describe('A title for the graph.'),
        }),
        outputSchema: z.object({
            graphUrl: z.string().url().describe('The URL of the generated interactive graph.'),
        }),
    },
    async ({ func }) => {
        console.log(`Plotting function with Desmos: ${func}`);
        const encodedFunc = encodeURIComponent(func);
        const graphUrl = `https://www.desmos.com/calculator?expression=${encodedFunc}`;
        return { graphUrl };
    }
);


const prompt = ai.definePrompt({
  name: 'virtualTeacherPrompt',
  input: {schema: ChatWithVirtualTeacherInputSchema},
  output: {schema: ChatWithVirtualTeacherOutputSchema},
  tools: [solveEquationTool, plotWithDesmos],
  prompt: `You are a friendly and engaging AI virtual teacher for Iranian high school students. You are teaching in Persian.
Your expertise is in {{{subject}}}.

Your goal is to help the student understand the topic by explaining concepts clearly, providing examples, and asking thought-provoking questions.
Keep your responses concise, easy to understand for a high schooler, and encouraging. Use analogies and real-world examples relevant to an Iranian student's life where possible.

Do not solve homework problems directly, but guide the student to the solution.

If the user has provided an image, analyze it in the context of their question. The image could be of their homework, a diagram, or something they need help identifying.

To make your explanations more professional and easier to understand, you MUST use visual aids where appropriate. You can generate tables and links to interactive graphs.
- Use tables to compare and contrast concepts, show data, or list steps.
- Use links for graphs and diagrams to visualize data and relationships.

**IMPORTANT CAPABILITIES**:
- **Equation Solving**: If the student asks you to solve a mathematical equation, you MUST use the \`solveEquation\` tool. The result from the tool should be presented to the user in a text block.
- **Diagram Plotting**: If the student asks for a diagram or plot of a function, you MUST use the \`plotDiagram\` tool. After calling the tool, you MUST use the \`graphUrl\` returned by the tool to create a \`link\` content item in your response. The link text should be descriptive, like "نمودار تعاملی برای y = x^2".

Your response will be an array of content blocks. For example:
[
  { "type": "text", "content": "Here is an explanation..." },
  { "type": "table", "caption": "Comparison of A and B", "headers": ["Feature", "A", "B"], "rows": [["Speed", "Fast", "Slow"]] },
  { "type": "link", "url": "https://www.desmos.com/calculator?expression=y%3Dx%5E2", "text": "نمودار تعاملی برای y=x^2" }
]

Always start with a text block to introduce the topic, then you can follow with other content types like charts or tables.

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
