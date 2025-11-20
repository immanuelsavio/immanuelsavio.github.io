import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaFolderOpen, FaCode } from 'react-icons/fa';
import resumeData from '../data/resume.json';

const Projects = () => {
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
            Featured Projects
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full mb-8"></div>
          <p className="text-text-muted text-lg max-w-2xl">
            Showcase of my technical projects involving LLMs, Generative AI, and System Architecture.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-secondary/30 rounded-2xl overflow-hidden border border-secondary hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10"
            >
              {/* Decorative Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="p-8 relative z-10 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-primary rounded-lg text-accent group-hover:text-white group-hover:bg-accent transition-colors duration-300">
                    <FaFolderOpen size={24} />
                  </div>
                  <div className="flex gap-4">
                    {project.link && project.link !== "#" && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-accent transition-colors"
                      >
                        <FaGithub size={24} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-accent font-mono text-sm mb-6 bg-accent/10 w-fit px-3 py-1 rounded-full">
                  {project.dates}
                </p>

                <div className="flex-grow">
                  <ul className="space-y-3 mb-6">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="text-text-muted text-sm leading-relaxed flex items-start">
                        <span className="text-accent mr-2 mt-1">▹</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Tags (Inferred) */}
                <div className="pt-6 border-t border-secondary/50 flex flex-wrap gap-2">
                  {['AI Agents', 'LLM', 'Python', 'System Design'].map((tag, i) => (
                    <span key={i} className="text-xs font-mono text-text-muted/80 bg-primary px-2 py-1 rounded border border-secondary/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
