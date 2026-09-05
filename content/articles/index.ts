import type { Article } from '../types';
import { actualiteArticles } from './actualite';
import { analyseArticles } from './analyse';
import { businessArticles } from './business';
import { societeArticles } from './societe';

/**
 * Contenu fictif au ton Cohezi : chaque titre dit ce qui s’est passé et pourquoi c’est important,
 * chaque extrait apporte le contexte ou l’impact, chaque corps répond à « ce que cela change » et
 * « ce qu’il faut surveiller ». À remplacer par de vrais articles avant publication.
 *
 * L'ordre de concaténation est sans effet : les sélecteurs de `lib/articles.ts` trient par date.
 */
export const articles: Article[] = [
  ...actualiteArticles,
  ...analyseArticles,
  ...businessArticles,
  ...societeArticles,
];
