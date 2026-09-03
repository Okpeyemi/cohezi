export type IconName =
  | 'menu'
  | 'close'
  | 'arrow-right'
  | 'send'
  | 'play'
  | 'more'
  | 'podcast'
  | 'spotify'
  | 'apple'
  | 'x'
  | 'instagram'
  | 'linkedin'
  | 'all'
  | 'coding'
  | 'marketing'
  | 'content-creator'
  | 'educator'
  | 'sales'
  | 'design'
  | 'data-analysis'
  | 'project-management'
  | 'consulting'
  | 'finance'
  | 'government'
  | 'healthcare'
  | 'legal'
  | 'recruiting-hr'
  | 'student'
  | 'general'
  | 'business-operations'
  | 'agents'
  | 'consumer'
  | 'miscellaneous'
  | 'science'
  | 'courses'
  | 'daily-guides'
  | 'workshops'
  | 'community';

/** Sans `src`, le composant PlaceholderImage génère un visuel. */
export type ImageRef = { src?: string; alt: string };

export type NavItem = { label: string; href: string };

export type Category = { slug: string; label: string; icon: IconName };

export type ArticleTag = 'ai' | 'tech' | 'robotics';

export type Article = {
  slug: string;
  title: string;
  subtitle?: string;
  author: string;
  readingMinutes: number;
  tag: ArticleTag;
  image: ImageRef;
  featured?: boolean;
};

export type Guide = {
  slug: string;
  title: string;
  /** Slugs de `guideCategories`. Attribués d'après le titre (non visibles sur le site). */
  categories: string[];
  image: ImageRef;
};

export type Tool = {
  slug: string;
  name: string;
  description: string;
  /** Slugs de `toolCategories`. */
  categories: string[];
  /** Icône du badge en haut à gauche du visuel. */
  badgeIcon: IconName;
  image: ImageRef;
};

export type UniversityFeature = { title: string; description: string; icon: IconName };

export type SocialLink = { label: string; href: string; icon: IconName };

export type FooterColumn = { heading: string; links: NavItem[] };

export type HeroContent = {
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitle: string;
  emailPlaceholder: string;
  subscribeLabel: string;
  trustedByPrefix: string;
  trustedByCount: string;
  trustedBySuffix: string;
  trustedBy: string[];
};

export type SectionCopy = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
};

export type SiteConfig = {
  name: string;
  nav: NavItem[];
  headerCta: NavItem;
  hero: HeroContent;
  sections: { articles: SectionCopy; guides: SectionCopy; tools: SectionCopy };
  footer: {
    description: string;
    columns: FooterColumn[];
    copyright: string;
    social: SocialLink[];
  };
  /** Premiers segments d'URL servis par la page « coming soon ». */
  comingSoonSlugs: string[];
};

export type PodcastContent = {
  title: string;
  description: string;
  listenLinks: { label: string; href: string; icon: IconName }[];
  card: {
    platformLabel: string;
    title: string;
    meta: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    footnote: string;
    artworkAlt: string;
  };
};

export type UniversityContent = {
  brandName: string;
  brandAccent: string;
  title: string;
  subtitle: string;
  primaryCta: NavItem;
  secondaryCta: NavItem;
  features: UniversityFeature[];
};
