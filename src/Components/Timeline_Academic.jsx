// src/Components/Timeline_Academic.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap } from 'react-icons/fa';

const academic = [
  {
    title: 'Indiana University Bloomington',
    icon: <FaGraduationCap className="text-cyan-500" />,
    period: 'Aug 2021 – Dec 2022',
    desc: 'M.S. in Data Science. Courses: AI, Computer Vision, Advanced Databases.',
  },
  {
    title: 'Manipal University',
    icon: <FaGraduationCap className="text-purple-500" />,
    period: 'Aug 2016 – May 2020',
    desc: 'B.Tech in Computer Science. Courses: Deep Learning, Soft Computing, Databases.',
  },
];

const TimelineAcademic = () => (
  <section
    id="Education"
    className="bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-6 lg:px-16 pt-16 pb-16"
  >
    <motion.h2
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-4xl lg:text-6xl font-bold text-center"
    >
      Education
    </motion.h2>

    <div className="mt-12 space-y-12 max-w-4xl mx-auto">
      {academic.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ x: idx % 2 === 0 ? -50 : 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 * idx }}
          className="relative bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg border-l-4 border-purple-600"
        >
          <div className="absolute -left-8 top-6 bg-white dark:bg-gray-800 p-2 rounded-full shadow">
            {item.icon}
          </div>
          <h3 className="text-2xl font-semibold">{item.title}</h3>
          <time className="text-sm text-gray-500 dark:text-gray-400">
            {item.period}
          </time>
          <p className="mt-2 text-justify">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default TimelineAcademic;
