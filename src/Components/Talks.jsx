import React from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import SectionHeading from './SectionHeading';

const Talks = () => {
  return (
    <section id="talks" className="py-20">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          number="07"
          title="Professional Talks"
          subtitle="Sharing knowledge and insights at conferences and events."
        />

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-secondary/20 p-8 rounded-lg border border-white/6 border-t-2 border-t-accent/25 hover:border-t-accent/50 transition-all"
          >
            <div className="mb-6">
              <h3 className="text-xl font-heading font-semibold text-text mb-4">AI4 2024</h3>
              <div className="flex flex-wrap gap-4 text-text-muted mb-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-accent/70" />
                  <span>Las Vegas, NV</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-accent/70" />
                  <span>2024</span>
                </div>
              </div>
            </div>

            <div className="relative w-full rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/2Ika2I8Jxl4"
                title="AI4 2024 Talk - Las Vegas, NV"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-6">
              <a
                href="https://youtu.be/2Ika2I8Jxl4"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/70 transition-colors font-medium"
              >
                <FaYoutube size={20} />
                <span>Watch on YouTube</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Talks;
