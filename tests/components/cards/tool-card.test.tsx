import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ToolCard } from '@/components/cards/tool-card';
import { tools } from '@/content/tools';

const tool = tools[5]!; // Openclaw 2.0, badge 'agents'

describe('ToolCard', () => {
  it('links to the tool, shows name, description and the badge icon', () => {
    const { container } = render(<ToolCard tool={tool} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', `/tools/${tool.slug}`);
    expect(screen.getByRole('heading', { level: 3, name: tool.name })).toBeInTheDocument();
    expect(screen.getByText(tool.description)).toBeInTheDocument();
    expect(container.querySelector('svg[data-icon="agents"]')).not.toBeNull();
  });
});
