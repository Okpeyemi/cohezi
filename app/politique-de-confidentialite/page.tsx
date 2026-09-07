import type { Metadata } from 'next';
import { StaticPage } from '@/components/sections/static-page';
import { privacyPolicy } from '@/content/legal';

export const metadata: Metadata = {
  title: `${privacyPolicy.title} — Cohezi`,
  description: privacyPolicy.intro,
};

export default function Page() {
  return <StaticPage page={privacyPolicy} />;
}
