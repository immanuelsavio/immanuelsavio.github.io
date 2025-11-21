import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';

const Skills = () => {
  const skillCategories = [
    { title: 'Languages & Frameworks', skills: resumeData.profile_summary.languages_frameworks },
    { title: 'Platforms & Tools', skills: resumeData.profile_summary.platforms_tools },
    { title: 'Specializations', skills: resumeData.profile_summary.specializations },
    { title: 'Core Competencies', skills: resumeData.profile_summary.core_competencies },
  ];

  return (
    <section id="skills" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">
            Technical Skills
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full mb-8 mx-auto"></div>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building scalable AI and software solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/20 p-8 rounded-xl border border-secondary hover:border-accent/30 transition-all"
            >
              <h3 className="text-2xl font-bold text-text mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-secondary/50 rounded-lg text-text-muted hover:text-accent hover:bg-accent/10 transition-all cursor-default"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
