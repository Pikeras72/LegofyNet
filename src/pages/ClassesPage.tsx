import { useState } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { CHARACTER_CLASSES } from '../data/classes';
import { ClassCard } from '../components/classes/ClassCard';
import { CategoryFilter } from '../components/classes/CategoryFilter';
import type { CategoryValue } from '../components/classes/CategoryFilter';
import { GridBackground } from '../components/ui/GridBackground';

export function ClassesPage() {
  usePageTitle('Classes');
  const [category, setCategory] = useState<CategoryValue>('all');
  const visible =
    category === 'all' ? CHARACTER_CLASSES : CHARACTER_CLASSES.filter((c) => c.category === category);

  return (
    <div className="relative overflow-hidden">
      <GridBackground />
      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6">
        <header className="max-w-2xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">
            Class registry
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">22 supported classes</h1>
          <p className="mt-3 text-muted">
            Every class the model was trained on. Each one conditions the generator with a different
            one-hot vector, steering colors, armor and silhouettes.
          </p>
        </header>

        <div className="mt-8">
          <CategoryFilter value={category} onChange={setCategory} />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((c) => (
            <ClassCard key={c.id} characterClass={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
