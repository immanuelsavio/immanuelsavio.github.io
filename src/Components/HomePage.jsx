import React from 'react';
import Hero from './Hero';
import About from './About';
import Experience from './Experience';
import Skills from './Skills';
import Education from './Education';
import Publications from './Publications';
import Patents from './Patents';
import Talks from './Talks';
import Contact from './Contact';

const HomePage = () => {
  return (
    <>
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="experience"><Experience /></div>
      <div id="education"><Education /></div>
      <div id="skills"><Skills /></div>
      <div id="publications">
        <Publications />
        <Patents />
      </div>
      <div id="talks"><Talks /></div>
      <div id="contact"><Contact /></div>
    </>
  );
};

export default HomePage;
