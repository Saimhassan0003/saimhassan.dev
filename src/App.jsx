import React from 'react';
import MagneticCursor from './components/MagneticCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Services from './components/Services';
import Projects from './components/Projects';
import ProcessTimeline from './components/ProcessTimeline';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <MagneticCursor />
      <Navbar />
      <Hero />
      <TrustSection />
      <Services />
      <Projects />
      <ProcessTimeline />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
