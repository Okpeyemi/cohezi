import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contactEmail, host, legalPages, legalNotice, privacyPolicy } from '@/content/legal';
import { site } from '@/content/site';

describe('legal pages content', () => {
  it('publishes both pages with unique, URL-safe slugs', () => {
    expect(legalPages).toHaveLength(2);
    for (const page of legalPages) {
      expect(page.slug, page.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(page.title.length, page.slug).toBeGreaterThan(0);
      expect(page.intro.length, page.slug).toBeGreaterThan(40);
      expect(page.updatedAt, page.slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(page.sections.length, page.slug).toBeGreaterThan(2);
    }
    expect(new Set(legalPages.map((p) => p.slug)).size).toBe(2);
  });

  it('never leaves a section empty', () => {
    for (const page of legalPages) {
      for (const section of page.sections) {
        expect(section.heading.length, `${page.slug} / ${section.heading}`).toBeGreaterThan(0);
        expect(section.blocks.length, `${page.slug} / ${section.heading}`).toBeGreaterThan(0);
        for (const block of section.blocks) {
          if (block.type === 'paragraph') expect(block.text.length).toBeGreaterThan(20);
          else expect(block.items.length).toBeGreaterThan(1);
        }
      }
    }
  });

  it('names the host, as the non-professional publisher regime requires', () => {
    const text = JSON.stringify(legalNotice);
    expect(text).toContain(host.name);
    expect(text).toContain(host.address);
    expect(text).toContain('6-III-2');
  });

  it('covers what the GDPR requires of a privacy policy', () => {
    const text = JSON.stringify(privacyPolicy).toLowerCase();
    for (const topic of ['consentement', 'conservation', 'effacer', 'cnil', 'sous-traitant']) {
      expect(text, topic).toContain(topic);
    }
  });

  it('gives one contact address, used by both pages', () => {
    expect(contactEmail).toMatch(/^[^@\s]+@cohezi\.io$/);
    expect(JSON.stringify(legalNotice)).toContain(contactEmail);
    expect(JSON.stringify(privacyPolicy)).toContain(contactEmail);
  });

  it('links both pages from the footer bottom bar', () => {
    const hrefs = site.footer.legal.map((link) => link.href);
    for (const page of legalPages) expect(hrefs, page.slug).toContain(`/${page.slug}`);
    // Dérivés des pages : un titre modifié se propage sans édition manuelle.
    expect(site.footer.legal.map((l) => l.label)).toEqual(legalPages.map((p) => p.title));
  });
});

describe('privacy policy matches what the site actually does', () => {
  // Ce test lit le code, pas seulement le contenu : c'est exactement la dérive qui s'est
  // produite en ajoutant la mesure d'audience à un site dont la politique jurait le contraire.
  const layout = readFileSync(resolve(process.cwd(), 'app/layout.tsx'), 'utf8');
  const text = JSON.stringify(privacyPolicy).toLowerCase();

  it('declares the audience measurement while the site loads it', () => {
    expect(layout).toContain('SiteAnalytics');

    // On exige une section dédiée, pas des mots épars : « Vercel » figure de toute façon
    // dans la section hébergeur, ce qui rendrait un test par mots-clés complaisant.
    const section = privacyPolicy.sections.find((s) => s.heading === 'La mesure d’audience');
    expect(section, 'section « La mesure d’audience »').toBeDefined();

    const body = JSON.stringify(section).toLowerCase();
    for (const topic of ['vercel', 'intérêt légitime', 'vingt-quatre heures', 'cookie']) {
      expect(body, topic).toContain(topic);
    }
  });

  it('never again claims the site records nothing', () => {
    expect(text).not.toContain('n’enregistre rien');
  });

  it('explains why no consent banner is shown', () => {
    expect(text).toContain('bandeau');
    expect(text).toContain('aucun cookie');
  });

  it('says the search terms are stripped, as the code does', () => {
    const redact = readFileSync(resolve(process.cwd(), 'lib/analytics-redact.ts'), 'utf8');
    expect(redact).toContain("SEARCH_PARAM = 'q'");
    const section = privacyPolicy.sections.find((s) => s.heading === 'La mesure d’audience')!;
    expect(JSON.stringify(section)).toContain('recherche du site');
  });
});
