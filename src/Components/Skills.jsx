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
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            <span className="text-accent">04.</span> Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/30 p-6 rounded-lg border border-secondary hover:border-accent/30 transition-colors"
            >
              <h3 className="text-xl font-bold text-accent mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-primary rounded-md text-text-muted text-sm font-mono hover:text-accent hover:bg-secondary transition-all cursor-default"
                  >
                    {skill}
                  </span>
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
