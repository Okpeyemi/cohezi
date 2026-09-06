import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/legal-page';
import { privacyPolicy } from '@/content/legal';

export const metadata: Metadata = {
  title: `${privacyPolicy.title} — Cohezi`,
  description: privacyPolicy.intro,
};

export default function Page() {
  return <LegalPage page={privacyPolicy} />;
}
