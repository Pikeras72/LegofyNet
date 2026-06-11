import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu, Sparkles } from 'lucide-react';
import { Logo } from '../branding/Logo';
import { ButtonLink } from '../ui/Button';
import { MobileMenu } from './MobileMenu';
import { cn } from '../../lib/cn';

export const NAV_ITEMS = [
  { to: '/generator', label: 'Generator' },
  { to: '/classes', label: 'Classes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass shadow-[0_4px_30px_rgb(0_0_0/0.35)]' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="LegofyNet home" className="rounded-lg">
          <Logo withWordmark />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  isActive ? 'text-primary-strong' : 'text-muted hover:bg-white/5 hover:text-ink',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <ButtonLink to="/generator" size="sm" className="ml-3">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Generate
          </ButtonLink>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-ink md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
