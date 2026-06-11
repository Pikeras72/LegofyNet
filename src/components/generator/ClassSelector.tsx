import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CHARACTER_CLASSES, CATEGORY_LABELS } from '../../data/classes';
import type { ClassCategory } from '../../types';
import { asset } from '../../lib/assets';
import { cn } from '../../lib/cn';

interface ClassSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ALL_CATEGORIES = Object.keys(CATEGORY_LABELS) as ClassCategory[];

export function ClassSelector({ selectedId, onSelect }: ClassSelectorProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ClassCategory | 'all'>('all');

  const visible = useMemo(
    () =>
      CHARACTER_CLASSES.filter(
        (c) =>
          (category === 'all' || c.category === category) &&
          c.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query, category],
  );

  return (
    <div>
      <div className="relative">
        <Search
          className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search classes…"
          aria-label="Search classes"
          className="w-full rounded-xl border border-line bg-white/[0.03] py-2.5 pr-4 pl-10 text-sm placeholder:text-muted/70 focus:border-primary/50"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
        {(['all', ...ALL_CATEGORIES] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            aria-pressed={category === cat}
            onClick={() => setCategory(cat)}
            className={cn(
              'cursor-pointer rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors',
              category === cat
                ? 'border-primary/50 bg-primary/15 text-primary-strong'
                : 'border-line text-muted hover:border-primary/30 hover:text-ink',
            )}
          >
            {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div
        role="listbox"
        aria-label="Character class"
        className="mt-4 grid max-h-80 grid-cols-3 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-4"
      >
        {visible.map((c) => {
          const selected = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              role="option"
              aria-selected={selected}
              onClick={() => onSelect(c.id)}
              className={cn(
                'group cursor-pointer rounded-xl border p-1.5 text-left transition-all duration-200',
                selected
                  ? 'border-primary bg-primary/10 glow-primary'
                  : 'border-line bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.05]',
              )}
            >
              <img
                src={asset(c.image)}
                alt=""
                loading="lazy"
                className="aspect-square w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span
                className={cn(
                  'mt-1.5 block truncate px-0.5 text-xs font-medium',
                  selected ? 'text-primary-strong' : 'text-ink/80',
                )}
              >
                {c.name}
              </span>
            </button>
          );
        })}
        {visible.length === 0 && (
          <p className="col-span-full py-8 text-center text-sm text-muted">No classes match your search.</p>
        )}
      </div>
    </div>
  );
}
