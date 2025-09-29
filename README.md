# Yar-e Dabestani-man (My Schoolmate)

Yar-e Dabestani-man is an innovative, AI-powered adaptive learning platform designed specifically for Iranian high school students. It offers a personalized and interactive educational experience with features like tailored lesson plans, a virtual AI tutor, and dynamic content to help students master complex subjects at their own pace.

The application is built with a modern tech stack, leveraging the power of Next.js for the frontend and Google's Gemini models via Genkit for its advanced AI capabilities.

## ✨ Key Features

-   **Adaptive Learning Paths**: The platform analyzes a student's performance on quizzes to generate personalized content and adjust the difficulty for subsequent lessons, ensuring a learning path that is tailored to their needs.
-   **Virtual AI Teacher**: Students can engage in a real-time conversation with an AI tutor for subjects like Math, Physics, Chemistry, and Biology. The tutor can answer questions, explain complex topics, and even analyze images of homework problems.
-   **Interactive Content**: To make learning more engaging, the virtual tutor can generate dynamic content, including formatted tables for comparisons and interactive mathematical graphs using the Desmos API.
-   **Personalized Glossary**: Students can save key terms and definitions from lessons into a personal, persistent glossary for easy review and study.
-   **Subject-Based Curriculum**: The app is neatly organized by subjects, providing a clear structure for students to navigate through lessons and learning materials.
-   **Progressive Web App (PWA)**: The application is fully PWA-enabled, allowing for installation on mobile devices and offline access to learning content.

## 🚀 Tech Stack

-   **Framework**: [Next.js](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **AI Framework**: [Genkit](https://firebase.google.com/docs/genkit)
-   **AI Model**: [Google Gemini](https://deepmind.google/technologies/gemini/)
-   **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Charting**: [Recharts](https://recharts.org/) & [Desmos API](https://www.desmos.com/api)
-   **State Management**: React Context API

## 🏁 Getting Started

To get the project up and running on your local machine, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 20.x or higher)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add your Google AI API key:
    ```
    GEMINI_API_KEY=your_google_ai_api_key_here
    ```

### Running the Application

1.  **Run the development server:**
    This command starts the Next.js application.
    ```bash
    npm run dev
    ```

2.  **Run the Genkit development server (in a separate terminal):**
    This command starts the local server for the AI flows, allowing you to test and debug them.
    ```bash
    npm run genkit:watch
    ```

3.  **Open the application:**
    Open [http://localhost:9002](http://localhost:9002) in your browser to see the running application. The Genkit developer UI will be available at [http://localhost:4000](http://localhost:4000).

## 📁 Project Structure

The project follows a standard Next.js App Router structure:

```
.
├── src/
│   ├── app/                # Main application pages and layouts
│   ├── components/         # Reusable React components (UI, layout, features)
│   ├── ai/                 # Genkit configuration and AI flows
│   │   ├── flows/          # AI logic for features like virtual teacher
│   │   └── genkit.ts       # Core Genkit setup
│   ├── hooks/              # Custom React hooks (e.g., useUser, useGlossary)
│   ├── lib/                # Shared utilities, data, types, and configs
│   └── public/             # Static assets (images, manifest)
├── package.json
└── next.config.ts
```

## 🤖 AI Features Deep Dive

The AI functionality is powered by **Genkit**, an open-source framework for building robust AI applications.

-   **`src/ai/flows/virtual-teacher.ts`**: This flow manages the chat logic for the AI tutor. It uses Google's Gemini model and is equipped with **tools** to solve mathematical equations and generate Desmos graphs, providing a rich, interactive experience.
-   **`src/ai/flows/adaptive-learning-paths.ts`**: This flow takes a student's quiz responses and lesson context to generate a personalized analysis and suggest content for the next lesson, adapting to the student's learning curve.

---

This README provides a solid foundation for your project. Feel free to expand on any section as your application grows!
