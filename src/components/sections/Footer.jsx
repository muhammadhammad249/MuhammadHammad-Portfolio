import React from 'react';
import { FaArrowUp, FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useLiveClock } from '../../hooks/useLiveClock';
import { useSound } from '../../hooks/useSound';
import './Footer.css';

export default function Footer() {
  const liveClock = useLiveClock('Asia/Karachi');
  const { playClick } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="portfolio-footer">
      <div className="container">
        {/* Giant kinetic display wordmark */}
        <div className="footer-wordmark-container">
          <span className="footer-giant-wordmark gradient-text">
            MUHAMMAD HAMMAD
          </span>
        </div>

        {/* Middle row */}
        <div className="footer-middle-row">
          <div className="footer-col-left">
            <span className="footer-tagline">
              Full Stack Developer &amp; Creative Engineer crafting high-performance digital products.
            </span>
            <div className="footer-live-time">
              <span className="live-clock-pill">
                ● PKT {liveClock.time} {liveClock.period} ({portfolioData.personal.location.city}, Pakistan)
              </span>
            </div>
          </div>

          <div className="footer-col-right">
            <button
              className="back-to-top-btn glass-panel"
              onClick={scrollToTop}
              title="Return to top"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <FaArrowUp />
            </button>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="footer-bottom-row">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Muhammad Hammad. Engineered with React 19, Vite &amp; Framer Motion.
          </p>

          <div className="footer-social-links">
            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={portfolioData.personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href={portfolioData.personal.socials.email}
              className="footer-social-icon"
              aria-label="Email"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

