import React from 'react';
import { motion } from 'framer-motion';
import { FaYoutube, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const Talks = () => {
  return (
    <section id="talks" className="py-20 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">
            Professional Talks
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full mb-8"></div>
          <p className="text-text-muted text-lg max-w-2xl">
            Sharing knowledge and insights at conferences and events.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-secondary/30 p-8 rounded-xl border border-secondary hover:border-accent/30 transition-all"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-text mb-4">AI4 2024</h3>
              <div className="flex flex-wrap gap-4 text-text-muted mb-4">
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-accent" />
                  <span>Las Vegas, NV</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-accent" />
                  <span>2024</span>
                </div>
              </div>
            </div>

            {/* YouTube Video Embed */}
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-lg"
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
                className="inline-flex items-center gap-2 text-accent hover:text-accent-dark transition-colors font-medium"
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
