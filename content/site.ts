import type { SiteConfig } from './types';

export const site: SiteConfig = {
  name: 'Cohezi',
  tagline: 'L’IA change le monde. Comprenez ce qui compte.',
  nav: [
    { label: 'Actualité', href: '/actualite' },
    { label: 'Business', href: '/business' },
    { label: 'Société', href: '/societe' },
    { label: 'Analyses', href: '/analyses' },
  ],
  headerCta: { label: 'S’inscrire', href: '#newsletter' },
  searchHref: '/recherche',
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
      viewAllHref: '/actualite',
    },
    business: {
      title: 'Business',
      subtitle: 'Entreprises, financements, marchés et infrastructures de l’IA.',
      viewAllLabel: 'Voir tout le business',
      viewAllHref: '/business',
    },
    societe: {
      title: 'Société',
      subtitle: 'Emploi, éducation, santé, culture : ce que l’IA change au quotidien.',
      viewAllLabel: 'Voir toute la société',
      viewAllHref: '/societe',
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
  footer: {
    tagline: ['Comprendre l’IA.', 'Comprendre ce qui change.'],
    columns: [
      {
        heading: 'Actualité',
        links: [
          { label: 'Business', href: '/business' },
          { label: 'Société', href: '/societe' },
          { label: 'Analyses', href: '/analyses' },
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
        links: [
          { label: 'Instagram', href: 'https://www.instagram.com/cohezi' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cohezi' },
          { label: 'TikTok', href: 'https://www.tiktok.com/@cohezi' },
        ],
      },
    ],
    copyright: '© 2026 Cohezi',
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/cohezi', icon: 'instagram' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/cohezi', icon: 'linkedin' },
      { label: 'TikTok', href: 'https://www.tiktok.com/@cohezi', icon: 'tiktok' },
    ],
  },
  comingSoon: [
    { slug: 'actualite', label: 'Actualité' },
    { slug: 'business', label: 'Business' },
    { slug: 'societe', label: 'Société' },
    { slug: 'analyses', label: 'Analyses' },
    { slug: 'a-propos', label: 'À propos' },
    { slug: 'contact', label: 'Contact' },
    { slug: 'recherche', label: 'Recherche' },
  ],
};
