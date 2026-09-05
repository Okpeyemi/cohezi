export type IconName = 'menu' | 'close' | 'arrow-right' | 'send' | 'search' | 'instagram' | 'linkedin' | 'tiktok';

/** Sans `src`, le composant PlaceholderImage génère un visuel. */
export type ImageRef = { src?: string; alt: string };

export type NavItem = { label: string; href: string };

export type CategorySlug = 'actualite' | 'business' | 'societe' | 'analyse';

export type Category = {
  slug: CategorySlug;
  label: string;
  href: string;
  /** Nom de la rubrique tel qu'affiché en titre de page et dans les onglets (« Analyses »). */
  title: string;
  /** Intitulé de l'eyebrow du bandeau, ex. « Cohezi / Business ». */
  eyebrow: string;
  /** Chapô de la rubrique, affiché sous le titre du bandeau. */
  description: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  /** Date de publication ISO 8601 (AAAA-MM-JJ). */
  publishedAt: string;
  readingMinutes: number;
  image: ImageRef;
  featured?: boolean;
  deepDive?: boolean;
};

export type SocialLink = { label: string; href: string; icon: IconName };

export type FooterColumn = { heading: string; links: NavItem[] };

/** Page annoncée mais pas encore écrite : premier segment d'URL et libellé affiché. */
export type ComingSoonPage = { slug: string; label: string };

export type HeroContent = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  emailPlaceholder: string;
  subscribeLabel: string;
  microCopy: string;
  promise: string;
};

export type SectionCopy = {
  title: string;
  subtitle: string;
  viewAllLabel: string;
  viewAllHref: string;
};

export type DeepDiveCopy = {
  eyebrow: string;
  number: string;
  /** Suffixe du temps de lecture, ex. « min de lecture ». */
  readLabel: string;
  ctaLabel: string;
};

export type NewsletterCopy = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  emailPlaceholder: string;
  buttonLabel: string;
  microCopy: string;
};

export type ArticlesPageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  searchLabel: string;
  searchPlaceholder: string;
  allLabel: string;
  emptyTitle: string;
  emptyAction: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  nav: NavItem[];
  headerCta: NavItem;
  searchHref: string;
  searchLabel: string;
  hero: HeroContent;
  sections: { latest: SectionCopy; business: SectionCopy; societe: SectionCopy };
  deepDive: DeepDiveCopy;
  newsletter: NewsletterCopy;
  articles: ArticlesPageCopy;
  footer: {
    /** Une entrée par ligne affichée. */
    tagline: string[];
    columns: FooterColumn[];
    copyright: string;
    social: SocialLink[];
  };
  /** Pages servies par la route attrape-tout, dans l'ordre de pré-rendu. */
  comingSoon: ComingSoonPage[];
};
