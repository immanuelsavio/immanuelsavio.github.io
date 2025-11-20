import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';
import resumeData from '../data/resume.json';

const Home = () => {
  return (
    <div className="bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-accent-dark/10 rounded-full blur-[100px] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex flex-col items-start max-w-4xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-accent font-medium tracking-wider mb-4"
            >
              Hi, my name is
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-8xl font-heading font-bold text-text mb-6 leading-tight"
            >
              {resumeData.name}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-4xl font-heading font-bold text-text-muted mb-8 h-[60px] md:h-[80px]"
            >
              <Typewriter
                options={{
                  strings: [
                    'Machine Learning Scientist',
                    'AI Engineer',
                    'Generative AI Specialist',
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                }}
              />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-text-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
            >
              I build production-scale AI solutions. Specializing in <span className="text-accent">Generative AI</span>, <span className="text-accent">LLMs</span>, and <span className="text-accent">Recommendation Systems</span>.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Link 
                to="/projects" 
                className="px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-accent/20 flex items-center gap-2"
              >
                View Projects <FaArrowRight />
              </Link>
              <a 
                href={resumeData.original_resume_pdf} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 border border-accent text-accent font-bold rounded-lg hover:bg-accent/10 transition-all flex items-center gap-2"
              >
                Resume <FaFileDownload />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Experience Preview */}
      <section className="py-20 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-text mb-2">Latest Experience</h2>
              <div className="w-20 h-1 bg-accent rounded-full"></div>
            </div>
            <Link to="/experience" className="text-accent hover:text-accent-dark flex items-center gap-2 font-medium">
              View Full Timeline <FaArrowRight />
            </Link>
          </div>

          <div className="bg-secondary/40 p-8 rounded-xl border border-secondary hover:border-accent/30 transition-all">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-text">{resumeData.experience[0].roles[0].title}</h3>
                <p className="text-accent text-lg">{resumeData.experience[0].company}</p>
              </div>
              <span className="text-text-muted font-mono mt-2 md:mt-0">{resumeData.experience[0].roles[0].dates}</span>
            </div>
            <p className="text-text-muted mb-4">{resumeData.experience[0].roles[0].location}</p>
            <ul className="space-y-2">
              {resumeData.experience[0].roles[0].highlights.slice(0, 2).map((highlight, i) => (
                <li key={i} className="flex items-start text-text-muted">
                  <span className="text-accent mr-2 mt-1">▹</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-text mb-2">Featured Projects</h2>
              <div className="w-20 h-1 bg-accent rounded-full"></div>
            </div>
            <Link to="/projects" className="text-accent hover:text-accent-dark flex items-center gap-2 font-medium">
              View All Projects <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resumeData.projects.slice(0, 2).map((project, index) => (
              <div key={index} className="bg-secondary/30 p-8 rounded-xl border border-secondary hover:border-accent/30 transition-all hover:-translate-y-2">
                <h3 className="text-xl font-bold text-text mb-2">{project.title}</h3>
                <p className="text-accent text-sm font-mono mb-4">{project.dates}</p>
                <ul className="space-y-2">
                  {project.highlights.slice(0, 2).map((highlight, i) => (
                    <li key={i} className="text-text-muted text-sm flex items-start">
                      <span className="text-accent mr-2 mt-1">▹</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Marquee/Preview */}
      <section className="py-20 bg-secondary/20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <h2 className="text-3xl font-heading font-bold text-text mb-2 text-center">Core Technologies</h2>
          <div className="w-20 h-1 bg-accent rounded-full mx-auto"></div>
        </div>
        
        <div className="flex overflow-hidden space-x-8 group">
          <div className="flex space-x-8 animate-marquee whitespace-nowrap">
            {resumeData.profile_summary.languages_frameworks.concat(resumeData.profile_summary.platforms_tools).map((skill, index) => (
              <span key={index} className="text-2xl font-bold text-text-muted/50 hover:text-accent transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
          <div className="flex space-x-8 animate-marquee whitespace-nowrap" aria-hidden="true">
            {resumeData.profile_summary.languages_frameworks.concat(resumeData.profile_summary.platforms_tools).map((skill, index) => (
              <span key={index} className="text-2xl font-bold text-text-muted/50 hover:text-accent transition-colors cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
