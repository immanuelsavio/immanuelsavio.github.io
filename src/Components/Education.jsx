import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import indianaLogo from '../assets/Indiana.png';
import manipalLogo from '../assets/Manipal.png';

const Education = () => {
  return (
    <section className="py-20 bg-primary min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">
            Education
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full mb-8"></div>
        </motion.div>

        <div className="max-w-4xl">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12 py-8 border-l-2 border-secondary last:border-0"
            >
              <div className="absolute -left-[11px] top-8 w-6 h-6 rounded-full bg-primary border-4 border-accent shadow-[0_0_0_4px_rgba(15,23,42,1)] z-10" />
              
              <div className="bg-secondary/30 p-8 rounded-xl hover:bg-secondary/50 transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div className="flex items-center gap-3 mb-2 md:mb-0">
                    <img 
                      src={edu.institution.includes('Indiana') ? indianaLogo : manipalLogo} 
                      alt={edu.institution}
                      className="h-12 w-12 object-contain"
                    />
                    <h3 className="text-2xl font-bold text-text">{edu.institution}</h3>
                  </div>
                  <span className="text-accent font-mono text-sm bg-accent/10 px-3 py-1 rounded-full w-fit">
                    {edu.dates}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-6">
                  <FaGraduationCap className="text-text-muted" />
                  <p className="text-xl text-text-muted font-medium">{edu.degree}</p>
                </div>

                {edu.notes && (
                  <div className="bg-primary/50 p-4 rounded-lg border border-secondary">
                    <ul className="space-y-2">
                      {edu.notes.map((note, i) => (
                        <li key={i} className="text-text-muted text-sm flex items-start">
                          <span className="text-accent mr-2">•</span>
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
