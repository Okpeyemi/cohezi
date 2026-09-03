'use client';

import { ToolCard } from '@/components/cards/tool-card';
import { ButtonLink } from '@/components/ui/button';
import { FilterableGrid } from '@/components/ui/filterable-grid';
import { Icon } from '@/components/ui/icon';
import { SectionHeading } from '@/components/ui/section-heading';
import type { Category, SectionCopy, Tool } from '@/content/types';

type TrendingToolsProps = { copy: SectionCopy; tools: Tool[]; categories: Category[] };

export function TrendingTools({ copy, tools, categories }: TrendingToolsProps) {
  return (
    <section aria-labelledby="trending-tools-title" className="px-5 py-16 md:py-20">
      <SectionHeading id="trending-tools-title" title={copy.title} subtitle={copy.subtitle} />
      <FilterableGrid
        items={tools}
        categories={categories}
        getCategories={(tool) => tool.categories}
        variant="chips"
        filterLabel="Filter tools by category"
        renderItems={(visible) => (
          <ul className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4 [&>li:nth-child(n+4)]:hidden md:[&>li:nth-child(n+4)]:block">
            {visible.map((tool) => (
              <li key={tool.slug}>
                <ToolCard tool={tool} />
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
