import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import resumeData from '../data/resume.json';

const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-text mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1.5 bg-accent rounded-full mx-auto mb-8"></div>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
            {/* Email */}
            <motion.a
              href={`mailto:${resumeData.contact.email}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-secondary/30 p-6 rounded-xl border border-secondary hover:border-accent/50 transition-all group text-center"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <FaEnvelope className="text-accent text-xl" />
              </div>
              <h3 className="text-text font-bold mb-1">Email</h3>
              <p className="text-text-muted text-sm break-all">{resumeData.contact.email}</p>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href={resumeData.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-secondary/30 p-6 rounded-xl border border-secondary hover:border-accent/50 transition-all group text-center"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <FaLinkedin className="text-accent text-xl" />
              </div>
              <h3 className="text-text font-bold mb-1">LinkedIn</h3>
              <p className="text-text-muted text-sm">Connect with me</p>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href={resumeData.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-secondary/30 p-6 rounded-xl border border-secondary hover:border-accent/50 transition-all group text-center"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <FaGithub className="text-accent text-xl" />
              </div>
              <h3 className="text-text font-bold mb-1">GitHub</h3>
              <p className="text-text-muted text-sm">Check out my work</p>
            </motion.a>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-secondary/30 p-8 rounded-xl border border-secondary"
          >
            <h3 className="text-2xl font-bold text-text mb-6">Send a Message</h3>
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-primary border border-secondary rounded-lg focus:outline-none focus:border-accent transition-colors text-text"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-primary border border-secondary rounded-lg focus:outline-none focus:border-accent transition-colors text-text"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  required
                  className="w-full px-4 py-3 bg-primary border border-secondary rounded-lg focus:outline-none focus:border-accent transition-colors text-text resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-dark text-primary font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
