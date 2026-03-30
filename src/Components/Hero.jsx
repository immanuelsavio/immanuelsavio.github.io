import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import Typewriter from 'typewriter-effect';
import resumeData from '../data/resume.json';
import profilePic from '../assets/me2.jpg';

const socialLinks = [
  { href: resumeData.contact.linkedin, icon: FaLinkedin,     label: 'LinkedIn',       external: true },
  { href: resumeData.contact.github,   icon: FaGithub,       label: 'GitHub',          external: true },
  { href: 'https://scholar.google.com/citations?user=B5MnxtIAAAAJ&hl=en', icon: SiGooglescholar, label: 'Google Scholar', external: true },
  { href: `mailto:${resumeData.contact.email}`,              icon: FaEnvelope,     label: 'Email',           external: false },
];

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-primary pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-24 items-center">

          {/* ── Left Column ── */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-md
                bg-accent/8 border border-accent/20 text-xs font-mono tracking-wider text-accent/90"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
              AVAILABLE FOR OPPORTUNITIES
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-heading font-extrabold leading-[0.95] tracking-tight text-text mb-6"
              style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
              Immanuel<br />Savio<span className="text-accent">.</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-xl md:text-2xl font-sans text-text-muted font-normal mb-8 h-10 flex items-center"
            >
              <Typewriter
                options={{
                  strings: [
                    'Machine Learning Scientist',
                    'AI Engineer',
                    'Generative AI Specialist',
                    'Recommendation Systems',
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 40,
                  cursor: '_',
                }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-text-muted text-base md:text-lg leading-relaxed max-w-lg mb-10 font-normal"
            >
              Building production-scale AI systems at W.W. Grainger. Specializing in
              recommendation systems, LLMs, and agentic AI for real-world impact.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="flex gap-3 mb-10"
            >
              {socialLinks.map(({ href, icon: Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="w-10 h-10 rounded-md bg-secondary/40 border border-white/8
                    hover:border-accent/60 hover:text-accent hover:bg-accent/8
                    flex items-center justify-center text-text-muted transition-all duration-200"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="https://github.com/immanuelsavio"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md
                border border-accent/40 text-accent text-sm font-mono tracking-wider
                hover:bg-accent/10 hover:border-accent transition-all duration-200"
            >
              VIEW LATEST WORK →
            </motion.a>
          </div>

          {/* ── Right Column: Geometric Photo Frame ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative flex-shrink-0 hidden lg:block"
          >
            {/* Corner bracket — top-left */}
            <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-accent/60 z-20" />
            {/* Corner bracket — bottom-right */}
            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-accent/60 z-20" />

            {/* Photo container */}
            <div className="w-72 h-80 lg:w-80 lg:h-96 overflow-hidden relative border border-white/10">
              {/* Top accent stripe */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent/70 z-10" />
              <img
                src={profilePic}
                alt={resumeData.name}
                className="w-full h-full object-cover object-bottom"
                style={{ filter: 'grayscale(15%) contrast(1.05)' }}
              />
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>

            {/* Detail label */}
            <p className="font-mono text-[10px] tracking-[0.2em] text-text-muted/40 mt-3 text-right uppercase">
              Chicago, IL — ML Scientist
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
