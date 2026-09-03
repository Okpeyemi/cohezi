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
      <Button variant="gradient" size="lg" disabled>
        Join
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Join' });
    expect(button.className).toContain('bg-brand-gradient');
    expect(button.className).toContain('h-12');
    expect(button).toBeDisabled();
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
