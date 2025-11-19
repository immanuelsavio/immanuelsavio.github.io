// src/Components/About.jsx
import React, { useState, useEffect } from 'react';
import { motion }         from 'framer-motion';
import Marquee            from 'react-fast-marquee';
import { useMediaQuery }  from 'react-responsive';

import airflowIcon        from '../assets/airflow.svg';

function About() {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 640px)' });
  const [speed, setSpeed] = useState(60);

  useEffect(() => {
    setSpeed(isSmallScreen ? 30 : 60);
  }, [isSmallScreen]);

  const techStack = [
    { src: 'https://www.vectorlogo.zone/logos/python/python-icon.svg',         label: 'Python' },
    { src: 'https://www.vectorlogo.zone/logos/mysql/mysql-icon.svg',           label: 'SQL' },
    { src: 'https://www.vectorlogo.zone/logos/pytorch/pytorch-icon.svg',       label: 'PyTorch' },
    { src: 'https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg', label: 'TensorFlow' },
    { src: 'http://bit.ly/4kNTcC0',label: 'HuggingFace' },
    { src: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg', label: 'GCP' },
    { src: 'https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-icon.svg',  label: 'AWS' },
    { src: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',  label: 'Kubernetes' },
    { src: 'https://www.vectorlogo.zone/logos/docker/docker-icon.svg',         label: 'Docker' },
    { src: 'https://www.vectorlogo.zone/logos/snowflake/snowflake-icon.svg',   label: 'Snowflake' },
    { src: airflowIcon,        label: 'Airflow' },
    { src: 'https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg',       label: 'MongoDB' },
  ];

  return (
    <section
      id="About"
      className="bg-white dark:bg-black text-gray-900 dark:text-white px-6 lg:px-16 pt-20 pb-12"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl lg:text-6xl font-bold text-center"
      >
        <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
          Who am I?
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto mt-6 text-lg text-justify"
      >
        Hey there!
        I’m Immanuel, a total data nerd who’s spent the last 8 years bringing AI ideas to life. I love turning messy numbers into “aha” moments, 
        streamlining complex ML pipelines, and building interfaces that people actually enjoy using. Let’s make something awesome together!
      </motion.p>

      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 text-3xl lg:text-5xl font-bold text-center"
      >
        Tech Stack
      </motion.h3>
      <div className="mt-6">
        <Marquee pauseOnHover speed={speed}>
          {techStack.map((tech, idx) => (
            <div key={idx} className="mx-8 flex flex-col items-center">
              <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center shadow">
                <img src={tech.src} alt={tech.label} className="h-10 w-10" />
              </div>
              <p className="mt-2 text-xs sm:text-sm">{tech.label}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export default About;
