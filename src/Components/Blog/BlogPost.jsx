import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendarAlt, FaTag } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import blogData from '../../data/blog.json';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogData.find(p => p.link === `/blog/${slug}`);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Link to="/blog" className="text-accent hover:underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
    >
      <Link to="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-accent mb-8 transition-colors">
        <FaArrowLeft /> Back to Articles
      </Link>

      <article className="prose prose-lg dark:prose-invert max-w-none">
        {/* Header */}
        <div className="mb-8 border-b border-secondary pb-8">
          <div className="flex items-center gap-4 text-sm text-text-muted mb-4">
            <span className="flex items-center gap-2"><FaCalendarAlt /> {post.date}</span>
            <div className="flex gap-2">
              {post.tags.map(tag => (
                <span key={tag} className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            {post.title}
          </h1>

          {post.image && (
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-8"
            />
          )}
        </div>

        {/* Content */}
        <div className="markdown-content">
          <ReactMarkdown
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mt-8 mb-4 text-accent" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-text-muted" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-text-muted" {...props} />,
              a: ({node, ...props}) => {
                const isButton = props.href === '/playground/json-to-toon';
                if (isButton) {
                  return (
                    <Link 
                      to={props.href} 
                      className="inline-block mt-4 px-8 py-4 bg-accent text-primary font-bold rounded-lg hover:bg-accent-dark transition-all transform hover:-translate-y-1 shadow-lg shadow-accent/20 no-underline"
                    >
                      {props.children}
                    </Link>
                  );
                }
                return <a className="text-accent hover:underline" {...props} />;
              },
              code: ({node, inline, className, children, ...props}) => {
                return inline ? (
                  <code className="bg-secondary/50 px-1 py-0.5 rounded text-sm font-mono text-accent" {...props}>
                    {children}
                  </code>
                ) : (
                  <div className="bg-secondary/30 p-4 rounded-lg overflow-x-auto mb-6 border border-white/5">
                    <code className="text-sm font-mono" {...props}>
                      {children}
                    </code>
                  </div>
                )
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </motion.div>
  );
};

export default BlogPost;
