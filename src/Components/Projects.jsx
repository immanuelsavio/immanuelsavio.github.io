// src/Components/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'NeuroCognitive AI',
    desc: 'Modular agents for reasoning & creativity using LLMs + GANs.',
    date: 'June 2025',
    tags: ['React', 'TensorFlow', 'GAN', 'LLM'],
    url: '#',
  },
  {
    title: 'Sales Trigger System',
    desc: 'Real‑time ML triggers for lead scoring & outreach.',
    date: 'Dec 2024',
    tags: ['Python', 'Snowflake', 'AWS Lambda'],
    url: '#',
  },
];

const Projects = () => (
  <section
    id="Projects"
    className="bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 lg:px-16 py-32"
  >
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-4xl lg:text-6xl font-bold text-center"
    >
      Projects
    </motion.h2>

    <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2">
      {projects.map((p, i) => (
        <motion.a
          key={i}
          href={p.url}
          className="group relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow hover:shadow-lg transition-transform transform hover:-translate-y-1"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 * i }}
        >
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent group-hover:text-white transition-colors">
            {p.title}
          </h3>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            {p.desc}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map(tag => (
              <span
                key={tag}
                className="text-xs bg-slate-200 dark:bg-gray-700 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <time className="block mt-4 text-xs text-gray-500 dark:text-gray-400">
            {p.date}
          </time>
        </motion.a>
      ))}
    </div>
  </section>
);

export default Projects;
