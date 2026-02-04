import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/sonner";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cohezi | Moteur d'Évaluation Cognitive",
  description: "Disséquez, stress-testez et visualisez le raisonnement humain derrière chaque décision.",
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${figtree.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body
        className={`font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200 pt-16`}
      >
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <Header />
            {children}
            <Toaster />
            <Analytics />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
