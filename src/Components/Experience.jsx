import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import graingerLogo from '../assets/grainger.png';
import dellLogo from '../assets/dell.png';

const Experience = () => {
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
            Work Experience
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full mb-8"></div>
          <p className="text-text-muted text-lg max-w-2xl">
            A journey through my professional career in Machine Learning and AI.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-0 top-0 bottom-0 w-0.5 bg-secondary hidden md:block" />

          <div className="space-y-16">
            {resumeData.experience.map((company, index) => (
              <div key={index}>
                {/* Company Header */}
                <div className="mb-8 pl-0 md:pl-12 relative flex items-center gap-4">
                   <div className="absolute left-[-6px] top-2 w-3 h-3 bg-accent rounded-full hidden md:block"></div>
                   <img 
                     src={company.company === 'W.W. Grainger' ? graingerLogo : dellLogo} 
                     alt={company.company}
                     className={`h-16 w-16 object-contain ${company.company === 'W.W. Grainger' ? 'bg-white p-2 rounded-lg' : ''}`}
                   />
                   <h3 className="text-2xl md:text-3xl font-bold text-text">{company.company}</h3>
                </div>

                {company.roles.map((role, roleIndex) => (
                  <motion.div
                    key={`${index}-${roleIndex}`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row gap-8 mb-12 md:pl-12 border-l-2 border-secondary md:border-l-0 ml-8 md:ml-0"
                  >
                    {/* Content Card */}
                    <div className="flex-1">
                      <div className="bg-secondary/30 p-8 rounded-xl hover:bg-secondary/50 transition-all duration-300 border border-secondary/50 hover:border-accent/30 shadow-lg hover:shadow-xl relative">
                        {/* Connector Line for Mobile */}
                        <div className="absolute left-[-34px] top-8 w-8 h-0.5 bg-secondary md:hidden"></div>
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                          <div>
                            <h4 className="text-xl font-bold text-text leading-tight">{role.title}</h4>
                            <div className="flex items-center gap-2 text-text-muted text-sm mt-2">
                              <FaMapMarkerAlt className="text-accent" />
                              <span>{role.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-accent font-mono text-sm bg-accent/10 px-3 py-1 rounded-full w-fit h-fit">
                            <FaCalendarAlt />
                            <span>{role.dates}</span>
                          </div>
                        </div>

                        <ul className="space-y-3">
                          {role.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start text-text-muted text-sm leading-relaxed">
                              <span className="text-accent mr-3 mt-1.5 text-xs">●</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
