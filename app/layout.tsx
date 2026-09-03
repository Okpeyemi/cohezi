import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cohezi',
  description: 'Work in progress',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
