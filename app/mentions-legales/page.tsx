import type { Metadata } from 'next';
import { StaticPage } from '@/components/sections/static-page';
import { legalNotice } from '@/content/legal';

export const metadata: Metadata = {
  title: `${legalNotice.title} — Cohezi`,
  description: legalNotice.intro,
};

export default function Page() {
  return <StaticPage page={legalNotice} />;
}
