import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BrandLogo } from '@/components/ui/brand-logo';
import { LogoWordmark } from '@/components/ui/logo-wordmark';

describe('BrandLogo', () => {
  it('shows the brand name and adapts to the tone', () => {
    render(<BrandLogo name="The Rundown" tone="dark" />);
    expect(screen.getByText('The Rundown').className).toContain('text-white');
  });
});

describe('LogoWordmark', () => {
  it('renders the company name as text', () => {
    render(<LogoWordmark name="Google" />);
    expect(screen.getByText('Google')).toBeInTheDocument();
  });
});
