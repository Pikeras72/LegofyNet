import { useEffect } from 'react';
import { NavLink } from 'react-router';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { Logo } from '../branding/Logo';
import { ButtonLink } from '../ui/Button';
import { NAV_ITEMS } from './Navbar';
import { cn } from '../../lib/cn';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-void/90 backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="flex h-16 items-center justify-between px-4">
            <Logo withWordmark />
            <button
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-ink"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <motion.nav
            aria-label="Mobile navigation"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.25 }}
            className="flex flex-col gap-1 px-4 pt-6"
          >
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-4 py-3.5 font-display text-2xl font-semibold transition-colors',
                    isActive ? 'text-primary-strong' : 'text-ink hover:bg-white/5',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-6 px-4" onClick={onClose}>
              <ButtonLink to="/generator" size="lg" className="w-full">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                Launch Generator
              </ButtonLink>
            </div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
