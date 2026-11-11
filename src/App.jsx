import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';

// Hooks
import { useTheme } from './hooks/useTheme';
import { useSound } from './hooks/useSound';

// Interactive Overlays (always needed — not lazy)
import CustomCursor from './components/interactive/CustomCursor';
import CommandPalette from './components/interactive/CommandPalette';
import ErrorBoundary from './components/ui/ErrorBoundary';

// Critical above-fold sections (eager)
import Preloader from './components/sections/Preloader';
import Navbar from './components/sections/Navbar';
import Hero from './components/sections/Hero';

// Below-fold sections — code-split & lazy
const AIChatWidget    = lazy(() => import('./components/interactive/AIChatWidget'));
const EasterEgg       = lazy(() => import('./components/interactive/EasterEgg'));
const About           = lazy(() => import('./components/sections/About'));
const BentoGrid       = lazy(() => import('./components/sections/BentoGrid'));
const TechStack       = lazy(() => import('./components/sections/TechStack'));
const Projects        = lazy(() => import('./components/sections/Projects'));
const Experience      = lazy(() => import('./components/sections/Experience'));
const Services        = lazy(() => import('./components/sections/Services'));
const Process         = lazy(() => import('./components/sections/Process'));
const Certificates    = lazy(() => import('./components/sections/Certificates'));
const Testimonials    = lazy(() => import('./components/sections/Testimonials'));
const GitHubStats     = lazy(() => import('./components/sections/GitHubStats'));
const FAQ             = lazy(() => import('./components/sections/FAQ'));
const Contact         = lazy(() => import('./components/sections/Contact'));
const Footer          = lazy(() => import('./components/sections/Footer'));

// Minimal fallback — no layout shift
const SectionFallback = () => <div style={{ minHeight: '200px' }} aria-hidden="true" />;

function AppContent() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const { theme, toggleTheme, setTheme } = useTheme();
  const { isMuted, toggleSound } = useSound();

  return (
    <div className="portfolio-app-root">
      {/* Background Atmosphere Layers */}
      <div className="app-atmosphere">
        <div className="aurora-layer" />
        <div className="grid-mesh-overlay" />
      </div>
      <div className="spotlight-glow" />
      <div className="noise-overlay" />

      {/* Preloader Curtain Reveal */}
      <AnimatePresence>
        {!preloaderDone && (
          <Preloader onComplete={() => setPreloaderDone(true)} />
        )}
      </AnimatePresence>

      {/* Interactive Global Elements */}
      <CustomCursor />

      <Suspense fallback={null}>
        <EasterEgg />
        <AIChatWidget />
      </Suspense>

      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={(shouldOpen) => setCommandPaletteOpen(typeof shouldOpen === 'boolean' ? shouldOpen : false)}
        theme={theme}
        toggleTheme={toggleTheme}
        setTheme={setTheme}
        isMuted={isMuted}
        toggleSound={toggleSound}
      />

      {/* Floating Pill Navbar */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Main Sections */}
      <main id="main-content" tabIndex="-1">
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <BentoGrid />
          <TechStack />
          <Projects />
          <Experience />
          <Services />
          <Process />
          <Certificates />
          <Testimonials />
          <GitHubStats />
          <FAQ />
          <Contact />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<SectionFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  );
}
