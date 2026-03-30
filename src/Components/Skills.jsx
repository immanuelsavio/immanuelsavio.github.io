import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import SectionHeading from './SectionHeading';

const categories = [
  {
    title: 'Languages & Frameworks',
    key: 'languages_frameworks',
    accent: 'text-blue-400',
    pill: 'bg-blue-400/8 border border-blue-400/20 text-blue-300/80 hover:border-blue-400/50 hover:text-blue-200',
  },
  {
    title: 'Platforms & Tools',
    key: 'platforms_tools',
    accent: 'text-violet-400',
    pill: 'bg-violet-400/8 border border-violet-400/20 text-violet-300/80 hover:border-violet-400/50 hover:text-violet-200',
  },
  {
    title: 'Specializations',
    key: 'specializations',
    accent: 'text-accent',
    pill: 'bg-accent/8 border border-accent/20 text-accent/75 hover:border-accent/50 hover:text-accent',
  },
  {
    title: 'Core Competencies',
    key: 'core_competencies',
    accent: 'text-amber-400',
    pill: 'bg-amber-400/8 border border-amber-400/20 text-amber-300/80 hover:border-amber-400/50 hover:text-amber-200',
  },
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-primary">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="04"
          title="Technical Skills"
          subtitle="A toolkit for building scalable AI and software systems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category, index) => {
            const skills = resumeData.profile_summary[category.key] ?? [];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-secondary/15 p-8 rounded-lg border border-white/6 border-t-2 border-t-accent/15 hover:border-t-accent/35 transition-all duration-300"
              >
                <h3 className={`text-xs font-mono uppercase tracking-[0.18em] ${category.accent} mb-5 opacity-80`}>
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`
                        inline-flex items-center px-3.5 py-1.5 rounded-full
                        text-sm font-sans tracking-wide
                        ${category.pill}
                        transition-all duration-150 cursor-default
                      `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
