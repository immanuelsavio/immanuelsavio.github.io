import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import SectionHeading from './SectionHeading';

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading number="08" title="Get In Touch" align="center" />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-text-muted text-lg md:text-xl leading-relaxed mb-16 max-w-2xl mx-auto"
        >
          Open to research collaborations, consulting, and interesting engineering problems.
          If you want to talk AI, ML systems, or just connect — I'm usually a reply away.
        </motion.p>

        {/* Primary email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <a
            href={`mailto:${resumeData.contact.email}`}
            className="group flex items-center gap-3 px-8 py-4 rounded-lg
              border border-accent/40 hover:border-accent
              bg-accent/5 hover:bg-accent/10
              text-accent font-mono text-sm tracking-widest uppercase
              transition-all duration-200"
          >
            <FaEnvelope size={16} />
            {resumeData.contact.email}
            <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </a>
        </motion.div>

        {/* Secondary contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto"
        >
          <a
            href={resumeData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg
              bg-secondary/20 border border-white/6
              hover:border-accent/40 hover:bg-secondary/35
              text-text-muted hover:text-text transition-all group"
          >
            <FaLinkedin className="text-accent flex-shrink-0" size={18} />
            <div>
              <p className="text-xs font-mono tracking-wider text-text-muted/60 uppercase mb-0.5">LinkedIn</p>
              <p className="text-sm font-medium">Connect</p>
            </div>
            <span className="ml-auto text-accent/0 group-hover:text-accent/60 transition-colors text-xs">→</span>
          </a>

          <a
            href={resumeData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-lg
              bg-secondary/20 border border-white/6
              hover:border-accent/40 hover:bg-secondary/35
              text-text-muted hover:text-text transition-all group"
          >
            <FaGithub className="text-accent flex-shrink-0" size={18} />
            <div>
              <p className="text-xs font-mono tracking-wider text-text-muted/60 uppercase mb-0.5">GitHub</p>
              <p className="text-sm font-medium">View Work</p>
            </div>
            <span className="ml-auto text-accent/0 group-hover:text-accent/60 transition-colors text-xs">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
