import type { SiteConfig, SocialLink } from './types';

/** Comptes officiels. Source unique : le pied de page les affiche en icônes et en toutes lettres. */
const social: SocialLink[] = [
  { label: 'TikTok', href: 'https://www.tiktok.com/@cohezi.io', icon: 'tiktok' },
  { label: 'Instagram', href: 'https://www.instagram.com/cohezi.io', icon: 'instagram' },
  { label: 'X', href: 'https://x.com/coheziio', icon: 'x' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cohezi.io', icon: 'linkedin' },
];

export const site: SiteConfig = {
  name: 'Cohezi',
  tagline: 'L’IA change le monde. Comprenez ce qui compte.',
  nav: [
    { label: 'Actualité', href: '/articles?categorie=actualite' },
    { label: 'Business', href: '/articles?categorie=business' },
    { label: 'Société', href: '/articles?categorie=societe' },
    { label: 'Analyses', href: '/articles?categorie=analyse' },
  ],
  headerCta: { label: 'S’inscrire', href: '#newsletter' },
  searchHref: '/articles',
  searchLabel: 'Rechercher',
  hero: {
    eyebrow: 'Cohezi / Intelligence artificielle',
    titleLine1: 'L’IA change le monde.',
    titleLine2: 'Comprenez ce qui compte',
    description:
      'Actualités, business, société et analyses pour comprendre l’intelligence artificielle sans le bruit.',
    emailPlaceholder: 'Votre adresse e-mail',
    subscribeLabel: 'S’inscrire',
    microCopy: 'La newsletter IA claire, 3× par semaine.',
    promise: 'Pour ceux qui veulent comprendre l’IA, pas seulement la suivre.',
  },
  sections: {
    latest: {
      title: 'À la une',
      subtitle: 'Les dernières actualités de l’IA, avec le contexte qui compte.',
      viewAllLabel: 'Voir toutes les actualités',
      viewAllHref: '/articles?categorie=actualite',
    },
    business: {
      title: 'Business',
      subtitle: 'Entreprises, financements, marchés et infrastructures de l’IA.',
      viewAllLabel: 'Voir tout le business',
      viewAllHref: '/articles?categorie=business',
    },
    societe: {
      title: 'Société',
      subtitle: 'Emploi, éducation, santé, culture : ce que l’IA change au quotidien.',
      viewAllLabel: 'Voir toute la société',
      viewAllHref: '/articles?categorie=societe',
    },
  },
  deepDive: {
    eyebrow: 'Cohezi / Décryptage',
    number: '01',
    readLabel: 'min de lecture',
    ctaLabel: 'Lire le décryptage',
  },
  newsletter: {
    eyebrow: 'Newsletter',
    titleLine1: 'Moins de bruit.',
    titleLine2: 'Plus de contexte.',
    description: 'L’essentiel de l’IA, directement dans votre boîte mail.',
    emailPlaceholder: 'Votre adresse e-mail',
    buttonLabel: 'Je m’inscris',
    microCopy: 'La newsletter IA claire, 3× par semaine.',
  },
  articles: {
    eyebrow: 'Cohezi / Articles',
    title: 'Articles',
    description: 'Toute l’actualité de l’IA, filtrable par rubrique et par mot-clé.',
    searchLabel: 'Rechercher un article',
    searchPlaceholder: 'Titre, sujet, entreprise…',
    allLabel: 'Toutes',
    emptyTitle: 'Aucun article ne correspond.',
    emptyAction: 'Réinitialiser les filtres',
  },
  article: {
    homeLabel: 'Accueil',
    relatedTitle: 'À lire ensuite',
  },
  footer: {
    tagline: ['Comprendre l’IA.', 'Comprendre ce qui change.'],
    columns: [
      {
        heading: 'Actualité',
        links: [
          { label: 'Business', href: '/articles?categorie=business' },
          { label: 'Société', href: '/articles?categorie=societe' },
          { label: 'Analyses', href: '/articles?categorie=analyse' },
        ],
      },
      {
        heading: 'Cohezi',
        links: [
          { label: 'À propos', href: '/a-propos' },
          { label: 'Newsletter', href: '#newsletter' },
          { label: 'Contact', href: '/contact' },
        ],
      },
      {
        heading: 'Suivre',
        links: social.map(({ label, href }) => ({ label, href })),
      },
    ],
    copyright: '© 2026 Cohezi',
    social,
  },
  comingSoon: [
    { slug: 'a-propos', label: 'À propos' },
    { slug: 'contact', label: 'Contact' },
  ],
};
