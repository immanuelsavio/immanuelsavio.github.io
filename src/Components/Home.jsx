// src/Components/Home.jsx
import React from 'react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
// import your image from the assets folder
import HeroPic from '../assets/me.png';

const Home = () => (
  <section
    id="Home"
    className="
      min-h-screen flex flex-col lg:flex-row items-center
      bg-black
      text-white
      transition-colors duration-500
    "
  >
    {/* Text Column */}
    <div className="lg:w-1/2 px-6 lg:px-16 pt-32 lg:pt-40 text-center lg:text-left">
      <motion.h3
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl lg:text-5xl"
      >
        Hi! I’m
      </motion.h3>

      <motion.h1
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-2 text-5xl lg:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
      >
        Immanuel Savio
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-4 text-xl lg:text-2xl h-8"
      >
        <Typewriter
          options={{
            strings: ['ML Engineer', 'AI Scientist', 'Data Enthusiast'],
            autoStart: true,
            loop: true,
            delay: 75,
            deleteSpeed: 50,
          }}
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="mt-8 inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full shadow-lg"
      >
        Download Resume
      </motion.button>
    </div>

    {/* Image Column */}
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center"
    >
      <img
        src={HeroPic}
        alt="Hero"
        className="w-80 lg:w-[32rem] rounded-xl shadow-lg"
      />
    </motion.div>
  </section>
);

export default Home;
