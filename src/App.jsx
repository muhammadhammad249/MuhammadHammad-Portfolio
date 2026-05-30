import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroAnimation from './components/IntroAnimation';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="App">
      <AnimatePresence>
        {!introFinished && (
          <IntroAnimation key="intro" onFinish={() => setIntroFinished(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introFinished && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
          >
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Resume />
            <Contact />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
