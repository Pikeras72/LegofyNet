import { Code2 } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import { GridBackground } from '../components/ui/GridBackground';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ArchitectureSection } from '../components/about/ArchitectureSection';
import { TeamCard } from '../components/about/TeamCard';
import { FaqSection } from '../components/about/FaqSection';
import { TEAM, GITHUB_URL } from '../data/team';

export function AboutPage() {
  usePageTitle('About');
  return (
    <div className="relative overflow-hidden">
      <GridBackground />
      <div className="relative mx-auto max-w-6xl space-y-24 px-4 pt-28 pb-24 sm:px-6">
        <header className="max-w-3xl">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-primary">
            The project
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            About LegofyNet
          </h1>
          <div className="mt-6 space-y-4 leading-relaxed text-muted">
            <p>
              LegofyNet began as a collaborative university project on Generative Methods at{' '}
              <strong className="text-ink">Universidad Politécnica de Madrid</strong>, and evolved into a
              personal endeavor by <strong className="text-ink">Diego Ruiz Piqueras</strong> to make a
              custom <strong className="text-ink">multiclass Pix2Pix model</strong> accessible to anyone,
              anywhere — no installs, no servers, no sign-ups.
            </p>
            <p>
              The model transforms real photos into figures inspired by the look of sci-fi building-block
              characters. Beyond the playful output, the project is a testament to what client-side AI can
              do today: the entire 125 MB network runs in your browser through TensorFlow.js, keeping your
              images fully private.
            </p>
            <p>
              Everything — model, web app and documentation — is open source under the MIT license, as a
              small contribution to the democratization of generative AI.
            </p>
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary-strong"
          >
            <Code2 className="h-4 w-4" aria-hidden="true" />
            View the repository
          </a>
        </header>

        <ArchitectureSection />

        <section aria-labelledby="team-heading">
          <SectionHeading align="left" eyebrow="Crew" title="Meet the team" />
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {TEAM.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        <FaqSection />
      </div>
    </div>
  );
}
