'use client';

import { useId } from 'react';
import { Icon } from './icon';

type SearchFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  clearLabel?: string;
};

/** Champ de recherche contrôlé : le parent détient la valeur et décide quoi en faire. */
export function SearchField({ label, placeholder, value, onChange, clearLabel = 'Effacer la recherche' }: SearchFieldProps) {
  const inputId = useId();

  return (
    <div className="mx-auto flex w-full max-w-[520px] items-center gap-2 rounded-xl border border-line bg-paper px-3">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <Icon name="search" size={18} className="shrink-0 text-muted" />
      <input
        id={inputId}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 min-w-0 flex-1 bg-transparent font-sans text-base text-ink placeholder:text-muted focus:outline-none"
      />
      {value.length > 0 ? (
        <button
          type="button"
          aria-label={clearLabel}
          onClick={() => onChange('')}
          className="shrink-0 rounded-md p-1 text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Icon name="close" size={16} />
        </button>
      ) : null}
    </div>
  );
}
