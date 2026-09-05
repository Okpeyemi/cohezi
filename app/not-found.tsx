import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button';
import { site } from '@/content/site';

export default function NotFound() {
  return (
    <>
      <SiteHeader name={site.name} nav={site.nav} cta={site.headerCta} />
      <main className="flex flex-1 flex-col items-center justify-center bg-ink px-5 py-32 text-center text-paper">
        <h1 className="text-4xl font-bold tracking-[-0.025em] md:text-6xl">Page not found</h1>
        <ButtonLink href="/" variant="paper" size="sm" className="mt-8">
          Back to home
        </ButtonLink>
      </main>
      <SiteFooter site={site} />
    </>
  );
}
