import { ExternalLink } from 'lucide-react';
import { Card } from '../ui/Card';
import { asset } from '../../lib/assets';
import type { TeamMember } from '../../types';

export function TeamCard({ member }: { member: TeamMember }) {
  return (
    <Card interactive className="overflow-hidden text-center">
      <img
        src={asset(member.photo)}
        alt={`Portrait of ${member.name}`}
        loading="lazy"
        className="aspect-square w-full object-cover object-top"
      />
      <div className="p-5">
        <h3 className="font-display font-semibold">{member.name}</h3>
        <p className="mt-1 text-xs leading-relaxed text-muted">{member.role}</p>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded text-xs font-medium text-primary-strong transition-colors hover:text-primary"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          LinkedIn
        </a>
      </div>
    </Card>
  );
}
