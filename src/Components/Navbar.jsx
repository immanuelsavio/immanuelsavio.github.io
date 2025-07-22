// src/Components/Navbar.jsx
import React, { useState, useEffect } from 'react';

const pages = ['Home', 'About', 'Education', 'Experience', 'Projects', 'Contact'];

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  // Highlight nav link on scroll
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const onScroll = () => {
      let curr = 'Home';
      sections.forEach(sec => {
        const top = sec.offsetTop;
        const h = sec.clientHeight;
        if (window.scrollY >= top - h / 3) curr = sec.id;
      });
      setCurrentPage(curr);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-gray-900/80">
      <div className="w-full max-w-7xl mx-auto px-6 py-4">
        <ul className="flex justify-between w-full text-lg md:text-xl font-medium text-gray-300">
          {pages.map((p) => (
            <li key={p} className="flex-1 text-center">
              <a
                href={`#${p}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(p)?.scrollIntoView({ behavior: 'smooth' });
                  setCurrentPage(p);
                }}
                className={`
                  relative inline-block px-2 py-1 transition-all
                  ${
                    currentPage === p
                      ? 'text-white before:absolute before:-bottom-1 before:left-0 before:w-full before:h-0.5 before:bg-purple-500'
                      : 'hover:text-white hover:before:absolute hover:before:-bottom-1 hover:before:left-0 hover:before:w-full hover:before:h-0.5 hover:before:bg-gray-300'
                  }
                `}
              >
                {p}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
