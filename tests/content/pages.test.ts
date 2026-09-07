import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { aboutPage, contactPage, staticPages } from '@/content/pages';
import { contactEmail } from '@/content/legal';

describe('about and contact pages', () => {
  it('gives both pages a slug matching their route', () => {
    expect(staticPages.map((page) => page.slug)).toEqual(['a-propos', 'contact']);
    for (const page of staticPages) {
      expect(page.title.length, page.slug).toBeGreaterThan(0);
      expect(page.intro.length, page.slug).toBeGreaterThan(40);
      expect(page.sections.length, page.slug).toBeGreaterThan(2);
    }
  });

  it('never leaves a section empty', () => {
    for (const page of staticPages) {
      for (const section of page.sections) {
        expect(section.blocks.length, `${page.slug} / ${section.heading}`).toBeGreaterThan(0);
        for (const block of section.blocks) {
          if (block.type === 'paragraph') expect(block.text.length).toBeGreaterThan(40);
          else expect(block.items.length).toBeGreaterThan(1);
        }
      }
    }
  });

  it('carries no update date: these pages engage nothing legally', () => {
    for (const page of staticPages) expect(page.updatedAt, page.slug).toBeUndefined();
  });

  it('points the contact call to action at the published address', () => {
    expect(contactPage.cta?.href).toBe(`mailto:${contactEmail}`);
    expect(JSON.stringify(contactPage)).toContain(contactEmail);
  });

  it('sends the about page back to the articles', () => {
    expect(aboutPage.cta?.href).toBe('/articles');
  });

  it('states the editorial method the code actually enforces', () => {
    const text = JSON.stringify(aboutPage).toLowerCase();
    for (const claim of ['aucune phrase', 'sources', 'citations', 'projection']) {
      expect(text, claim).toContain(claim);
    }
  });

  it('keeps the advertising claim in the present tense, never as a promise', () => {
    const text = JSON.stringify(staticPages);
    expect(text).toContain('à ce jour');
    // Une promesse d'avenir engagerait au-delà de ce qu'on peut tenir.
    expect(text).not.toContain('ne diffusera jamais');
  });
});

describe('the coming soon placeholder is gone', () => {
  it('leaves no page rendering it, and no trace in the codebase', () => {
    for (const route of ['app/a-propos/page.tsx', 'app/contact/page.tsx']) {
      const source = readFileSync(resolve(process.cwd(), route), 'utf8');
      expect(source, route).toContain('StaticPage');
      expect(source, route).not.toContain('ComingSoon');
    }
    const site = readFileSync(resolve(process.cwd(), 'content/site.ts'), 'utf8');
    expect(site).not.toContain('comingSoon');
  });
});
