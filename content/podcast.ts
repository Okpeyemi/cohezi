import type { PodcastContent } from './types';

export const podcast: PodcastContent = {
  title: "Rowan's Notes",
  description:
    "Rowan's Notes is a podcast hosted by Rowan Cheung, where he talks with experts in the AI industry about the latest developments, why they matter, and how you can leverage them in the future of work.",
  listenLinks: [
    { label: 'Spotify', href: 'https://open.spotify.com/show/2zQpIc96gbruTylpzo9dVY', icon: 'spotify' },
    {
      label: 'Apple Podcasts',
      href: 'https://podcasts.apple.com/us/podcast/the-state-of-ai-with-rowan-cheung/id1689006106',
      icon: 'apple',
    },
  ],
  card: {
    platformLabel: 'Podcasts',
    title: "Rowan's Notes",
    meta: 'Tech News • Updated Daily',
    description:
      "Rowan's Notes is a podcast where The Rundown's founder, Rowan Cheung, interviews the people shaping the AI industry — breaking down what’s real vs hype and how to leverage it to get ahead in your life, work, and business.",
    ctaLabel: 'Latest Episode',
    ctaHref: 'https://podcasts.apple.com/us/podcast/the-state-of-ai-with-rowan-cheung/id1689006106',
    footnote: 'See how your data is managed…',
    artworkAlt: "Rowan's Notes podcast artwork",
  },
};
