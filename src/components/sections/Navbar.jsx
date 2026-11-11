import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaFire, FaVolumeUp, FaVolumeMute, FaSearch, FaBars, FaTimes, FaGithub, FaLinkedin } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Bento', href: '#bento' },
  { label: 'Projects', href: '#projects' },
  { label: 'Tech Stack', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({
  theme,
  toggleTheme,
  isMuted,
  toggleSound,
  onOpenCommandPalette
}) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { playClick, playWhoosh } = useSound();

  // Scroll detection & active section indicator
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'bento', 'projects', 'skills', 'experience', 'services', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
        <nav className="navbar-pill glass-panel" aria-label="Main Navigation">
          {/* Brand Monogram */}
          <button className="nav-brand" onClick={scrollToTop} aria-label="Muhammad Hammad Home">
            <span className="brand-monogram">MH</span>
            <span className="brand-status-dot" title="Available for hire"></span>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {NAV_LINKS.map((link) => {
              const secId = link.href.replace('#', '');
              const isActive = activeSection === secId;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        className="nav-active-pill"
                        layoutId="activePill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Controls */}
          <div className="nav-actions">
            {/* Command Palette Trigger */}
            <button
              className="nav-ctrl-btn nav-cmd-btn"
              onClick={() => {
                playClick();
                onOpenCommandPalette();
              }}
              title="Command Palette (Ctrl+K)"
              aria-label="Open Command Palette"
            >
              <FaSearch className="ctrl-icon" />
              <span className="cmd-shortcut-tag">⌘K</span>
            </button>

            {/* Sound FX Toggle */}
            <button
              className="nav-ctrl-btn"
              onClick={() => {
                toggleSound();
              }}
              title={isMuted ? 'Unmute Sound FX' : 'Mute Sound FX'}
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? <FaVolumeMute className="ctrl-icon muted" /> : <FaVolumeUp className="ctrl-icon active" />}
            </button>

            {/* Theme Toggle Button */}
            <button
              className="nav-ctrl-btn theme-toggle-btn"
              onClick={(e) => {
                playClick();
                toggleTheme(e);
              }}
              title={
                theme === 'crimson'
                  ? 'Switch to Cyber Dark Theme'
                  : theme === 'dark'
                  ? 'Switch to Clean Light Theme'
                  : 'Switch to Crimson Velvet (Red + Charcoal)'
              }
              aria-label="Toggle Color Theme"
            >
              {theme === 'crimson' ? (
                <FaMoon className="ctrl-icon moon" />
              ) : theme === 'dark' ? (
                <FaSun className="ctrl-icon sun" />
              ) : (
                <FaFire className="ctrl-icon flame" style={{ color: '#F43F5E' }} />
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              className="mobile-hamburger"
              onClick={() => {
                playWhoosh();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Glass Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              <ul className="mobile-links">
                {NAV_LINKS.map((link, idx) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35 }}
                  >
                    <a
                      href={link.href}
                      className="mobile-nav-link"
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mobile-menu-footer">
                <div className="mobile-socials">
                  <a
                    href={portfolioData.personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="mobile-social-icon"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={portfolioData.personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="mobile-social-icon"
                  >
                    <FaLinkedin />
                  </a>
                </div>

                <a
                  href={portfolioData.personal.resumeUrl}
                  className="mobile-cv-btn"
                  download="Muhammad_Hammad_Resume.pdf"
                >
                  Download CV (PDF)
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

