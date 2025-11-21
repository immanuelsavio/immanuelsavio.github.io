import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaGithub, FaLinkedin, FaMoon, FaSun, FaEnvelope, FaGraduationCap, FaRocket, FaPenNib } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import resumeData from '../data/resume.json';

const Navbar = ({ isOpen, setIsOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map(link => link.path.startsWith('/#') ? link.path.substring(2) : null).filter(Boolean);
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 200)) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && 
          sidebarRef.current && 
          !sidebarRef.current.contains(event.target) && 
          buttonRef.current && 
          !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  // Lock body scroll only on mobile when menu is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Experience', path: '/#experience' },
    { name: 'Education', path: '/#education' },
    { name: 'Skills', path: '/#skills' },
    { name: 'Publications', path: '/#publications' },
    { name: 'Patents', path: '/#patents' },
    { name: 'Talks', path: '/#talks' },
    { name: 'Contact', path: '/#contact' },
  ];

  const handleNavigation = (path) => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
    
    if (path.startsWith('/#')) {
      const id = path.substring(2);
      setActiveSection(id); // Set active immediately on click
      if (location.pathname === '/') {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  if (!mounted) return null;

  const sidebarVariants = {
    closed: { x: "-100%", opacity: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    open: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: (i) => ({ opacity: 1, x: 0, transition: { delay: i * 0.05 + 0.1 } })
  };

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-primary/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Left Side: Menu Button & Logo */}
          <div className="flex items-center gap-6 z-50">
            {/* Menu Button */}
            <button
              ref={buttonRef}
              className="text-text hover:text-accent transition-colors flex items-center gap-2 group"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              <span className="hidden sm:block font-medium uppercase tracking-widest text-sm group-hover:text-accent">
                Menu
              </span>
            </button>

            <Link to="/" onClick={() => handleNavigation('/#home')} className="text-2xl font-heading font-bold text-accent tracking-tighter relative">
              ISD<span className="text-text">.</span>
            </Link>
          </div>

          {/* Right Side: Socials, Theme, Playground */}
          <div className="flex items-center gap-4 sm:gap-6 z-50">
            {/* Social Icons (Desktop) */}
            <div className="hidden md:flex items-center gap-4 border-r border-secondary pr-6">
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
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-text hover:text-accent transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Blog CTA */}
            <Link 
              to="/blog" 
              className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary text-text hover:text-accent border border-white/10 rounded-full transition-all font-bold text-sm"
            >
              <FaPenNib /> <span className="hidden sm:inline">Blog</span>
            </Link>

            {/* Playground CTA */}
            <Link 
              to="/playground" 
              className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent text-accent hover:text-primary border border-accent rounded-full transition-all font-bold text-sm"
            >
              <FaRocket /> <span className="hidden sm:inline">Playground</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Floating Sidebar Menu (macOS Style) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop (Mobile Only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Sidebar */}
            <motion.div
              ref={sidebarRef}
              initial="closed"
              animate="open"
              exit="closed"
              variants={sidebarVariants}
              className="fixed top-24 left-4 w-72 bg-secondary/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[calc(100vh-8rem)]"
            >
              <div className="p-4 overflow-y-auto">
                <div className="flex flex-col space-y-1">
                  <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 px-4 mt-2">Navigation</h3>
                  {navLinks.map((link, i) => {
                    const isHomePage = location.pathname === '/';
                    const isHomeLink = link.path === '/#home';
                    
                    let isActive = false;

                    if (link.path === '/#home') {
                      // Home link is ONLY active if we are strictly on the home page ('/')
                      // AND (activeSection is 'home' OR activeSection is empty)
                      isActive = location.pathname === '/' && (activeSection === 'home' || activeSection === '');
                    } else if (link.path.startsWith('/#')) {
                      // Other hash links are active if we are on home page AND activeSection matches
                      const sectionId = link.path.substring(2);
                      isActive = location.pathname === '/' && activeSection === sectionId;
                    } else {
                      // Normal links (like /blog) are active if pathname matches or is a sub-route
                      isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/');
                    }

                    return (
                      <motion.button
                        key={link.name}
                        custom={i}
                        variants={linkVariants}
                        onClick={() => handleNavigation(link.path)}
                        className={`w-full py-2 rounded-lg text-lg font-bold transition-all flex items-center justify-center gap-3 ${
                          isActive 
                            ? 'border border-accent text-accent shadow-[0_0_8px_rgb(var(--color-accent)/0.4)] bg-accent/5' 
                            : 'text-text hover:bg-white/10 hover:text-accent text-left px-4'
                        }`}
                      >
                        {link.name}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Socials (Bottom of sidebar) */}
              <div className="p-4 border-t border-white/5 bg-black/20 md:hidden">
                <div className="flex justify-around">
                  <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
                    <FaGithub size={20} />
                  </a>
                  <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent transition-colors">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={`mailto:${resumeData.contact.email}`} className="text-text-muted hover:text-accent transition-colors">
                    <FaEnvelope size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
