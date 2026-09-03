import type { UniversityContent } from './types';

export const university: UniversityContent = {
  brandName: 'The Rundown',
  brandAccent: 'University',
  title: 'AI training for the future of work.',
  subtitle:
    'Get access to all our AI courses, hundreds of real-world AI use cases, live expert-led workshops, an exclusive network of AI early adopters, and more.',
  primaryCta: { label: 'Join AI University', href: 'https://app.therundown.ai/' },
  secondaryCta: { label: 'Explore The Rundown University', href: '/ai-university' },
  features: [
    {
      title: 'AI Courses',
      description:
        'Get unlimited access to all of our current & upcoming industry-specific AI courses for the duration of your subscription.',
      icon: 'courses',
    },
    {
      title: 'Daily Guides',
      description:
        'To keep up with the rapid pace of AI, our team publishes AI implementation guides daily. Our library contains 300+ practical use cases to automate real-world work.',
      icon: 'daily-guides',
    },
    {
      title: 'Workshops',
      description:
        'Join weekly, live, interactive sessions with industry leaders who are at the forefront of AI for hands-on implementation guidance and exclusive insights.',
      icon: 'workshops',
    },
    {
      title: 'Community',
      description:
        'Network with an exclusive community of AI-first professionals who are working smarter with AI. Learn how early adopters are using AI in their work and businesses.',
      icon: 'community',
    },
  ],
};
