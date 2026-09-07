import { articlePerspectives } from '../article-perspectives';
import type { Article, ArticleBlock, ArticleCore, ArticlePerspective } from '../types';
import { actualiteArticles } from './actualite';
import { analyseArticles } from './analyse';
import { businessArticles } from './business';
import { societeArticles } from './societe';

const cores: ArticleCore[] = [
  ...actualiteArticles,
  ...analyseArticles,
  ...businessArticles,
  ...societeArticles,
];

const blockText = (block: ArticleBlock): string => {
  if (block.type === 'paragraph' || block.type === 'heading') return block.text;
  if (block.type === 'quote') return `${block.text} ${block.author ?? ''}`;
  return block.items.join(' ');
};

const perspectiveText = (perspective: ArticlePerspective): string =>
  [
    ...perspective.whyItMatters,
    ...perspective.whatChanges,
    ...perspective.watch,
    ...(perspective.africaAndFrancophonie ?? []),
  ].join(' ');

const countWords = (text: string): number => text.trim().split(/\s+/u).filter(Boolean).length;

export const articleWordCount = (article: ArticleCore, perspective: ArticlePerspective): number =>
  countWords(`${article.body.map(blockText).join(' ')} ${perspectiveText(perspective)}`);

const enrich = (article: ArticleCore): Article => {
  const perspective = articlePerspectives[article.slug];
  if (!perspective) throw new Error(`Perspective éditoriale manquante pour ${article.slug}`);

  return {
    ...article,
    perspective,
    // 200 mots/minute, arrondi au supérieur : le temps suit réellement le contenu.
    readingMinutes: Math.max(1, Math.ceil(articleWordCount(article, perspective) / 200)),
  };
};

/**
 * Catalogue vérifié. L'ordre de concaténation est sans effet : les sélecteurs
 * de `lib/articles.ts` trient par date.
 */
export const articles: Article[] = cores.map(enrich);
