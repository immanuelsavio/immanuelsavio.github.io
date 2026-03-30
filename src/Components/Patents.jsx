import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';
import resumeData from '../data/resume.json';
import SectionHeading from './SectionHeading';

const Patents = () => {
  return (
    <section className="py-20 bg-primary pt-28">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="06"
          title="Patents"
          subtitle="Innovations and intellectual property developed during my professional career."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {resumeData.authorized_patents.map((patent, index) => (
            <motion.a
              key={index}
              href={patent.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/20 p-8 rounded-lg border border-white/6 border-t-2 border-t-accent/30 hover:border-t-accent/60 transition-all duration-300 group relative overflow-hidden cursor-pointer block"
            >
              <div className="absolute top-0 right-0 p-6 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                <FaLightbulb size={100} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded-md text-xs font-mono uppercase tracking-wider ${
                    patent.status === 'Granted' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {patent.status}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-text mb-3 group-hover:text-accent transition-colors">
                  {patent.title}
                </h3>

                <div className="flex flex-col gap-1 mb-6">
                  <p className="text-accent font-mono text-sm">{patent.organization}</p>
                  <p className="text-text-muted text-sm">{patent.date}</p>
                  <p className="text-text-muted/60 text-xs font-mono tracking-wider">{patent.patent_number}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Patents;
