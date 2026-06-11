import { Link } from 'react-router';
import { Code2 } from 'lucide-react';
import { Logo } from '../branding/Logo';
import { GITHUB_URL } from '../../data/team';

const exploreLinks = [
  { to: '/generator', label: 'Generator' },
  { to: '/classes', label: 'Classes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
  { to: '/terms', label: 'Terms & Privacy' },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-deep/60">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo withWordmark />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              A creative AI lab that turns your photos into sci-fi block figures with a multiclass
              Pix2Pix model — running 100% in your browser. No uploads, no servers.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="rounded text-sm text-ink/80 transition-colors hover:text-primary-strong">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-muted">Project</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded text-ink/80 transition-colors hover:text-primary-strong"
                >
                  <Code2 className="h-4 w-4" aria-hidden="true" />
                  Source on GitHub
                </a>
              </li>
              <li className="text-muted">Built at Universidad Politécnica de Madrid</li>
              <li className="text-muted">MIT License</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-muted/80">
          <p>© 2024–2026 Diego Ruiz Piqueras. Educational, non-commercial research project.</p>
          <p className="mt-1">
            LegofyNet is an independent project, not affiliated with, sponsored, authorized or endorsed by the
            LEGO® Group or Lucasfilm Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
