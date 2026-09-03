import type { SiteConfig } from './types';

export const site: SiteConfig = {
  name: 'The Rundown',
  nav: [
    { label: 'AI University', href: '/ai-university' },
    { label: 'Articles', href: '/articles' },
    { label: 'Guides', href: '/guides' },
    { label: 'Tools', href: '/tools' },
    { label: 'Courses', href: '/courses' },
    { label: 'Careers', href: '/careers' },
    { label: 'Advertise', href: '/advertise' },
  ],
  headerCta: { label: 'University Platform', href: 'https://app.therundown.ai/' },
  hero: {
    titleStart: 'Learn AI in',
    titleAccent: '5 minutes',
    titleEnd: 'a day.',
    subtitle:
      'Get the latest AI news, understand why it matters, and learn how to apply it in your work.',
    emailPlaceholder: 'Email Address',
    subscribeLabel: 'Subscribe',
    trustedByPrefix: 'Join over',
    trustedByCount: '2,000,000+',
    trustedBySuffix: 'readers from companies like:',
    trustedBy: ['Google', 'OpenAI', 'Meta', 'Microsoft', 'Stripe', 'Apple', 'Netflix'],
  },
  sections: {
    articles: {
      title: 'Latest Articles',
      subtitle: 'The latest developments in AI, Tech and Robotics.',
      viewAllLabel: 'View all articles',
      viewAllHref: '/articles',
    },
    guides: {
      title: 'Guides',
      subtitle:
        'We crowdsource the top real-world AI use cases across our audience of over 1 million early adopters and create daily guides on exactly how you can copy them and apply it to your work.',
      viewAllLabel: 'View all guides',
      viewAllHref: '/guides',
    },
    tools: {
      title: 'Trending Tools',
      subtitle: 'The most useful AI tools - organized and categorized in one spot.',
      viewAllLabel: 'View all tools',
      viewAllHref: '/tools',
    },
  },
  footer: {
    description:
      'Get the latest AI news, understand why it matters, and learn how to apply it in your work. Join 2,000,000+ readers from companies like Apple, OpenAI, NASA.',
    columns: [
      {
        heading: 'Stay Updated',
        links: [
          { label: 'Articles', href: '/articles' },
          {
            label: 'Podcast',
            href: 'https://podcasts.apple.com/us/podcast/the-state-of-ai-with-rowan-cheung/id1689006106',
          },
          { label: 'Tools', href: '/tools' },
        ],
      },
      {
        heading: 'AI University',
        links: [
          { label: 'Courses', href: '/courses' },
          { label: 'Guides', href: '/guides' },
        ],
      },
      {
        heading: 'Company',
        links: [
          { label: 'Advertise', href: '/advertise' },
          { label: 'Careers', href: '/careers' },
          { label: 'Contact Us', href: 'mailto:support@therundown.ai' },
          { label: 'Privacy Policy', href: '/privacy-policy' },
          { label: 'Terms & Conditions', href: '/terms-privacy' },
        ],
      },
    ],
    copyright: '© 2026 The Rundown AI, Inc. All rights reserved.',
    social: [
      { label: 'X (Twitter)', href: 'https://twitter.com/therundownai', icon: 'x' },
      { label: 'Instagram', href: 'https://www.instagram.com/therundownai', icon: 'instagram' },
      { label: 'LinkedIn', href: 'https://linkedin.com/company/the-rundown-ai', icon: 'linkedin' },
    ],
  },
  comingSoonSlugs: [
    'ai-university',
    'articles',
    'guides',
    'tools',
    'courses',
    'careers',
    'advertise',
    'privacy-policy',
    'terms-privacy',
  ],
};
