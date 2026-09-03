import type { Metadata } from 'next';
import { satoshi } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Rundown AI - Daily AI News & Insights in 5 Minutes a Day',
  description:
    'Get the latest AI news, understand why it matters, and learn how to apply it in your work.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${satoshi.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
