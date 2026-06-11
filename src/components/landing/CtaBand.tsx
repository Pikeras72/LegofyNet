import { Sparkles } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { GlowOrb } from '../ui/GlowOrb';

export function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-surface via-deep to-void px-6 py-16 text-center sm:px-12">
        <GlowOrb color="cyan" className="-top-20 left-1/4 h-64 w-64" />
        <GlowOrb color="violet" className="-right-16 -bottom-24 h-72 w-72" delay="-4s" />
        <div className="relative">
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Ready to <span className="text-gradient">legofy yourself</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Free, open source, and private by design. Your photos never leave your browser.
          </p>
          <ButtonLink to="/generator" size="lg" className="mt-8">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            Start generating
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
