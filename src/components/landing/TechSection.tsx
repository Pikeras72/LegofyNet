import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { SectionHeading } from '../ui/SectionHeading';

const specs = [
  ['INPUT', '128×64×3 RGB + one-hot[22]'],
  ['GENERATOR', 'U-Net encoder–decoder'],
  ['DISCRIMINATOR', 'PatchGAN + class head'],
  ['OUTPUT', '64×128 block figure'],
  ['DATASET', '2,328 curated images'],
  ['RUNTIME', 'TensorFlow.js · WebGL'],
];

export function TechSection() {
  return (
    <section className="relative border-y border-line bg-deep/50 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Under the hood"
            title="A conditional GAN with a class-aware eye"
            description={
              <>
                LegofyNet extends the classic Pix2Pix architecture to multiple classes: the generator
                receives your image <em>plus</em> a one-hot class vector, while a PatchGAN discriminator
                judges every patch as real-or-fake <em>and</em> predicts its class. The adversarial duel
                forces outputs that are both convincing and class-faithful.
              </>
            }
          />
          <Link
            to="/about"
            className="group mt-6 inline-flex items-center gap-2 rounded text-sm font-medium text-primary-strong transition-colors hover:text-primary"
          >
            Read the full architecture
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="glass overflow-hidden rounded-2xl"
        >
          <div className="flex items-center gap-2 border-b border-line px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-danger/70" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-block/70" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" aria-hidden="true" />
            <span className="ml-2 font-mono text-xs text-muted">model_card.txt</span>
          </div>
          <dl className="space-y-3 p-6 font-mono text-sm">
            {specs.map(([key, value]) => (
              <div key={key} className="flex flex-wrap justify-between gap-x-6 gap-y-0.5">
                <dt className="text-muted">{key}</dt>
                <dd className="text-primary-strong">{value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
