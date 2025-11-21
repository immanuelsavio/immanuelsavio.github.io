import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import graingerLogo from '../assets/grainger.png';
import dellLogo from '../assets/dell.png';

const ExperienceCard = ({ role, companyLogo, companyName, isFirst, isLast, isSingle }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative pl-12 md:pl-24">
      {/* Timeline Line */}
      {!isLast && (
        <div 
          className={`absolute w-0.5 bg-accent/30 z-0 ${isSingle ? 'left-[19px]' : 'left-[23px]'} md:left-[47px]`}
          style={{
            top: '2.3rem',
            height: 'calc(100% + 1.5rem)'
          }}
        />
      )}
      
      {/* Timeline Dot */}
      <div 
        className={`absolute top-8 w-2.5 h-2.5 rounded-full border-2 border-accent bg-accent z-10
        ${isSingle ? 'left-[15px] md:left-[39px]' : 'left-[19px] md:left-[43px]'}`}
      />

      <motion.div
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        className={`bg-secondary/30 rounded-xl border border-white/5 overflow-hidden cursor-pointer transition-colors hover:bg-secondary/50 ${isExpanded ? 'ring-1 ring-accent/50' : ''}`}
      >
        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-text mb-1">{role.title}</h3>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted mb-3">
                <span className="font-medium text-accent">{companyName}</span>
                <span>•</span>
                <span>{role.location}</span>
                <span>•</span>
                <span>{role.dates}</span>
              </div>

              {/* Tags - Always visible */}
              <div className="flex flex-wrap gap-2 mt-2">
                {role.tags && role.tags.map((tag, i) => (
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
                {role.highlights && role.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-muted text-sm">
                    <span className="text-accent mt-0.5 text-[0.6rem] flex-shrink-0">●</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Experience
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
          </div>

          <div className="space-y-16">
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="relative">
                {/* Company Header with Logo */}
                <div className="flex items-center gap-4 mb-8 pl-4 md:pl-8">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shadow-lg ${exp.company === 'W.W. Grainger' ? 'bg-white p-2' : 'bg-secondary/50 p-1'}`}>
                    <img 
                      src={exp.company === 'W.W. Grainger' ? graingerLogo : dellLogo} 
                      alt={exp.company} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-text">{exp.company}</h3>
                </div>

                {/* Roles Container */}
                <div className="space-y-6 relative">
                  {/* Vertical Line connecting roles */}
                  {/* Removed the separate vertical line div as it's now handled inside ExperienceCard */}

                  {exp.roles.map((role, roleIndex) => (
                    <ExperienceCard 
                      key={`${index}-${roleIndex}`} 
                      role={role} 
                      companyLogo={null} // Logo is now in header
                      companyName={exp.company}
                      isFirst={roleIndex === 0}
                      isLast={roleIndex === exp.roles.length - 1}
                      isSingle={exp.roles.length === 1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
