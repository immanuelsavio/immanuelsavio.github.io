import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resumeData from '../data/resume.json';
import graingerLogo from '../assets/grainger.png';
import dellLogo from '../assets/dell.png';
import SectionHeading from './SectionHeading';

const ExperienceCard = ({ role, companyName, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="grid grid-cols-[20px_1fr] md:grid-cols-[40px_1fr] gap-x-4 md:gap-x-6">
      {/* Left gutter: dot + connecting line */}
      <div className="flex flex-col items-center">
        <div className="mt-7 w-2.5 h-2.5 rounded-full bg-accent border-2 border-accent flex-shrink-0 z-10 relative" />
        {!isLast && (
          <div className="flex-1 w-px bg-accent/25 mt-1" />
        )}
      </div>

      {/* Card */}
      <div className="pb-6">
        <motion.div
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className={`
            bg-secondary/20 rounded-lg border border-white/6 border-t-2 border-t-accent/30
            overflow-hidden cursor-pointer transition-colors hover:bg-secondary/35
            ${isExpanded ? 'ring-1 ring-accent/30' : ''}
          `}
        >
          <div className="p-6">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-grow">
                <h3 className="text-xl font-heading font-bold text-text mb-1">{role.title}</h3>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted mb-3">
                  <span className="font-medium text-accent">{companyName}</span>
                  <span>•</span>
                  <span>{role.location}</span>
                  <span>•</span>
                  <span>{role.dates}</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {role.tags && role.tags.map((tag, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-accent/10 text-accent border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-1 text-accent font-mono text-sm flex-shrink-0 select-none">
                {isExpanded ? '[−]' : '[+]'}
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
    </div>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading number="02" title="Experience" />

        <div className="space-y-16">
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Company Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-md flex items-center justify-center overflow-hidden shadow-md ${exp.company === 'W.W. Grainger' ? 'bg-white p-2' : 'bg-secondary/50 p-1'}`}>
                  <img
                    src={exp.company === 'W.W. Grainger' ? graingerLogo : dellLogo}
                    alt={exp.company}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-lg font-heading font-semibold tracking-wide text-text">{exp.company}</h3>
              </div>

              {/* Roles */}
              <div>
                {exp.roles.map((role, roleIndex) => (
                  <ExperienceCard
                    key={`${index}-${roleIndex}`}
                    role={role}
                    companyName={exp.company}
                    isLast={roleIndex === exp.roles.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
