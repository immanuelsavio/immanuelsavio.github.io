import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExchangeAlt, FaCode, FaTools } from 'react-icons/fa';

const Playground = () => {
  const tools = [
    {
      id: 'json-to-toon',
      title: 'JSON to TOON',
      description: 'Convert standard JSON data into the compact TOON format for easier readability and editing.',
      icon: <FaExchangeAlt className="text-4xl text-accent" />,
      path: '/playground/json-to-toon',
      color: 'from-accent/20 to-accent/5'
    },
    // Future tools can be added here
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl font-heading font-bold text-text mb-4">Playground</h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            A collection of small tools, experiments, and utilities I've built.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={item}>
              <Link to={tool.path} className="block h-full">
                <div className={`h-full bg-gradient-to-br ${tool.color} border border-secondary hover:border-accent/50 rounded-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/10 group`}>
                  <div className="mb-6 bg-primary/50 w-16 h-16 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-accent transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Placeholder for 'Coming Soon' */}
          <motion.div variants={item}>
            <div className="h-full bg-secondary/10 border border-secondary/50 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity">
              <div className="mb-4 text-text-muted">
                <FaTools className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold text-text-muted mb-2">More Coming Soon</h3>
              <p className="text-sm text-text-muted/70">
                I'm always building new things. Check back later!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Playground;
