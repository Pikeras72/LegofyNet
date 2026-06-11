import { Link, useParams } from 'react-router';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { CHARACTER_CLASSES, CATEGORY_LABELS, NUM_CLASSES, getClassById } from '../data/classes';
import { asset } from '../lib/assets';
import { Badge } from '../components/ui/Badge';
import { ButtonLink } from '../components/ui/Button';
import { GridBackground } from '../components/ui/GridBackground';
import { NotFoundPage } from './NotFoundPage';
import { cn } from '../lib/cn';

/** Renders the literal one-hot vector the model receives for this class. */
function OneHotStrip({ hotIndex }: { hotIndex: number }) {
  return (
    <div>
      <div className="flex flex-wrap gap-1" aria-hidden="true">
        {Array.from({ length: NUM_CLASSES }, (_, i) => (
          <span
            key={i}
            className={cn(
              'h-3.5 w-3.5 rounded-[3px]',
              i === hotIndex ? 'bg-primary shadow-[0_0_10px_rgb(34_211_238/0.8)]' : 'bg-white/8',
            )}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[11px] tracking-wider text-muted">
        one-hot(22) · index {hotIndex} active
      </p>
    </div>
  );
}

export function ClassDetailPage() {
  const { id } = useParams();
  const characterClass = getClassById(id);
  usePageTitle(characterClass?.name ?? 'Class not found');

  if (!characterClass) return <NotFoundPage />;

  const prev =
    CHARACTER_CLASSES[(characterClass.modelIndex - 1 + NUM_CLASSES) % NUM_CLASSES];
  const next = CHARACTER_CLASSES[(characterClass.modelIndex + 1) % NUM_CLASSES];

  return (
    <div className="relative overflow-hidden">
      <GridBackground />
      <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6">
        <Link
          to="/classes"
          className="inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-primary-strong"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All classes
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass overflow-hidden rounded-3xl p-3">
            <img
              src={asset(characterClass.image)}
              alt={`${characterClass.name} class artwork`}
              className="w-full rounded-2xl"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="cyan">{CATEGORY_LABELS[characterClass.category]}</Badge>
              <Badge tone="violet">Class vector #{characterClass.modelIndex}</Badge>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {characterClass.name}
            </h1>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">{characterClass.description}</p>

            <div className="glass mt-8 rounded-2xl p-5">
              <h2 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted">
                Model conditioning
              </h2>
              <p className="mt-2 text-sm text-muted">
                Selecting this class feeds the generator the exact vector below alongside your image.
              </p>
              <div className="mt-4">
                <OneHotStrip hotIndex={characterClass.modelIndex} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to={`/generator?class=${characterClass.id}`} size="lg">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                Generate as {characterClass.name}
              </ButtonLink>
            </div>
          </div>
        </div>

        <nav aria-label="Class navigation" className="mt-14 flex justify-between gap-4 border-t border-line pt-6">
          <Link
            to={`/classes/${prev.id}`}
            className="group inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-primary-strong"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            {prev.name}
          </Link>
          <Link
            to={`/classes/${next.id}`}
            className="group inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-primary-strong"
          >
            {next.name}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
