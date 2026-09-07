import type { Metadata } from 'next';
import { StaticPage } from '@/components/sections/static-page';
import { aboutPage } from '@/content/pages';

export const metadata: Metadata = {
  title: `${aboutPage.title} — Cohezi`,
  description: aboutPage.intro,
};

export default function Page() {
  return <StaticPage page={aboutPage} />;
}
