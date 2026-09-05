export type IconName =
  | 'menu'
  | 'close'
  | 'arrow-right'
  | 'send'
  | 'search'
  | 'instagram'
  | 'linkedin'
  | 'tiktok'
  | 'x';

/** Sans `src`, le composant PlaceholderImage génère un visuel. */
export type ImageRef = { src?: string; alt: string };

export type NavItem = { label: string; href: string };

export type CategorySlug = 'actualite' | 'business' | 'societe' | 'analyse';

export type Category = {
  slug: CategorySlug;
  label: string;
  /**
   * Préfixe des chemins d'article de la rubrique (`/business` → `/business/mon-article`),
   * et non un lien vers une page de rubrique : celles-ci redirigent vers `/articles`.
   */
  href: string;
  /** Nom de la rubrique tel qu'affiché en titre de page et dans les onglets (« Analyses »). */
  title: string;
  /** Intitulé de l'eyebrow du bandeau, ex. « Cohezi / Business ». */
  eyebrow: string;
  /** Chapô de la rubrique, affiché sous le titre du bandeau. */
  description: string;
};

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'list'; items: string[] }
  /** Encadré « À retenir » : les points clés de l'article. */
  | { type: 'takeaway'; title: string; items: string[] };

/** Page consultée pour établir les faits d'un article. */
export type Source = {
  /** Média ou organisme, tel qu'on le nomme dans la prose : « Next », « CNIL ». */
  outlet: string;
  /** Titre exact de la page consultée. */
  title: string;
  url: string;
  /** Date de publication de la source (AAAA-MM-JJ). Absente si la source n'en affiche aucune. */
  publishedAt?: string;
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
  /** Corps de l'article, 5 à 8 blocs. */
  body: ArticleBlock[];
  /** Sources consultées, 1 à 4 par article. Obligatoire : pas d'article sans source. */
  sources: Source[];
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

export type ArticlePageCopy = {
  homeLabel: string;
  relatedTitle: string;
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
  article: ArticlePageCopy;
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
