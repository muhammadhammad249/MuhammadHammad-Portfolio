import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun, FaGithub } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const applyTheme = (themeType) => {
    // Remove both classes first
    document.body.classList.remove('theme-light', 'theme-dark');
    // Add the appropriate class
    if (themeType === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.add('theme-dark');
    }
  };

  const setLightTheme = () => {
    setTheme('light');
    applyTheme('light');
    localStorage.setItem('theme', 'light');
  };

  const setDarkTheme = () => {
    setTheme('dark');
    applyTheme('dark');
    localStorage.setItem('theme', 'dark');
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="logo" onClick={() => window.scrollTo(0, 0)}>
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
            <button
              type="button"
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={setLightTheme}
              title="Light Mode"
              aria-pressed={theme === 'light'}
              aria-label="Switch to light mode"
            >
              <FaSun />
            </button>
            <button
              type="button"
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={setDarkTheme}
              title="Dark Mode"
              aria-pressed={theme === 'dark'}
              aria-label="Switch to dark mode"
            >
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
};

export default Navbar;
