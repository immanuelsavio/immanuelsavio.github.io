import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import { motion } from 'framer-motion';
import Navbar from './Components/Navbar';
import HomePage from './Components/HomePage';
import Playground from './Components/Playground/Playground';
import JsonToToon from './Components/Playground/JsonToToon';
import Blog from './Components/Blog/Blog';
import BlogPost from './Components/Blog/BlogPost';
import Footer from './Components/Footer';
import Background from './Components/Background';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="bg-primary min-h-screen text-text selection:bg-accent selection:text-primary flex flex-col relative transition-colors duration-300">
        <Background />
        <BrowserRouter>
          <Navbar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <motion.main 
            className="flex-grow"
            initial={false}
            animate={{ 
              paddingLeft: isSidebarOpen && window.innerWidth >= 768 ? "20rem" : "0" 
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/playground/json-to-toon" element={<JsonToToon />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </motion.main>
          <motion.div
             initial={false}
             animate={{ 
               paddingLeft: isSidebarOpen && window.innerWidth >= 768 ? "20rem" : "0" 
             }}
             transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Footer />
          </motion.div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
