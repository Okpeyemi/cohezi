import type { Entity } from './types';

/**
 * Organisations citées dans les corps d'article, liées vers leur site officiel.
 *
 * Le rendu ne lie que la **première occurrence** de chaque nom dans un article, et
 * uniquement dans les paragraphes — jamais dans une citation, qui doit rester verbatim.
 *
 * Un nom composé doit précéder le nom simple qui le commence (« Mistral AI » avant
 * « Mistral ») : à position égale, c'est la correspondance la plus longue qui gagne.
 */
export const entities: Entity[] = [
  // Laboratoires et plateformes
  { name: 'Hugging Face', href: 'https://huggingface.co' },
  { name: 'NVIDIA', href: 'https://www.nvidia.com' },
  { name: 'OpenAI', href: 'https://openai.com' },
  { name: 'Anthropic', href: 'https://www.anthropic.com' },
  { name: 'Google DeepMind', href: 'https://deepmind.google' },
  { name: 'Google', href: 'https://about.google' },
  { name: 'Microsoft', href: 'https://www.microsoft.com' },
  { name: 'Mistral AI', href: 'https://mistral.ai' },
  { name: 'Mistral', href: 'https://mistral.ai' },
  { name: 'Meta AI', href: 'https://ai.meta.com' },
  { name: 'HUMAIN', href: 'https://humain.ai' },

  // Infrastructure et conseil
  { name: 'Nscale', href: 'https://www.nscale.com' },
  { name: 'Deloitte', href: 'https://www.deloitte.com' },
  { name: 'Salesforce', href: 'https://www.salesforce.com' },
  { name: 'IBM', href: 'https://www.ibm.com' },

  // Recherche et mesure
  { name: 'Epoch AI', href: 'https://epoch.ai' },
  { name: 'Stanford HAI', href: 'https://hai.stanford.edu' },
  { name: 'AI Index', href: 'https://hai.stanford.edu/ai-index' },
  { name: 'Artificial Analysis', href: 'https://artificialanalysis.ai' },
  { name: 'ARC Prize Foundation', href: 'https://arcprize.org' },
  { name: 'arXiv', href: 'https://arxiv.org' },

  // Autorités et institutions
  { name: 'Commission européenne', href: 'https://commission.europa.eu' },
  { name: 'CNIL', href: 'https://www.cnil.fr' },
  { name: 'CEPD', href: 'https://www.edpb.europa.eu' },
  { name: 'FDA', href: 'https://www.fda.gov' },
  { name: 'EMA', href: 'https://www.ema.europa.eu' },
  { name: 'Agence internationale de l’énergie', href: 'https://www.iea.org' },
  { name: 'Healthwatch England', href: 'https://www.healthwatch.co.uk' },
  { name: 'Reporters sans frontières', href: 'https://rsf.org' },
  { name: 'RSF', href: 'https://rsf.org' },

  // Médias cités
  { name: 'Next', href: 'https://next.ink' },
  { name: 'Numerama', href: 'https://www.numerama.com' },
  { name: 'TechCrunch', href: 'https://techcrunch.com' },
  { name: 'The Guardian', href: 'https://www.theguardian.com' },
  { name: 'The Information', href: 'https://www.theinformation.com' },
  { name: 'Financial Times', href: 'https://www.ft.com' },
  { name: 'Bloomberg', href: 'https://www.bloomberg.com' },
  { name: 'Reuters', href: 'https://www.reuters.com' },
  { name: 'Wired', href: 'https://www.wired.com' },
];
