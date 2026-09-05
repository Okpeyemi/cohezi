import Link from 'next/link';
import { CategoryBadge } from '@/components/ui/category-badge';
import { categoryBySlug } from '@/content/categories';
import type { Article } from '@/content/types';
import { formatDateFr } from '@/lib/format-date';

type ArticleHeaderProps = { article: Article; homeLabel: string };

export function ArticleHeader({ article, homeLabel }: ArticleHeaderProps) {
  const category = categoryBySlug[article.category];
  const meta = `${formatDateFr(article.publishedAt)} · ${article.readingMinutes} min de lecture`;

  return (
    <header className="hero-dark-change px-5 pb-16 pt-20 text-center md:pt-24">
      <nav aria-label="Fil d’Ariane" className="mx-auto max-w-[720px]">
        <ol className="flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-[0.14em] text-paper/60">
          <li>
            <Link href="/" className="transition-colors hover:text-paper">
              {homeLabel}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href={`/articles?categorie=${category.slug}`} className="transition-colors hover:text-paper">
              {category.title}
            </Link>
          </li>
        </ol>
      </nav>

      <div className="mt-8 flex justify-center">
        <CategoryBadge label={category.label} tone="dark" />
      </div>

      <h1 className="mx-auto mt-4 max-w-[720px] font-display text-4xl font-bold uppercase leading-[1.1] tracking-[-0.01em] text-paper md:text-5xl">
        {article.title}
      </h1>
      <p className="mx-auto mt-5 max-w-[620px] text-lg leading-7 text-paper/80">{article.excerpt}</p>
      <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/60">{meta}</p>
    </header>
  );
}
