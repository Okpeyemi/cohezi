import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { legalNotice } from '@/content/legal';

export const metadata: Metadata = {
  title: `${legalNotice.title} — Cohezi`,
  description: legalNotice.intro,
};

export default function Page() {
  return <LegalPage page={legalNotice} />;
}
