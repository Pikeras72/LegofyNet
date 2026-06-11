import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Lightbox } from '../gallery/Lightbox';
import type { LightboxContent } from '../gallery/Lightbox';
import { asset } from '../../lib/assets';

const diagrams = [
  {
    image: 'images/diagrams/generator.png',
    title: 'Generator',
    caption:
      'U-Net encoder–decoder: convolutions compress the 128×64 input while skip connections preserve spatial detail; the class vector is injected so the same network can produce all 22 styles.',
  },
  {
    image: 'images/diagrams/discriminator.png',
    title: 'Discriminator',
    caption:
      'A PatchGAN that judges local patches as real or fake — and additionally predicts the class of each patch, forcing the generator to be class-faithful.',
  },
  {
    image: 'images/diagrams/full-model.png',
    title: 'Combined model',
    caption:
      'Generator and discriminator wired together for adversarial training: the generator learns by trying to fool a progressively sharper critic.',
  },
];

export function ArchitectureSection() {
  const [active, setActive] = useState<LightboxContent | null>(null);

  return (
    <section aria-labelledby="architecture-heading">
      <SectionHeading
        align="left"
        eyebrow="Architecture"
        title="Inside the multiclass Pix2Pix"
        description={
          <>
            Standard Pix2Pix learns a single image-to-image mapping. LegofyNet extends it with class
            conditioning: a 22-dimensional one-hot vector accompanies every image through the generator,
            and the discriminator carries an auxiliary classification head. Trained on 2,328 paired
            images, this yields sharper, class-consistent figures than a vanilla PatchGAN.
          </>
        }
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {diagrams.map((d) => (
          <figure key={d.title} className="glass overflow-hidden rounded-2xl">
            <button
              type="button"
              onClick={() => setActive({ src: asset(d.image), alt: `${d.title} architecture diagram`, title: d.title, caption: d.caption })}
              className="group relative block w-full cursor-zoom-in bg-white/95"
              aria-label={`Enlarge ${d.title} diagram`}
            >
              <img
                src={asset(d.image)}
                alt={`${d.title} architecture diagram`}
                loading="lazy"
                className="max-h-56 w-full object-contain p-3"
              />
              <span className="absolute top-3 right-3 rounded-lg bg-void/60 p-2 text-ink/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <ZoomIn className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            <figcaption className="p-5">
              <h3 className="font-display font-semibold">{d.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{d.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <Lightbox content={active} onClose={() => setActive(null)} />
    </section>
  );
}
