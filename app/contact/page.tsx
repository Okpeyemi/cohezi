import type { Metadata } from 'next';
import { StaticPage } from '@/components/sections/static-page';
import { contactPage } from '@/content/pages';

export const metadata: Metadata = {
  title: `${contactPage.title} — Cohezi`,
  description: contactPage.intro,
};

export default function Page() {
  return <StaticPage page={contactPage} />;
}
