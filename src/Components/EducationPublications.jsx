import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';

const EducationPublications = () => {
  return (
    <section id="education" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
                <span className="text-accent">05.</span> Education
              </h2>
              <div className="w-20 h-1 bg-accent rounded-full"></div>
            </motion.div>

            <div className="space-y-8">
              {resumeData.education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-6 border-l-2 border-secondary"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary border-2 border-accent" />
                  <h3 className="text-xl font-bold text-text">{edu.institution}</h3>
                  <p className="text-accent font-medium mb-1">{edu.degree}</p>
                  <p className="text-text-muted text-sm font-mono mb-4">{edu.dates}</p>
                  {edu.notes && (
                    <ul className="space-y-1">
                      {edu.notes.map((note, i) => (
                        <li key={i} className="text-text-muted text-sm">
                          • {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
                <span className="text-accent">06.</span> Publications
              </h2>
              <div className="w-20 h-1 bg-accent rounded-full"></div>
            </motion.div>

            <div className="space-y-6">
              {resumeData.publications.map((pub, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-secondary/30 p-6 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-text mb-2">{pub.title}</h3>
                  <p className="text-text-muted text-sm mb-2">
                    {pub.authors.join(', ')}
                  </p>
                  <div className="flex justify-between items-end">
                    <p className="text-accent text-xs font-mono">{pub.venue}</p>
                    <span className="text-text-muted text-xs font-bold">{pub.year}</span>
                  </div>
                  {pub.citations && (
                    <p className="text-text-muted/60 text-xs mt-2">
                      Citations: {pub.citations}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationPublications;
