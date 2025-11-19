import React from 'react';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Experience from './Components/Experience';
import Projects from './Components/Projects';
import Skills from './Components/Skills';
import EducationPublications from './Components/EducationPublications';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="bg-primary min-h-screen text-text selection:bg-accent selection:text-primary">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <EducationPublications />
      </main>
      <Footer />
    </div>
  );
}

export default App;
