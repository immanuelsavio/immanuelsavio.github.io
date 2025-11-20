import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import resumeData from '../data/resume.json';

const Footer = () => {
  return (
    <footer className="bg-secondary py-10 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-8 mb-8">
          <a 
            href={resumeData.contact.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors transform hover:-translate-y-1"
          >
            <FaGithub size={24} />
          </a>
          <a 
            href={resumeData.contact.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors transform hover:-translate-y-1"
          >
            <FaLinkedin size={24} />
          </a>
          <a 
            href={`mailto:${resumeData.contact.email}`}
            className="text-text-muted hover:text-accent transition-colors transform hover:-translate-y-1"
          >
            <FaEnvelope size={24} />
          </a>
        </div>
        
        <p className="text-text-muted font-mono text-sm">
          Designed & Built by {resumeData.name}
        </p>
        <p className="text-text-muted/50 text-xs mt-2">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
