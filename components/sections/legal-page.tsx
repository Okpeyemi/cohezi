import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { site } from '@/content/site';
import type { LegalPage as LegalPageContent } from '@/content/types';
import { formatDateFr } from '@/lib/format-date';

/** Page légale : bandeau sombre, puis le texte sur une feuille claire. */
export function LegalPage({ page }: { page: LegalPageContent }) {
  return (
    <>
      <SiteHeader
        name={site.name}
        nav={site.nav}
        cta={site.headerCta}
        searchHref={site.searchHref}
        searchLabel={site.searchLabel}
      />
      <main className="flex-1">
        <div className="page-dark bg-ink">
          <div className="mx-auto max-w-[1440px] px-5 py-16 text-center text-paper md:py-20 lg:px-24">
            <h1 className="font-display text-4xl font-bold uppercase tracking-[-0.01em] md:text-5xl">{page.title}</h1>
            <p className="mx-auto mt-4 max-w-[560px] text-lg text-paper/80">{page.intro}</p>
            <p className="mt-6 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/50">
              Mise à jour le {formatDateFr(page.updatedAt)}
            </p>
          </div>
          <div className="px-2 md:px-5">
            <div className="mx-auto rounded-sheet bg-paper px-5 py-16 md:py-20">
              <div className="mx-auto max-w-[680px]">
                {page.sections.map((section, index) => (
                  <section key={section.heading} className={index === 0 ? '' : 'mt-12'}>
                    <h2 className="font-display text-2xl font-bold text-ink">{section.heading}</h2>
                    {section.blocks.map((block, blockIndex) =>
                      block.type === 'paragraph' ? (
                        <p
                          key={blockIndex}
                          className="mt-4 text-lg leading-8 text-ink/85 text-justify hyphens-auto"
                        >
                          {block.text}
                        </p>
                      ) : (
                        <ul key={blockIndex} className="mt-4 space-y-2">
                          {block.items.map((item) => (
                            <li key={item} className="flex gap-3 text-lg leading-8 text-ink/85">
                              <span aria-hidden className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
