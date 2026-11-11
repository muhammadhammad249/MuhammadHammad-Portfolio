import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaCheckCircle, FaAward } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import profilePhoto from '../../assets/profile-real.jpg';
import './About.css';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">01 / Narrative & Foundation</span>
          <h2 className="section-title">
            Engineering with purpose, <span className="gradient-text">designing with soul.</span>
          </h2>
          <p className="section-subtitle">
            Bridging technical depth with visual artistry to architect web experiences that perform under pressure.
          </p>
        </div>

        {/* Content Grid */}
        <div className="about-grid">
          {/* Portrait Column */}
          <motion.div
            className="about-image-column"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="portrait-container">
              <div className="portrait-glass-frame glass-panel">
                <div className="portrait-glow-ring" />
                <img
                  src={profilePhoto}
                  alt="Muhammad Hammad — Full Stack Developer"
                  width="420"
                  height="460"
                  loading="lazy"
                  className="portrait-img"
                />
                <div className="portrait-gradient-overlay" />

                {/* Experience Badge Overlay */}
                <div className="portrait-badge">
                  <FaAward className="portrait-badge-icon" />
                  <div>
                    <span className="badge-title">3x Tech Internships</span>
                    <span className="badge-sub">IIFA Tech • Preesoft • DevTechnoz</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Narrative & Metrics Column */}
          <motion.div
            className="about-text-column"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="about-lead">
              Hi, I’m <span className="gradient-text">{portfolioData.personal.name}</span> — a Full Stack Developer & Creative UI/UX Engineer based in Pakistan.
            </h3>

            {portfolioData.personal.aboutParagraphs.map((para, idx) => (
              <p key={idx} className="about-paragraph">
                {para}
              </p>
            ))}

            {/* Feature Pills */}
            <div className="about-highlights-grid">
              <div className="about-highlight-card glass-panel">
                <FaGraduationCap className="highlight-icon" />
                <div>
                  <span className="highlight-title">Education</span>
                  <p className="highlight-desc">BS Computer Science, Superior University</p>
                </div>
              </div>

              <div className="about-highlight-card glass-panel">
                <FaMapMarkerAlt className="highlight-icon cyan" />
                <div>
                  <span className="highlight-title">Location & Time</span>
                  <p className="highlight-desc">{portfolioData.personal.location.label}</p>
                </div>
              </div>

              <div className="about-highlight-card glass-panel">
                <FaCheckCircle className="highlight-icon green" />
                <div>
                  <span className="highlight-title">Availability</span>
                  <p className="highlight-desc">{portfolioData.personal.availability.type}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

