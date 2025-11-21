import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import resumeData from '../data/resume.json';
import profilePic from '../assets/About.jpeg';

const SplitFlapDisplay = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';
  
  useEffect(() => {
    const targetText = text.toUpperCase();
    let currentIteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        targetText
          .split('')
          .map((char, index) => {
            if (index < currentIteration) {
              return char;
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );
      
      currentIteration += 0.5;
      
      if (currentIteration >= targetText.length) {
        clearInterval(interval);
        setDisplayText(targetText);
        setIsAnimating(false);
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [text]);
  
  return (
    <div className="font-mono text-2xl md:text-3xl tracking-wider">
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-100 ${
            isAnimating ? 'text-accent/80' : 'text-accent'
          }`}
          style={{
            textShadow: isAnimating 
              ? '0 0 10px rgba(16, 185, 129, 0.5)' 
              : '0 0 20px rgba(16, 185, 129, 0.3)',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

const Hero = () => {
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const technologies = [
    'Machine Learning',
    'Recommendation Systems',
    'LLMs & Agentic AI',
    'Deep Learning',
    'NLP'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTechIndex((prev) => (prev + 1) % technologies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-primary pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl md:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent"
            >
              {resumeData.name}
            </motion.h1>

            {/* Split-Flap Display */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 h-16 flex items-center justify-center lg:justify-start"
            >
              <SplitFlapDisplay key={currentTechIndex} text={technologies[currentTechIndex]} />
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed"
            >
              Senior Applied ML Scientist specializing in recommendation systems and agentic AI.
              Building intelligent systems that scale to millions of users.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center lg:justify-start gap-6"
            >
              <a
                href={resumeData.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-secondary/30 border border-secondary hover:border-accent flex items-center justify-center text-text hover:text-accent transition-all hover:scale-110"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href={resumeData.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-secondary/30 border border-secondary hover:border-accent flex items-center justify-center text-text hover:text-accent transition-all hover:scale-110"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://scholar.google.com/citations?user=B5MnxtIAAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-full bg-secondary/30 border border-secondary hover:border-accent flex items-center justify-center text-text hover:text-accent transition-all hover:scale-110"
              >
                <SiGooglescholar size={24} />
              </a>
              <a
                href={`mailto:${resumeData.contact.email}`}
                className="w-14 h-14 rounded-full bg-secondary/30 border border-secondary hover:border-accent flex items-center justify-center text-text hover:text-accent transition-all hover:scale-110"
              >
                <FaEnvelope size={24} />
              </a>
            </motion.div>

            {/* What I'm Building Now Button */}
            <motion.a
              href="https://github.com/immanuelsavio/Flourish"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="group relative inline-flex items-center justify-center lg:justify-start gap-3 px-8 py-4 mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 border-2 border-accent/50 hover:border-accent transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              
              {/* Content */}
              <div className="relative flex items-center gap-3">
                <span className="text-2xl animate-bounce">🚀</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm text-accent/80 font-medium uppercase tracking-wider">What's New?</span>
                  <span className="text-lg font-bold text-accent group-hover:text-accent/90 transition-colors">Check out my latest project →</span>
                </div>
              </div>
              
              {/* Pulse ring effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-accent/30 animate-ping opacity-20"></div>
            </motion.a>
          </motion.div>

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative flex-shrink-0"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-accent shadow-[0_0_40px_rgba(56,189,248,0.3)] relative z-10">
              <img 
                src={profilePic} 
                alt={resumeData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Circle */}
            <div className="absolute top-4 left-4 w-full h-full rounded-full border-2 border-secondary -z-0 transform translate-x-4 translate-y-4"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

