import type { Metadata } from 'next';
import { ComingSoon } from '@/components/sections/coming-soon';
import { site } from '@/content/site';

const page = site.comingSoon.find((item) => item.slug === 'a-propos')!;

export const metadata: Metadata = { title: `${page.label} — Bientôt disponible` };

export default function Page() {
  return <ComingSoon label={page.label} />;
}
