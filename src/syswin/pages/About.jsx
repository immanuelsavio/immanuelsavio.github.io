import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ChatsCircle, CurrencyInr, Package, SealCheck, Stack,
} from '@phosphor-icons/react';
import doctor from '../assets/doctor.webp';
import bpCheck from '../assets/bp-check.webp';
import blister from '../assets/blister.webp';
import Journey from '../components/Journey';
import { company, stats } from '../data/catalog';
import { Button, EASE, Headline, Reveal } from '../ui';

const principles = [
  { icon: Stack, title: 'Focused portfolio', body: 'Practical medicines for everyday clinical needs.' },
  { icon: ChatsCircle, title: 'Ethical representation', body: 'Honest, transparent doctor-rep relationships.' },
  { icon: Package, title: 'Consistent availability', body: 'Distribution-first supply reliability.' },
  { icon: CurrencyInr, title: 'Affordable access', body: 'Quality medicines at responsible prices.' },
];

const commitments = [
  { title: 'Quality-first portfolio discipline', body: 'Every product sourced from established manufacturers, meeting applicable regulatory standards.' },
  { title: 'Ethical doctor-rep communication', body: 'Clean, transparent product information designed for professional clinical conversations.' },
  { title: 'Affordable everyday access', body: 'Focused operations keep pricing honest, passing savings to the people who need them.' },
];

function AboutHero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['0%', '14%']);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.14]);

  return (
    <section ref={ref} className="sx-shell grid gap-12 pb-24 pt-36 md:grid-cols-12 md:items-end md:pb-32 md:pt-44">
      <div className="md:col-span-7">
        <motion.p
          className="mb-8 text-sm font-medium text-sx-brand"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          About Syswin
        </motion.p>
        <Headline
          as="h1"
          animateOnMount
          delay={0.1}
          lines={['Built for', 'dependable', 'everyday healthcare.']}
          className="text-[clamp(2.8rem,6.6vw,6.2rem)] font-semibold leading-[0.95] text-sx-ink"
        />
        <Reveal delay={0.5} className="mt-10 grid max-w-2xl gap-5 text-lg leading-relaxed text-sx-muted">
          <p>Syswin Pharmaceuticals was founded on a simple belief: everyday medicines should be reliable, available, and priced within reach of the people who need them.</p>
          <p>Based in Bengaluru, Syswin focuses on pharmaceutical distribution and marketing across practical, high-demand therapeutic categories.</p>
        </Reveal>
      </div>
      <motion.div
        className="relative aspect-[4/5] overflow-hidden rounded-sx md:col-span-5"
        initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0% round 28px)' }}
        animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
      >
        <motion.img src={doctor} alt="A doctor in a white coat with a stethoscope, arms folded" style={{ y, scale }} className="h-full w-full object-cover" />
      </motion.div>
    </section>
  );
}

function Story() {
  return (
    <section aria-labelledby="sx-about-story" className="bg-sx-surface py-28 md:py-40">
      <div className="sx-shell grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Headline lines={['A focused company,', 'built from big-pharma', 'experience.']} className="text-[clamp(2rem,3.8vw,3.6rem)] font-semibold leading-[1.02] text-sx-ink" />
            <h2 id="sx-about-story" className="sr-only">Our story</h2>
            <Reveal delay={0.2} className="mt-10 hidden overflow-hidden rounded-sx md:block">
              <img src={bpCheck} alt="A clinician checking a patient's blood pressure" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </Reveal>
          </div>
        </div>
        <div className="space-y-8 md:col-span-6 md:col-start-7">
          <Reveal as="p" className="sx-display text-[clamp(1.5rem,2.4vw,2.1rem)] font-medium leading-snug text-sx-ink">
            Syswin began with three experienced pharmaceutical professionals who had spent years inside larger pharma organisations.
          </Reveal>
          <Reveal as="p" className="text-lg leading-relaxed text-sx-muted">
            They understood the value of strong systems, quality discipline, and scale, but they also saw that everyday healthcare often needed more focus.
          </Reveal>
          <Reveal as="p" className="text-lg leading-relaxed text-sx-muted">
            They wanted to build a company closer to the ground: closer to doctors, closer to pharmacists, and closer to the daily medicines people actually depend on.
          </Reveal>
          <Reveal as="p" className="text-lg leading-relaxed text-sx-muted">
            That idea became Syswin, a smaller, sharper, distribution-first company built around practical medicines, responsible relationships, and long-term trust.
          </Reveal>
          <Reveal as="p" className="text-lg leading-relaxed text-sx-muted">
            Today the company stays close to what matters most to doctors, pharmacists, and patients: consistent supply, trusted quality, ethical representation, and affordable access.
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PrinciplesGrid() {
  return (
    <section aria-labelledby="sx-about-principles" className="sx-shell py-28 md:py-40">
      <Headline lines={['Distribution-first,', 'by design.']} className="mb-14 text-[clamp(2.2rem,4.8vw,4.4rem)] font-semibold leading-[1] text-sx-ink md:mb-20" />
      <h2 id="sx-about-principles" className="sr-only">Principles</h2>
      <ul className="grid gap-px overflow-hidden rounded-sx bg-sx-line/10 ring-1 ring-sx-line/10 sm:grid-cols-2">
        {principles.map((p, i) => {
          const Icon = p.icon;
          return (
            <Reveal as="li" key={p.title} delay={i * 0.06} className="group relative bg-sx-paper p-8 transition-colors duration-500 hover:bg-sx-surface md:p-12">
              <Icon size={32} className="text-sx-brand transition-transform duration-500 group-hover:-translate-y-1" aria-hidden />
              <h3 className="sx-display mt-16 text-3xl font-semibold text-sx-ink md:text-4xl">{p.title}</h3>
              <p className="mt-3 text-lg text-sx-muted">{p.body}</p>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}

function Quality() {
  return (
    <section aria-labelledby="sx-about-quality" className="sx-shell pb-28 md:pb-40">
      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-sx bg-sx-brand p-8 text-sx-on-brand md:p-12 lg:col-span-5">
          <img src={blister} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity" />
          <SealCheck size={40} className="relative" aria-hidden />
          <div className="relative">
            <p className="text-sm opacity-80">Quality management</p>
            <p className="sx-display mt-2 text-[clamp(2.6rem,5vw,4.4rem)] font-semibold leading-none">{company.iso}</p>
            <p className="mt-4 max-w-sm opacity-85">Brand materials reference {company.iso} certification.</p>
          </div>
        </Reveal>
        <div className="flex flex-col gap-4 lg:col-span-7">
          <Reveal>
            <Headline lines={['Quality, access,', 'and trust.']} className="px-1 pb-4 text-[clamp(2.2rem,4.4vw,4rem)] font-semibold leading-[1] text-sx-ink" />
            <h2 id="sx-about-quality" className="sr-only">Commitment</h2>
          </Reveal>
          {commitments.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="rounded-sx bg-sx-surface p-7 ring-1 ring-sx-line/10 md:p-9">
              <h3 className="sx-display text-2xl font-semibold text-sx-ink">{c.title}</h3>
              <p className="mt-2 text-sx-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Cta() {
  return (
    <section className="sx-shell pb-28 md:pb-40">
      <Reveal className="flex flex-col items-start justify-between gap-10 rounded-sx bg-sx-surface p-8 ring-1 ring-sx-line/10 md:flex-row md:items-end md:p-14">
        <div>
          <p className="sx-display text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[1] text-sx-ink">
            {stats.products} products. {stats.specialities} specialities.
          </p>
          <p className="mt-4 max-w-lg text-lg text-sx-muted">Browse the full portfolio by speciality, with labels, detail sheets and 1mg listings.</p>
        </div>
        <Button to="/syswin/portfolio" size="lg">
          Explore portfolio <ArrowRight size={16} weight="bold" />
        </Button>
      </Reveal>
    </section>
  );
}

export default function About() {
  return (
    <>
      <AboutHero />
      <Story />
      <PrinciplesGrid />
      <Quality />
      <Journey />
      <div className="pt-28 md:pt-40" />
      <Cta />
    </>
  );
}
