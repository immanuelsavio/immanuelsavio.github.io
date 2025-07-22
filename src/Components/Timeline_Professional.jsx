// src/Components/Timeline_Professional.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase } from 'react-icons/fa';

const jobs = [
  {
    title: 'Applied ML Scientist at W.W. Grainger',
    icon: <FaBriefcase className="text-cyan-500" />,
    period: 'Feb 2023 – Present',
    desc: 'Led LLM lead-generation pipeline, boosting conversion by 27%.',
  },
  {
    title: 'Applied ML Intern at W.W. Grainger',
    icon: <FaBriefcase className="text-purple-500" />,
    period: 'May 2022 – Aug 2022',
    desc: 'Built semi-supervised ReLU-RNN for segment prediction, raising accuracy to 78%.',
  },
  {
    title: 'Software Engineer – Research at Dell',
    icon: <FaBriefcase className="text-indigo-500" />,
    period: 'Jan 2020 – Jul 2021',
    desc: 'Created SHAP explainability system; reduced incidents by 23%.',
  },
];

const TimelineProfessional = () => (
  <section
    id="Experience"
    className="bg-slate-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-6 lg:px-16 py-32"
  >
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-4xl lg:text-6xl font-bold text-center"
    >
      Experience
    </motion.h2>

    <div className="mt-12 space-y-12 max-w-4xl mx-auto">
      {jobs.map((job, i) => (
        <motion.div
          key={i}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 * i }}
          className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-cyan-500"
        >
          <div className="absolute -left-8 top-6 bg-white dark:bg-gray-900 p-2 rounded-full shadow">
            {job.icon}
          </div>
          <h3 className="text-2xl font-semibold">{job.title}</h3>
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {job.period}
          </time>
          <p className="mt-2 text-justify">{job.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TimelineProfessional;
