import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import resumeData from '../data/resume.json';

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const navItems = ['About', 'Experience', 'Skills', 'Publications', 'Contact'];

const Footer = () => {
  return (
    <footer className="border-t border-white/6 bg-primary py-12">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">

          {/* Left: wordmark + byline */}
          <div>
            <p className="font-heading font-extrabold text-xl text-accent tracking-tight mb-2">
              ISD<span className="text-text">.</span>
            </p>
            <p className="font-mono text-xs text-text-muted/50 tracking-wider uppercase">
              Designed & built by {resumeData.name}
            </p>
            <p className="font-mono text-xs text-text-muted/30 mt-1">
              © {new Date().getFullYear()} — All rights reserved
            </p>
          </div>

          {/* Right: nav links + socials */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-end">
              {navItems.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-xs font-mono tracking-[0.1em] uppercase text-text-muted/50 hover:text-accent transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <a
                href={resumeData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted/40 hover:text-accent transition-colors"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={resumeData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted/40 hover:text-accent transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={`mailto:${resumeData.contact.email}`}
                className="text-text-muted/40 hover:text-accent transition-colors"
              >
                <FaEnvelope size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
