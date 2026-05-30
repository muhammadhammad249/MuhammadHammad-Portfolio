import React, { useState, useEffect, useCallback, memo } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun, FaGithub } from 'react-icons/fa';
import './Navbar.css';

const applyTheme = (themeType) => {
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(themeType === 'light' ? 'theme-light' : 'theme-dark');
};

const Navbar = memo(() => {
  const [click, setClick] = useState(false);
  const [theme, setTheme] = useState(() => {
    // Read from localStorage at init to avoid flicker
    return localStorage.getItem('theme') || 'dark';
  });
  const [scrolled, setScrolled] = useState(false);

  // Apply theme immediately on mount without waiting for effect
  useEffect(() => {
    applyTheme(theme);
  }, []); // eslint-disable-line

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = useCallback(() => setClick(c => !c), []);
  const closeMobileMenu = useCallback(() => setClick(false), []);

  const setLightTheme = useCallback(() => {
    setTheme('light');
    applyTheme('light');
    localStorage.setItem('theme', 'light');
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme('dark');
    applyTheme('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo" onClick={scrollToTop}>
          <span className="bracket">&lt;</span>
          Hammad
          <span className="bracket">/&gt;</span>
        </div>

        <ul className={`nav-menu ${click ? 'active' : ''}`}>
          <li><a href="#home" className="nav-link" onClick={closeMobileMenu}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={closeMobileMenu}>About</a></li>
          <li><a href="#projects" className="nav-link" onClick={closeMobileMenu}>Projects</a></li>
          <li><a href="#resume" className="nav-link nav-resume" onClick={closeMobileMenu}>Resume</a></li>
          <li><a href="#contact" className="nav-link" onClick={closeMobileMenu}>Contact</a></li>
        </ul>

        <div className="nav-right">
          <div className="social-nav-link">
            <a href="https://github.com/muhammadhammad249" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
              <FaGithub />
            </a>
          </div>

          <div className="theme-toggle" role="group" aria-label="Theme toggle">
            <button type="button" className={`theme-btn ${theme === 'light' ? 'active' : ''}`} onClick={setLightTheme} title="Light Mode" aria-pressed={theme === 'light'} aria-label="Switch to light mode">
              <FaSun />
            </button>
            <button type="button" className={`theme-btn ${theme === 'dark' ? 'active' : ''}`} onClick={setDarkTheme} title="Dark Mode" aria-pressed={theme === 'dark'} aria-label="Switch to dark mode">
              <FaMoon />
            </button>
          </div>

          <div className={`hamburger ${click ? 'active' : ''}`} onClick={handleClick} role="button" tabIndex={0} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
