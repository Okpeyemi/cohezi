'use client';

import { GuideCard } from '@/components/cards/guide-card';
import { ButtonLink } from '@/components/ui/button';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Category, Guide, SectionCopy } from '@/content/types';

type GuidesProps = { copy: SectionCopy; guides: Guide[]; categories: Category[] };

export function Guides({ copy, guides, categories }: GuidesProps) {
  return (
    <section aria-labelledby="guides-title" className="px-5 py-16 md:py-20">
      <SectionHeading id="guides-title" title={copy.title} subtitle={copy.subtitle} className="max-w-[680px]" />
      <FilterableGrid
        items={guides}
        categories={categories}
        getCategories={(guide) => guide.categories}
        variant="chips"
        filterLabel="Filter guides by role"
        renderItems={(visible) => (
          <ul className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4 [&>li:nth-child(n+4)]:hidden md:[&>li:nth-child(n+4)]:block">
            {visible.map((guide) => (
              <li key={guide.slug}>
                <GuideCard guide={guide} />
              </li>
            ))}
          </ul>
        )}
      />
      <div className="mt-12 flex justify-center">
        <ButtonLink href={copy.viewAllHref} variant="outline" size="sm">
          {copy.viewAllLabel}
          <Icon name="arrow-right" size={16} />
        </ButtonLink>
      </div>
    </section>
  );
}
