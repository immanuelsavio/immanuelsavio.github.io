import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { FaArrowRight, FaFileDownload } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import profilePic from '../assets/About.jpeg';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent-dark/10 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          {/* Text Content */}
          <div className="flex flex-col items-start max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-medium tracking-wider mb-4"
            >
              Hi, my name is
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-heading font-bold text-text mb-6 leading-tight"
            >
              {resumeData.name}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl font-heading font-bold text-text-muted mb-8 h-[60px] md:h-[80px]"
            >
              <Typewriter
                options={{
                  strings: resumeData.profile_summary.specializations,
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 50,
                }}
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            >
              I build production-scale AI solutions. Specializing in <span className="text-accent">Generative AI</span>, <span className="text-accent">LLMs</span>, and <span className="text-accent">Recommendation Systems</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="#projects" 
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-accent/20 flex items-center gap-2"
              >
                View Projects <FaArrowRight />
              </a>
              <a 
                href={resumeData.original_resume_pdf} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 border border-accent text-accent font-bold rounded-lg hover:bg-accent/10 transition-all flex items-center gap-2"
              >
                Resume <FaFileDownload />
              </a>
            </motion.div>
          </div>

          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative"
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
