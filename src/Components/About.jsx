import React from 'react';
import { motion } from 'framer-motion';
import resumeData from '../data/resume.json';
import profilePic from '../assets/About.jpeg';

const About = () => {
  return (
    <section id="about" className="py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">
            About Me
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10">
              <img
                src={profilePic}
                alt={resumeData.name}
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-accent/20"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-accent/30 rounded-2xl -z-0"></div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-text-muted text-lg leading-relaxed">
              Hey everyone, I'm Immanuel Savio—people call me Manny. I've been in the machine learning space for the last 8 years, starting all the way from Fourier transforms in MATLAB to all the LLMs we have today.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              I love making computers think and teaching them to predict the future. It's pretty wild seeing models actually work and do cool stuff in the real world.
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              Hit me up if you want to collaborate on something cool or if you just want to talk tech and AI. Always down for a good conversation. Cheers!
            </p>

            <div className="pt-6">
              <h3 className="text-2xl font-heading font-bold text-text mb-4">Quick Facts</h3>
              <ul className="space-y-3">
                <li className="flex items-start text-text-muted">
                  <span className="text-accent mr-3 mt-1">▹</span>
                  <span>Based in Chicago, Illinois</span>
                </li>
                <li className="flex items-start text-text-muted">
                  <span className="text-accent mr-3 mt-1">▹</span>
                  <span>4+ years of professional experience and over 8+ years in AI</span>
                </li>
                <li className="flex items-start text-text-muted">
                  <span className="text-accent mr-3 mt-1">▹</span>
                  <span>Always learning, always building</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
