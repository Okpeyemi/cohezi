import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Button, ButtonLink, buttonClasses } from '@/components/ui/button';

describe('Button', () => {
  it('defaults to type="button" and the ink variant', () => {
    render(<Button>Subscribe</Button>);
    const button = screen.getByRole('button', { name: 'Subscribe' });
    expect(button).toHaveAttribute('type', 'button');
    expect(button.className).toContain('bg-ink');
  });

  it('applies variant and size classes and forwards disabled', () => {
    render(
      <Button variant="accent" size="lg" disabled>
        Je m’inscris
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Je m’inscris' });
    expect(button.className).toContain('bg-accent');
    expect(button.className).toContain('h-12');
    expect(button).toBeDisabled();
  });

  it('offers a paper variant for light buttons on dark backgrounds', () => {
    render(<Button variant="paper">S’inscrire</Button>);
    expect(screen.getByRole('button', { name: 'S’inscrire' }).className).toContain('bg-paper');
  });
});

describe('ButtonLink', () => {
  it('renders an anchor with the href and outline styles', () => {
    render(
      <ButtonLink href="/articles" variant="outline" size="sm">
        View all
      </ButtonLink>,
    );
    const link = screen.getByRole('link', { name: 'View all' });
    expect(link).toHaveAttribute('href', '/articles');
    expect(link.className).toContain('border-line');
    expect(link.className).toContain('h-[42px]');
  });
});

describe('buttonClasses', () => {
  it('lets className override conflicting utilities', () => {
    expect(buttonClasses({ size: 'md', className: 'h-9' })).toContain('h-9');
    expect(buttonClasses({ size: 'md', className: 'h-9' })).not.toContain('h-11');
  });
});
