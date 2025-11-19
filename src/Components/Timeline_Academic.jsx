// src/Components/Timeline_Academic.jsx
import React from 'react';
import { motion } from 'framer-motion';
import IndianaLogo from '../assets/Indiana.png';
import ManipalLogo from '../assets/Manipal.png';

const academic = [
  {
    title: 'Indiana University Bloomington',
    logo: IndianaLogo,
    period: 'Aug 2021 – Dec 2022',
    desc: 'M.S. in Data Science. Courses: AI, Computer Vision, Advanced Databases.',
  },
  {
    title: 'Manipal University',
    logo: ManipalLogo,
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
          {/* Optional dot + line */}
          <span className="absolute -left-8 top-6 w-3 h-3 bg-purple-600 rounded-full"></span>

          <div className="flex items-center space-x-4 mb-2">
            <img
              src={item.logo}
              alt={`${item.title} logo`}
              className="w-10 h-10 object-contain rounded"
            />
            <h3 className="text-2xl font-semibold">{item.title}</h3>
          </div>

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
