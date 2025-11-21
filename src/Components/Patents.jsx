import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa';
import resumeData from '../data/resume.json';

const Patents = () => {
  return (
    <section className="py-20 bg-primary min-h-screen pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">
            Patents
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full mb-8 mx-auto"></div>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Innovations and intellectual property developed during my professional career.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resumeData.authorized_patents.map((patent, index) => (
            <motion.a
              key={index}
              href={patent.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/40 p-8 rounded-xl border border-secondary hover:border-accent/50 transition-all duration-300 group relative overflow-hidden cursor-pointer block"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <FaLightbulb size={100} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    patent.status === 'Granted' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {patent.status}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors">
                  {patent.title}
                </h3>
                
                <div className="flex flex-col gap-1 mb-6">
                  <p className="text-accent font-mono text-sm">{patent.organization}</p>
                  <p className="text-text-muted text-sm">{patent.date}</p>
                  <p className="text-text-muted/60 text-xs font-mono">{patent.patent_number}</p>
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
