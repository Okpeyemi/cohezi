import type { Metadata } from 'next';
import { inter, spaceGrotesk } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cohezi — L’IA change le monde. Comprenez ce qui compte.',
  description:
    'Actualités, business, société et analyses pour comprendre l’intelligence artificielle sans le bruit.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">{children}</body>
    </html>
  );
}
