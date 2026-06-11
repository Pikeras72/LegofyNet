import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { CATEGORY_LABELS } from '../../data/classes';
import { asset } from '../../lib/assets';
import type { CharacterClass } from '../../types';

export function ClassCard({ characterClass: c }: { characterClass: CharacterClass }) {
  return (
    <Link
      to={`/classes/${c.id}`}
      className="group glass block overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_48px_rgb(34_211_238/0.12)]"
    >
      <div className="relative overflow-hidden">
        <img
          src={asset(c.image)}
          alt={`${c.name} class preview`}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <span className="absolute bottom-3 left-3 flex translate-y-2 items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-primary-strong opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          View class
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
      <div className="flex items-center justify-between gap-2 p-4">
        <h3 className="truncate font-display font-semibold">{c.name}</h3>
        <Badge tone="cyan" className="shrink-0">
          {CATEGORY_LABELS[c.category]}
        </Badge>
      </div>
    </Link>
  );
}
