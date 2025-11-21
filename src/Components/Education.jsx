import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import manipalLogo from '../assets/manipal.png';
import indianaLogo from '../assets/indiana.png';

const EducationCard = ({ education }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Determine which logo to use
  const logo = education.institution === 'Indiana University Bloomington' ? indianaLogo : manipalLogo;

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-secondary/30 rounded-xl border border-white/5 overflow-hidden cursor-pointer transition-colors hover:bg-secondary/50 ${isExpanded ? 'ring-1 ring-accent/50' : ''}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white p-1.5 flex-shrink-0">
                <img src={logo} alt={education.institution} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-bold text-text">{education.degree}</h3>
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted mb-3">
              <span className="font-medium text-text">{education.institution}</span>
              <span>•</span>
              <span>{education.dates}</span>
            </div>

            {/* Tags - Always visible */}
            <div className="flex flex-wrap gap-2 mt-2">
              {education.tags && education.tags.map((tag, i) => (
                <span key={i} className="text-xs px-2 py-1 rounded-md bg-accent/10 text-accent border border-accent/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-1 text-accent">
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-white/5 mt-2">
              <ul className="space-y-2 mt-4">
                {education.notes && education.notes.map((note, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                    <span className="text-accent mt-0.5 text-[0.6rem] flex-shrink-0">●</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Education
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
          </div>

          <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <EducationCard education={edu} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
