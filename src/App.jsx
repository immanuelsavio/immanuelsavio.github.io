import Navbar from './Components/Navbar';
import Home from './Components/Home';
import About from './Components/About';
import TimelineAcademic from './Components/Timeline_Academic';
import TimelineProfessional from './Components/Timeline_Professional';
import Projects from './Components/Projects';
import Contact from './Components/Contact';

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <About />
      <TimelineAcademic />
      <TimelineProfessional />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
