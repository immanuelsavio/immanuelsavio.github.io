import React from 'react';
import { ThemeProvider } from 'next-themes';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import About from './Components/About';
import Experience from './Components/Experience';
import Skills from './Components/Skills';
import Education from './Components/Education';
import Publications from './Components/Publications';
import Talks from './Components/Talks';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Background from './Components/Background';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <div className="bg-primary min-h-screen text-text selection:bg-accent selection:text-primary flex flex-col relative transition-colors duration-300">
        <Background />
        <Navbar />
        <main className="flex-grow">
          <div id="home"><Hero /></div>
          <div id="about"><About /></div>
          <div id="experience"><Experience /></div>
          <div id="skills"><Skills /></div>
          <div id="education"><Education /></div>
          <div id="publications"><Publications /></div>
          <div id="talks"><Talks /></div>
          <div id="contact"><Contact /></div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
