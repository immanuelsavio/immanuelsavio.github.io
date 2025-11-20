import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaMoon, FaSun, FaEnvelope, FaGraduationCap } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import resumeData from '../data/resume.json';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Experience', path: '#experience' },
    { name: 'Skills', path: '#skills' },
    { name: 'Education', path: '#education' },
    { name: 'Publications', path: '#publications' },
    { name: 'Talks', path: '#talks' },
    { name: 'Contact', path: '#contact' },
  ];

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  if (!mounted) return null;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-primary/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="text-2xl font-heading font-bold text-accent tracking-tighter z-50 relative">
          ISD<span className="text-text">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.path); }}
              className="text-sm uppercase tracking-wider font-medium text-text-muted hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <div className="flex items-center space-x-4 ml-4 border-l border-secondary pl-4">
            <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <FaLinkedin size={20} />
            </a>
            <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <FaGithub size={20} />
            </a>
            <a href={resumeData.external_links.google_scholar} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
              <FaGraduationCap size={20} />
            </a>
            <a href={`mailto:${resumeData.contact.email}`} className="text-text-muted hover:text-accent transition-colors">
              <FaEnvelope size={20} />
            </a>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-text-muted hover:text-accent transition-colors p-2 rounded-full hover:bg-secondary/50"
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-text hover:text-accent transition-colors z-50 relative"
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
          <button
            className="text-text hover:text-accent transition-colors z-50 relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-primary z-40 flex flex-col justify-center items-center lg:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.path); }}
                  className="text-2xl font-heading font-bold text-text-muted hover:text-accent"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex justify-center space-x-8 pt-8 border-t border-secondary w-48 mx-auto">
                <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent">
                  <FaGithub size={28} />
                </a>
                <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent">
                  <FaLinkedin size={28} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
