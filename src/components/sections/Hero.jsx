import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaArrowRight, FaFileDownload, FaCode, FaCheckCircle, FaLaptopCode } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';
import profilePhoto from '../../assets/profile-real.jpg';
import './Hero.css';

// Magnetic Button with 3D Spring
function MagneticButton({ children, href, className = '', download = false, target = '_self', onClick }) {
  const btnRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 15, stiffness: 180 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.25);
    y.set((e.clientY - centerY) * 0.25);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={btnRef}
      href={href}
      className={`btn-magnetic ${className}`}
      download={download}
      target={target}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
      <span className="btn-shine-bar" />
    </motion.a>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { playClick } = useSound();
  const roles = portfolioData.personal.roles;

  // Kinetic role switcher
  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Hero Content */}
        <div className="hero-content">
          {/* Availability pill badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge-pulse-dot" />
            <span className="badge-text">{portfolioData.personal.availability.status}</span>
            <span className="badge-sep">•</span>
            <span className="badge-location">{portfolioData.personal.location.label}</span>
          </motion.div>

          {/* Kinetic Headline */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Engineering <span className="gradient-text">high-performance</span> web experiences with bespoke precision.
          </motion.h1>

          {/* Role Switcher */}
          <motion.div
            className="hero-role-wrapper"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="role-prefix">Specializing in:</span>
            <div className="role-slider">
              <motion.span
                key={roleIndex}
                className="role-text gradient-text-alt"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                {roles[roleIndex]}
              </motion.span>
            </div>
          </motion.div>

          {/* Subtitle description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {portfolioData.personal.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <MagneticButton
              href="#projects"
              className="btn-primary-glow"
              onClick={() => playClick()}
            >
              <span>Explore Projects</span>
              <FaArrowRight className="btn-icon" />
            </MagneticButton>

            <MagneticButton
              href={portfolioData.personal.resumeUrl}
              className="btn-secondary-glass"
              download="Muhammad_Hammad_Resume.pdf"
              onClick={() => playClick()}
            >
              <FaFileDownload className="btn-icon" />
              <span>Download CV</span>
            </MagneticButton>
          </motion.div>

          {/* Quick Metrics Ticker */}
          <motion.div
            className="hero-metrics-strip"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="metric-box">
              <span className="metric-value">17+</span>
              <span className="metric-label">Shipped Projects</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-value">3</span>
              <span className="metric-label">Tech Internships</span>
            </div>
            <div className="metric-divider" />
            <div className="metric-box">
              <span className="metric-value">99+</span>
              <span className="metric-label">Lighthouse Target</span>
            </div>
          </motion.div>
        </div>

        {/* Right 3D Visual & Atmospheric Card */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Main 3D Card */}
          <div className="hero-glass-card glass-panel">
            <div className="hero-card-glow-mesh" />

            <div className="hero-card-header">
              <div className="window-dots">
                <span className="dot dot-red" />
                <span className="dot dot-amber" />
                <span className="dot dot-green" />
              </div>
              <span className="window-filename">hammad.config.ts</span>
              <span className="window-badge">PROD</span>
            </div>

            {/* Profile Avatar & Details */}
            <div className="hero-avatar-row">
              <div className="hero-avatar-frame">
                <img
                  src={profilePhoto}
                  alt="Muhammad Hammad"
                  width="88"
                  height="88"
                  loading="eager"
                  className="hero-avatar-img"
                />
                <span className="avatar-online-indicator" />
              </div>
              <div className="hero-avatar-meta">
                <h3 className="avatar-name">{portfolioData.personal.name}</h3>
                <p className="avatar-title">{portfolioData.personal.title}</p>
                <div className="avatar-chips">
                  <span className="tech-chip">React.js</span>
                  <span className="tech-chip">Next.js 14</span>
                  <span className="tech-chip">TypeScript</span>
                </div>
              </div>
            </div>

            {/* Code Snippet in JetBrains Mono */}
            <div className="hero-code-block">
              <div className="code-line">
                <span className="code-keyword">const</span> <span className="code-var">developer</span> = &#123;
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">name:</span> <span className="code-str">"{portfolioData.personal.name}"</span>,
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">education:</span> <span className="code-str">"Superior University (BS CS)"</span>,
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">status:</span> <span className="code-bool">"Available for Full-time / Remote"</span>,
              </div>
              <div className="code-line code-indent">
                <span className="code-prop">focus:</span> [<span className="code-str">"Awwwards UI"</span>, <span className="code-str">"Scalable APIs"</span>]
              </div>
              <div className="code-line">&#125;;</div>
            </div>

            {/* Floating glass micro-bubbles */}
            <motion.div
              className="hero-floating-badge badge-1"
              animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaLaptopCode className="badge-icon" />
              <span>Full Stack Ready</span>
            </motion.div>

            <motion.div
              className="hero-floating-badge badge-2"
              animate={{ y: [8, -8, 8], rotate: [2, -2, 2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <FaCheckCircle className="badge-icon-green" />
              <span>3x Internships Completed</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

