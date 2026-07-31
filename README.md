# ClearMate

ClearMate is an AI document intelligence application designed to help people understand complex everyday documents, including medical reports, electricity bills, and bank notices.

## Current Foundation

The project is implemented as a full-stack **Next.js** application with **TypeScript** and **Tailwind CSS**. The App Router provides the frontend routes and reserved server endpoints in one codebase.

The current project foundation includes:

- Next.js App Router routes for the marketing page, analysis flow, and results dashboard
- TypeScript configuration with strict type checking
- Tailwind CSS and PostCSS configuration
- ESLint configuration for Next.js and TypeScript
- Reusable component, hook, type, and library module placeholders
- Reserved API route locations for future document analysis and document-grounded chat

The user interface, document-processing workflow, and OpenAI API integration have not yet been implemented.

## Technology

- Next.js
- TypeScript
- React
- Tailwind CSS
- ESLint
- pnpm

## Project Structure

```text
app/           Application routes and reserved API endpoints
components/    Reusable layout, marketing, upload, results, chat, and UI components
hooks/         Shared React hooks
lib/           Future AI, document, and shared utility modules
types/         Shared TypeScript types
public/        Static assets
tests/         Unit and end-to-end test locations
docs/          Product requirements and design specification
```

## Run Locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser.

To create a production build:

```bash
pnpm build
pnpm start
```
