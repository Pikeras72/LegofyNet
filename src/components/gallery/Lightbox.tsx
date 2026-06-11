import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export interface LightboxContent {
  src: string;
  alt: string;
  title: string;
  caption?: string;
}

interface LightboxProps {
  content: LightboxContent | null;
  onClose: () => void;
}

export function Lightbox({ content, onClose }: LightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!content) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [content, onClose]);

  return (
    <AnimatePresence>
      {content && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-void/90 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={content.title}
          onClick={onClose}
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="absolute top-4 right-4 cursor-pointer rounded-lg p-2 text-muted transition-colors hover:bg-white/5 hover:text-ink"
          >
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
          <motion.figure
            initial={{ scale: 0.94, y: 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="max-h-full max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={content.src}
              alt={content.alt}
              className="max-h-[78vh] w-auto rounded-2xl border border-line bg-deep"
            />
            <figcaption className="mt-3 text-center">
              <p className="font-display font-semibold">{content.title}</p>
              {content.caption && <p className="mt-1 text-sm text-muted">{content.caption}</p>}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
