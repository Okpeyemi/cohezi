import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchField } from '@/components/ui/search-field';

describe('SearchField', () => {
  it('renders a labelled search input holding the given value', () => {
    render(<SearchField label="Rechercher un article" placeholder="Titre, sujet…" value="openai" onChange={() => {}} />);
    const input = screen.getByLabelText('Rechercher un article');
    expect(input).toHaveAttribute('type', 'search');
    expect(input).toHaveAttribute('placeholder', 'Titre, sujet…');
    expect(input).toHaveValue('openai');
  });

  it('reports every keystroke', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<SearchField label="Rechercher un article" placeholder="Titre" value="" onChange={onChange} />);
    await user.type(screen.getByLabelText('Rechercher un article'), 'ai');
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith('i');
  });

  it('offers a clear button only when the field has content', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <SearchField label="Rechercher un article" placeholder="Titre" value="" onChange={onChange} />,
    );
    expect(screen.queryByRole('button', { name: 'Effacer la recherche' })).toBeNull();

    rerender(<SearchField label="Rechercher un article" placeholder="Titre" value="openai" onChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Effacer la recherche' }));
    expect(onChange).toHaveBeenCalledWith('');
  });
});
