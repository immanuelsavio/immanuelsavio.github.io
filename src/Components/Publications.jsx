import React from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaFileContract } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import resumeData from '../data/resume.json';

const Publications = () => {
  return (
    <section id="publications" className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">
            Publications
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full mb-8"></div>
          <div className="flex items-center gap-4">
            <p className="text-text-muted text-lg">
              Research papers, conference proceedings, and patents.
            </p>
            <a 
              href={resumeData.external_links.google_scholar} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors font-medium"
            >
              <SiGooglescholar size={20} />
              <span>Google Scholar</span>
            </a>
          </div>
        </motion.div>

        {/* Patents Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-heading font-bold text-text mb-8">Patents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resumeData.authorized_patents.map((patent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/40 p-8 rounded-xl border border-secondary hover:border-accent/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <FaFileContract size={100} />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      patent.status === 'Granted' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {patent.status}
                    </span>
                  </div>

                  <a 
                    href={patent.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block group/title"
                  >
                    <h3 className="text-2xl font-bold text-text mb-3 group-hover/title:text-accent transition-colors">
                      {patent.title}
                    </h3>
                  </a>
                  
                  <div className="flex flex-col gap-1 mb-6">
                    <p className="text-accent font-mono text-sm">{patent.organization}</p>
                    <p className="text-text-muted text-sm">{patent.date}</p>
                    <p className="text-text-muted/60 text-xs font-mono">{patent.patent_number}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Papers Section */}
        <div>
          <h3 className="text-2xl font-heading font-bold text-text mb-8">Papers</h3>
          <div className="grid grid-cols-1 gap-6">
            {resumeData.publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-secondary/20 p-6 rounded-xl border border-secondary hover:border-accent/30 transition-all group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <a 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block group/title"
                    >
                      <h4 className="text-xl font-bold text-text mb-2 group-hover/title:text-accent transition-colors">
                        {pub.title}
                      </h4>
                    </a>
                    <p className="text-text-muted mt-2 mb-3 italic">
                      {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-accent font-medium">{pub.venue}</span>
                      <span className="text-text-muted">•</span>
                      <span className="text-text-muted">{pub.year}</span>
                      {pub.citations && (
                        <>
                          <span className="text-text-muted">•</span>
                          <span className="text-text-muted">{pub.citations} citations</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
