import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import resumeData from '../data/resume.json';

const Hero = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent-dark/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-start max-w-3xl">
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
            className="text-5xl md:text-7xl font-heading font-bold text-text mb-4 leading-tight"
          >
            {resumeData.name}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-5xl font-heading font-bold text-text-muted mb-8 h-[60px] md:h-[80px]"
          >
            <Typewriter
              options={{
                strings: [
                  'Machine Learning Scientist',
                  'AI Engineer',
                  'Generative AI Specialist',
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,
              }}
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-text-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
          >
            Specializing in <span className="text-accent">Generative AI</span>, <span className="text-accent">LLMs</span>, and <span className="text-accent">Recommendation Systems</span>. 
            I build production-scale AI solutions that drive business value and innovation.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#experience" 
              className="px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-accent/20"
            >
              Check out my work
            </a>
            <a 
              href={resumeData.original_resume_pdf} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border border-accent text-accent font-bold rounded-lg hover:bg-accent/10 transition-all"
            >
              Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
