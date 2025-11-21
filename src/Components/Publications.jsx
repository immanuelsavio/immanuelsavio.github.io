import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaQuoteRight, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import resumeData from '../data/resume.json';

const PublicationCard = ({ publication }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-secondary/30 rounded-xl border border-white/5 overflow-hidden cursor-pointer transition-colors hover:bg-secondary/50 ${isExpanded ? 'ring-1 ring-accent/50' : ''}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center mt-1">
                <FaBook size={14} />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-text mb-2">{publication.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
                  <span className="text-accent font-mono">{publication.year}</span>
                  {publication.citations > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1.5">
                        <FaQuoteRight className="text-accent/60 text-xs" />
                        <span>{publication.citations} citations</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-1 text-accent flex-shrink-0">
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
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
            <div className="px-6 pb-6 pt-0 border-t border-white/5">
              <div className="space-y-3 mt-4">
                <div>
                  <p className="text-xs text-text-muted/60 uppercase tracking-wider mb-1">Authors</p>
                  <p className="text-text-muted">{publication.authors.join(', ')}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted/60 uppercase tracking-wider mb-1">Venue</p>
                  <p className="text-text font-medium">{publication.venue}</p>
                </div>
                <div>
                  <a 
                    href={publication.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt size={12} />
                    <span>View Publication</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Publications = () => {
  return (
    <section id="publications" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Publications
            </h2>
            <div className="h-1 w-20 bg-accent mx-auto rounded-full" />
          </div>

          <div className="space-y-6">
            {resumeData.publications.map((pub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <PublicationCard publication={pub} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Publications;
