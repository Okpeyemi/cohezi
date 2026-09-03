import type { Guide } from './types';

/** Les catégories ne sont pas affichées sur le site : attribuées d'après le sujet du guide. */
export const guides: Guide[] = [
  {
    slug: 'stand-out-in-an-ai-job-interview-with-the-proof-project-method',
    title: 'Stand Out in an AI Job Interview With the “Proof Project” Method',
    categories: ['recruiting-hr', 'student', 'general'],
    image: { alt: 'Screenshot of a workflow demo video' },
  },
  {
    slug: 'how-to-pick-a-dedicated-ai-device',
    title: 'How To Pick a Dedicated AI Device',
    categories: ['general'],
    image: { alt: 'Presenter holding a small AI device' },
  },
  {
    slug: 'how-to-connect-chatgpt-to-imessage-and-what-it-can-do',
    title: 'How To Connect ChatGPT to iMessage (and What It Can Do)',
    categories: ['general', 'coding'],
    image: { alt: 'Dark terminal window with a ChatGPT conversation' },
  },
  {
    slug: 'submit-your-ios-app-to-the-app-store-with-chatgpt-work',
    title: 'Submit Your iOS App to the App Store With ChatGPT Work',
    categories: ['coding'],
    image: { alt: 'App Store Connect dashboard' },
  },
  {
    slug: 'use-these-ai-skills-to-make-better-decisions-quickly',
    title: 'Use These AI Skills To Make Better Decisions Quickly',
    categories: ['business-operations', 'consulting'],
    image: { alt: 'Chat interface listing decision-making skills' },
  },
  {
    slug: 'beginners-guide-to-chatgpt-work-chatgpt-projects-101',
    title: 'Beginner’s Guide to ChatGPT Work (ChatGPT Projects 101)',
    categories: ['general', 'project-management'],
    image: { alt: 'ChatGPT Projects sidebar' },
  },
  {
    slug: 'build-a-reusable-ai-design-system-with-open-design',
    title: 'Build a Reusable AI Design System With Open Design',
    categories: ['design'],
    image: { alt: 'Design system component kit' },
  },
  {
    slug: 'use-gemini-canvas-to-visualize-google-sheets-like-a-pro',
    title: 'Use Gemini Canvas to Visualize Google Sheets Like a Pro',
    categories: ['data-analysis', 'finance'],
    image: { alt: 'Dashboard with bar and donut charts' },
  },
];
