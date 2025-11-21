import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaMedium, FaExternalLinkAlt, FaArrowRight, FaCalendarAlt, FaTag } from 'react-icons/fa';
import blogData from '../../data/blog.json';
import gitImage from '../../assets/git.webp';
import aiGuardiansImage from '../../assets/ai_guardians.webp';

const Blog = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const imageMap = {
    'git-zero-to-hero': gitImage,
    'ai-guardians': aiGuardiansImage,
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500">
          Thoughts & Articles
        </h1>
        <p className="text-xl text-text-muted max-w-2xl mx-auto">
          A collection of my writings on technology, AI, and development.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {blogData.map((post) => (
          <motion.div
            key={post.id}
            variants={cardVariants}
            className="group relative bg-secondary/30 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 flex flex-col h-full cursor-pointer"
            onClick={() => post.type === 'external' ? window.open(post.link, '_blank') : navigate(post.link)}
          >
            {/* Image */}
            <div className="h-48 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src={imageMap[post.id] || post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 right-4 z-20">
                {post.type === 'external' ? (
                  <span className="bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <FaMedium /> Medium
                  </span>
                ) : (
                  <span className="bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                    Blog
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-4 text-xs text-text-muted mb-3">
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-accent/10 text-accent px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-text-muted text-sm mb-6 line-clamp-3 flex-grow">
                {post.description}
              </p>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                <span className="flex items-center gap-2 text-xs text-text-muted font-medium">
                  <FaCalendarAlt /> {post.date}
                </span>

                {post.type === 'external' ? (
                  <span 
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                  >
                    Read on Medium <FaExternalLinkAlt size={12} />
                  </span>
                ) : (
                  <span 
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                  >
                    Read Article <FaArrowRight size={12} />
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Blog;
