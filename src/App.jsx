import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import CTA from './components/CTA';
import Footer from './components/Footer';
import ParticulasBG from "./components/ParticulasBG";

function App() {
  return (
    <div className="App">
      <ParticulasBG /> {/* partículas de fundo */}
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <CTA />
      <Footer />
    </div>
  );
}


export default App;
