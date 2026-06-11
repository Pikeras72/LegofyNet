import { motion } from 'framer-motion';
import { ImageUp, Layers, Sparkles } from 'lucide-react';
import { Card } from '../ui/Card';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  {
    icon: ImageUp,
    title: 'Upload a photo',
    text: 'Drag & drop any JPG or PNG. It is processed locally — nothing ever leaves your device.',
  },
  {
    icon: Layers,
    title: 'Pick a class',
    text: 'Choose one of 22 galactic character classes. The class is injected into the network as a one-hot vector.',
  },
  {
    icon: Sparkles,
    title: 'Generate',
    text: 'The Pix2Pix generator synthesizes your block figure in a single forward pass on your GPU.',
  },
];

export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading
        eyebrow="Protocol"
        title="Three steps to legofy anything"
        description="A full generative pipeline compressed into a playful, zero-setup experience."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <Card interactive className="h-full p-7">
              <div className="flex items-center justify-between">
                <span className="rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 p-3 text-primary-strong">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs tracking-[0.25em] text-muted/70">0{i + 1}</span>
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{step.text}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
