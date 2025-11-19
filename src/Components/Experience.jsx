import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            <span className="text-accent">02.</span> Work Experience
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
        </motion.div>

        <div className="space-y-12">
          {resumeData.experience.map((company, index) => (
            <div key={index} className="relative">
              {/* Company Name */}
              <motion.h3 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-text mb-6 border-l-4 border-accent pl-4"
              >
                {company.company}
              </motion.h3>

              <div className="space-y-8 ml-4 md:ml-8 border-l border-secondary pl-4 md:pl-8 pb-4">
                {company.roles.map((role, roleIndex) => (
                  <motion.div
                    key={roleIndex}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: roleIndex * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[21px] md:-left-[37px] top-2 w-3 h-3 rounded-full bg-accent border-4 border-primary" />

                    <div className="bg-secondary/50 p-6 rounded-lg hover:bg-secondary transition-colors duration-300">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold text-text">{role.title}</h4>
                          {role.location && (
                            <p className="text-text-muted text-sm mt-1">{role.location}</p>
                          )}
                        </div>
                        <span className="text-accent font-mono text-sm mt-2 md:mt-0 bg-accent/10 px-3 py-1 rounded-full w-fit">
                          {role.dates}
                        </span>
                      </div>

                      <ul className="space-y-3">
                        {role.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start text-text-muted">
                            <span className="text-accent mr-2 mt-1.5">▹</span>
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
