import { CATEGORY_LABELS, CHARACTER_CLASSES } from '../../data/classes';
import type { ClassCategory } from '../../types';
import { cn } from '../../lib/cn';

export type CategoryValue = ClassCategory | 'all';

interface CategoryFilterProps {
  value: CategoryValue;
  onChange: (value: CategoryValue) => void;
}

const categories = Object.keys(CATEGORY_LABELS) as ClassCategory[];

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  const countFor = (cat: CategoryValue) =>
    cat === 'all' ? CHARACTER_CLASSES.length : CHARACTER_CLASSES.filter((c) => c.category === cat).length;

  return (
    <div role="group" aria-label="Filter classes by category" className="flex flex-wrap gap-2">
      {(['all', ...categories] as const).map((cat) => (
        <button
          key={cat}
          type="button"
          aria-pressed={value === cat}
          onClick={() => onChange(cat)}
          className={cn(
            'cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-all duration-200',
            value === cat
              ? 'border-primary/60 bg-primary/15 text-primary-strong glow-primary'
              : 'border-line text-muted hover:border-primary/30 hover:text-ink',
          )}
        >
          {cat === 'all' ? 'All' : CATEGORY_LABELS[cat]}
          <span className="ml-1.5 font-mono text-xs opacity-60">{countFor(cat)}</span>
        </button>
      ))}
    </div>
  );
}
