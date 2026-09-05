import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { NewsletterCta } from '@/components/sections/newsletter-cta';
import { site } from '@/content/site';

describe('NewsletterCta', () => {
  it('renders the two-line heading, the description and the green subscribe button', () => {
    render(<NewsletterCta copy={site.newsletter} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Moins de bruit. Plus de contexte.');
    expect(screen.getByText(site.newsletter.description)).toBeInTheDocument();
    const button = screen.getByRole('button', { name: /Je m’inscris/ });
    expect(button.className).toContain('bg-accent');
    expect(screen.getByText(site.newsletter.microCopy)).toBeInTheDocument();
  });

  it('is the anchor target of the header CTA', () => {
    const { container } = render(<NewsletterCta copy={site.newsletter} />);
    expect(container.querySelector('section#newsletter')).not.toBeNull();
  });
});
