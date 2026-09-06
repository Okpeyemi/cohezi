import { describe, expect, it } from 'vitest';
import { redactSearchTerms } from '@/lib/analytics-redact';

const pageview = (url: string) => ({ type: 'pageview' as const, url });

describe('redactSearchTerms', () => {
  it('strips the search term, which is the reader’s own words', () => {
    expect(redactSearchTerms(pageview('https://www.cohezi.io/articles?q=burn-out'))?.url).toBe(
      'https://www.cohezi.io/articles',
    );
  });

  it('keeps the parameters that carry no personal meaning', () => {
    expect(
      redactSearchTerms(pageview('https://www.cohezi.io/articles?categorie=business&q=nvidia&page=2'))?.url,
    ).toBe('https://www.cohezi.io/articles?categorie=business&page=2');
  });

  it('leaves an url without a search term untouched', () => {
    const url = 'https://www.cohezi.io/articles?categorie=analyse';
    expect(redactSearchTerms(pageview(url))?.url).toBe(url);
  });

  it('leaves an url without any parameter untouched', () => {
    const url = 'https://www.cohezi.io/business/nvidia-rachete-hugging-face-pour-12-9-milliards';
    expect(redactSearchTerms(pageview(url))?.url).toBe(url);
  });

  it('preserves the event type', () => {
    expect(redactSearchTerms(pageview('https://www.cohezi.io/?q=x'))?.type).toBe('pageview');
    expect(redactSearchTerms({ type: 'event', url: 'https://www.cohezi.io/?q=x' })?.type).toBe('event');
  });

  it('strips an empty search term too, rather than leaving a bare marker', () => {
    expect(redactSearchTerms(pageview('https://www.cohezi.io/articles?q='))?.url).toBe(
      'https://www.cohezi.io/articles',
    );
  });

  it('never throws on a url it cannot parse, and drops the event instead', () => {
    expect(redactSearchTerms(pageview('pas une url'))).toBeNull();
  });
});
