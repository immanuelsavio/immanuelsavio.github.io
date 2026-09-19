import Hero from '../sections/Hero';
import Marquee from '../sections/Marquee';
import About from '../sections/About';
import Experience from '../sections/Experience';
import Work from '../sections/Work';
import Skills from '../sections/Skills';
import Research from '../sections/Research';
import Talks from '../sections/Talks';
import Writing from '../sections/Writing';
import Contact from '../sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Work />
      <Skills />
      <Research />
      <Talks />
      <Writing />
      <Contact />
    </>
  );
}
