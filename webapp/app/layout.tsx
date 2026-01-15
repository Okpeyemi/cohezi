import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";

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

import { Header } from "@/components/layout/Header";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${figtree.variable} ${geistMono.variable}`}>
      <body
        className={`font-sans bg-zinc-950 text-zinc-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-200 pt-16`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
