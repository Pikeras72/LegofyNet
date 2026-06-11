import { Home, Sparkles } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { ButtonLink } from '../components/ui/Button';
import { GridBackground } from '../components/ui/GridBackground';

export function NotFoundPage() {
  usePageTitle('Page not found');
  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <GridBackground />
      <div className="relative px-4 py-28 text-center">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-6xl font-bold tracking-tight sm:text-7xl">
          <span className="text-gradient">Block</span> not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-muted">
          This piece seems to be missing from the build. Let's get you back to a stable structure.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <ButtonLink to="/">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back home
          </ButtonLink>
          <ButtonLink to="/generator" variant="secondary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Open the generator
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
