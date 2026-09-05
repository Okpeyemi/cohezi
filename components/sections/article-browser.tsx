'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArticleCard } from '@/components/cards/article-card';
import { CategoryTabs, type TabSlug } from '@/components/ui/category-tabs';
import { Pagination } from '@/components/ui/pagination';
import { SearchField } from '@/components/ui/search-field';
import { categories, categoryBySlug } from '@/content/categories';
import type { Article, ArticlesPageCopy, CategorySlug } from '@/content/types';
import { ARTICLES_PER_PAGE, paginate, searchArticles } from '@/lib/search';

const DEBOUNCE_MS = 250;

function readCategory(raw: string | null): TabSlug {
  const found = categories.find((category) => category.slug === raw);
  return found ? found.slug : 'all';
}

/** Construit une adresse `/articles` en n'incluant que les paramètres utiles. */
function buildUrl(pathname: string, params: { categorie: TabSlug; q: string; page: number }): string {
  const search = new URLSearchParams();
  if (params.categorie !== 'all') search.set('categorie', params.categorie);
  if (params.q.length > 0) search.set('q', params.q);
  if (params.page > 1) search.set('page', String(params.page));
  const query = search.toString();
  return query.length > 0 ? `${pathname}?${query}` : pathname;
}

function resultLine(total: number, categorie: TabSlug, query: string): string {
  const count = `${total} ${total > 1 ? 'articles' : 'article'}`;
  const inCategory = categorie === 'all' ? '' : ` dans ${categoryBySlug[categorie as CategorySlug].title}`;
  const forQuery = query.length > 0 ? ` pour « ${query} »` : '';
  return `${count}${inCategory}${forQuery}`;
}

type ArticleBrowserProps = { articles: Article[]; copy: ArticlesPageCopy };

export function ArticleBrowser({ articles, copy }: ArticleBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categorie = readCategory(searchParams.get('categorie'));
  const urlQuery = searchParams.get('q') ?? '';
  const urlPage = Number.parseInt(searchParams.get('page') ?? '1', 10);

  const [query, setQuery] = useState(urlQuery);

  // La frappe filtre tout de suite ; l'URL suit après un court délai.
  useEffect(() => {
    if (query === urlQuery) return;
    const timer = setTimeout(() => {
      router.replace(buildUrl(pathname, { categorie, q: query, page: 1 }), { scroll: false });
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query, urlQuery, categorie, pathname, router]);

  const byCategory =
    categorie === 'all' ? articles : articles.filter((article) => article.category === categorie);
  const found = searchArticles(byCategory, query);
  const pageState = paginate(found, urlPage, ARTICLES_PER_PAGE);

  return (
    <div>
      <SearchField
        label={copy.searchLabel}
        placeholder={copy.searchPlaceholder}
        value={query}
        onChange={setQuery}
      />

      <div className="mt-8 flex justify-center">
        <CategoryTabs
          activeSlug={categorie}
          allLabel={copy.allLabel}
          buildHref={(slug) => buildUrl(pathname, { categorie: slug, q: query, page: 1 })}
        />
      </div>

      <p aria-live="polite" className="mt-6 text-center font-sans text-[13px] text-ink/60">
        {resultLine(pageState.total, categorie, query)}
      </p>

      {pageState.items.length > 0 ? (
        <>
          <ul aria-label="Articles" className="mx-auto mt-10 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pageState.items.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} variant="grid" />
              </li>
            ))}
          </ul>
          <div className="mt-12">
            <Pagination
              page={pageState.page}
              pageCount={pageState.pageCount}
              buildHref={(page) => buildUrl(pathname, { categorie, q: query, page })}
            />
          </div>
        </>
      ) : (
        <div className="mt-12 text-center">
          <p className="font-display text-xl font-semibold text-ink">{copy.emptyTitle}</p>
          <Link
            href={pathname}
            className="mt-4 inline-flex items-center gap-2 font-sans text-sm font-semibold text-accent-deep underline underline-offset-4 transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {copy.emptyAction}
          </Link>
        </div>
      )}
    </div>
  );
}
