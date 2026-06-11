import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { GridBackground } from '../ui/GridBackground';
import { GlowOrb } from '../ui/GlowOrb';
import { ParticleField } from '../ui/ParticleField';
import { asset } from '../../lib/assets';

const stats = ['22 classes', 'Pix2Pix cGAN', '100% in-browser', '0 uploads'];

export function Hero() {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <GridBackground />
      <ParticleField />
      <GlowOrb color="cyan" className="-top-24 -left-24 h-96 w-96" />
      <GlowOrb color="violet" className="top-1/3 -right-32 h-[28rem] w-[28rem]" delay="-3s" />
      <GlowOrb color="amber" className="bottom-0 left-1/3 h-72 w-72 opacity-60" delay="-6s" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 pt-28 pb-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-primary-strong">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Multiclass Pix2Pix · client-side AI
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Turn any photo into a <span className="text-gradient">sci-fi block figure</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            LegofyNet is a creative AI lab powered by a multiclass Pix2Pix GAN. Upload an image, pick one
            of 22 galactic classes, and watch the generator rebuild it block by block — entirely in your
            browser, with zero uploads.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink to="/generator" size="lg">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
              Launch Generator
            </ButtonLink>
            <ButtonLink to="/classes" variant="secondary" size="lg">
              Explore classes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {stats.map((stat) => (
              <li key={stat} className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                <span className="mr-2 text-primary">▪</span>
                {stat}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="glass relative overflow-hidden rounded-3xl p-3 motion-safe:animate-float-slow">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src={asset('images/gallery/yoda.png')}
                alt="Example transformation: a portrait turned into a green block figure by the model"
                className="w-full"
              />
              {/* Scanning beam sweeping over the showcase */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_rgb(34_211_238/0.9)] motion-safe:animate-scan-y"
              />
            </div>
            <p className="flex items-center justify-between px-2 pt-2.5 pb-1 font-mono text-[10px] uppercase tracking-widest text-muted">
              <span>specimen · yoda class</span>
              <span className="text-primary">● live model output</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
