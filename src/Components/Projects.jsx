import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaFolder } from 'react-icons/fa';
import resumeData from '../data/resume.json';

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-4">
            <span className="text-accent">03.</span> Featured Projects
          </h2>
          <div className="w-20 h-1 bg-accent rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/50 p-8 rounded-lg hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="flex justify-between items-center mb-6">
                <FaFolder className="text-4xl text-accent" />
                <div className="flex space-x-4">
                  {/* Add links if available in JSON, currently using placeholders or checking if they exist */}
                  {/* Assuming project might have links in future, keeping structure ready */}
                </div>
              </div>

              <h3 className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              
              <p className="text-accent text-sm font-mono mb-4">{project.dates}</p>

              <ul className="space-y-2 mb-6">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="text-text-muted text-sm leading-relaxed">
                    {highlight}
                  </li>
                ))}
              </ul>

              {/* Tech Stack Tags - Extracting from title/highlights if not explicitly in JSON */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {['LLMs', 'GANs', 'Python', 'FAISS'].map((tech, i) => (
                  <span key={i} className="text-xs font-mono text-accent/80">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Patents as Projects */}
          {resumeData.authorized_patents.map((patent, index) => (
            <motion.div
              key={`patent-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (resumeData.projects.length + index) * 0.1 }}
              className="bg-secondary/50 p-8 rounded-lg hover:-translate-y-2 transition-all duration-300 group border border-accent/10"
            >
              <div className="flex justify-between items-center mb-6">
                <FaFolder className="text-4xl text-accent-dark" />
                <div className="flex space-x-4">
                  <a 
                    href={patent.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors"
                  >
                    <FaExternalLinkAlt size={20} />
                  </a>
                </div>
              </div>

              <h3 className="text-xl font-bold text-text mb-2 group-hover:text-accent transition-colors">
                {patent.title}
              </h3>
              
              <div className="flex justify-between items-center mb-4">
                <p className="text-accent text-sm font-mono">{patent.status}</p>
                <p className="text-text-muted text-xs">{patent.date}</p>
              </div>

              <p className="text-text-muted text-sm mb-2">
                {patent.organization}
              </p>
              <p className="text-xs font-mono text-text-muted/60">
                {patent.patent_number}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
