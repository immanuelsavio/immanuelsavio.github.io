import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaQuoteRight, FaExternalLinkAlt } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import SectionHeading from './SectionHeading';

const PublicationCard = ({ publication }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-secondary/20 rounded-lg border border-white/6 border-t-2 border-t-accent/25 overflow-hidden cursor-pointer transition-colors hover:bg-secondary/35 ${isExpanded ? 'ring-1 ring-accent/30' : ''}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            <div className="flex items-start gap-3 mb-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-md bg-accent/10 text-accent flex items-center justify-center mt-1">
                <FaBook size={13} />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-heading font-bold text-text mb-2">{publication.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-muted">
                  <span className="text-accent font-mono tracking-wider">{publication.year}</span>
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

          <div className="mt-1 text-accent font-mono text-sm flex-shrink-0 select-none">
            {isExpanded ? '[−]' : '[+]'}
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
        <SectionHeading number="05" title="Publications" />

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
      </div>
    </section>
  );
};

export default Publications;
