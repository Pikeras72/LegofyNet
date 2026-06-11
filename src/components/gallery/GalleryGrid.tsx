import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { Sparkles, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/gallery';
import { asset } from '../../lib/assets';
import { Lightbox } from './Lightbox';
import type { LightboxContent } from './Lightbox';

export function GalleryGrid() {
  const [active, setActive] = useState<LightboxContent | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {GALLERY_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
            className="group glass relative overflow-hidden rounded-2xl"
          >
            <button
              type="button"
              onClick={() =>
                setActive({ src: asset(item.image), alt: item.caption, title: item.title, caption: item.caption })
              }
              className="block w-full cursor-zoom-in"
              aria-label={`Enlarge: ${item.title}`}
            >
              <img
                src={asset(item.image)}
                alt={item.caption}
                loading="lazy"
                className="w-full transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute top-3 right-3 rounded-lg bg-void/60 p-2 text-ink/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <div className="flex items-center justify-between gap-2 p-4">
              <div className="min-w-0">
                <h3 className="truncate font-display font-semibold">{item.title}</h3>
                <p className="mt-0.5 truncate text-xs text-muted">{item.caption}</p>
              </div>
              {item.classId && (
                <Link
                  to={`/generator?class=${item.classId}`}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-primary-strong transition-colors hover:bg-primary/20"
                >
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  Try it
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      <Lightbox content={active} onClose={() => setActive(null)} />
    </>
  );
}
