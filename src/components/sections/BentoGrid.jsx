import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaGlobeAsia, FaGithub, FaLinkedin, FaEnvelope, FaCopy, FaCheck, FaExternalLinkAlt, FaCodeBranch, FaStar, FaBolt, FaLayerGroup, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useLiveClock } from '../../hooks/useLiveClock';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import { useSound } from '../../hooks/useSound';
import { BentoCard } from './BentoCard';
import './BentoGrid.css';

export default function BentoGrid() {
  const [copied, setCopied] = useState(false);
  const liveClock = useLiveClock('Asia/Karachi');
  const githubStats = useGitHubStats('muhammadhammad249');
  const { playClick, playPop } = useSound();

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(portfolioData.personal.email);
    playPop();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="bento" className="bento-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-eyebrow">02 / Ecosystem Bento</span>
          <h2 className="section-title">
            The Developer <span className="gradient-text">Matrix</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive, real-time snapshot of my development ethos, location, live GitHub activity, and technical focus.
          </p>
        </div>

        {/* 12-Column Responsive Bento Grid */}
        <div className="bento-layout-grid">
          {/* Card 1: Main Architecture Ethos (Large 2x2) */}
          <BentoCard className="bento-card-large span-col-7 span-row-2">
            <div className="card-top-header">
              <span className="bento-badge"><FaLayerGroup /> Engineering Philosophy</span>
              <span className="bento-chip-sub">Production Ready</span>
            </div>

            <div className="bento-hero-body">
              <h3 className="bento-title-lg">
                Crafting interfaces that feel <span className="gradient-text">natural, instantaneous,</span> and visually captivating.
              </h3>
              <p className="bento-body-text">
                Every web product I build blends strict computer science fundamentals with modern creative UI techniques: responsive glassmorphism, 60fps micro-interactions, hardware-accelerated rendering, and resilient serverless backends.
              </p>

              <div className="bento-stack-tags">
                <span className="b-tag">React.js</span>
                <span className="b-tag">Next.js 14</span>
                <span className="b-tag">TypeScript</span>
                <span className="b-tag">Tailwind CSS</span>
                <span className="b-tag">Node.js</span>
                <span className="b-tag">MongoDB</span>
                <span className="b-tag">Framer Motion</span>
                <span className="b-tag">WCAG AA</span>
              </div>

              <div className="bento-quote-box">
                <FaBolt className="quote-bolt-icon" />
                <span>"Excellence isn't an accident — it's the result of high intention, sincere effort, and intelligent execution."</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Live Location & Real-Time Clock (Span Col 5) */}
          <BentoCard className="span-col-5">
            <div className="card-top-header">
              <span className="bento-badge cyan"><FaGlobeAsia /> Origin & Local Time</span>
              <span className="bento-chip-sub">{portfolioData.personal.location.code}</span>
            </div>

            <div className="bento-clock-body">
              <div className="live-clock-display">
                <span className="clock-digits">{liveClock.time}</span>
                <span className="clock-period">{liveClock.period}</span>
              </div>
              <div className="clock-sub">
                <span className="clock-date">{liveClock.date}</span>
                <span className="clock-tz">Pakistan Standard Time (UTC+5)</span>
              </div>

              <div className="location-pin-row">
                <div className="beacon-wrapper">
                  <span className="beacon-ring" />
                  <span className="beacon-center" />
                </div>
                <div>
                  <span className="location-city">Lahore, Punjab</span>
                  <span className="location-country">Pakistan (Remote Worldwide)</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Availability Indicator (Span Col 5) */}
          <BentoCard className="span-col-5">
            <div className="card-top-header">
              <span className="bento-badge green"><FaBolt /> Status</span>
              <span className="status-live-pulse-chip">Open</span>
            </div>

            <div className="availability-body">
              <div className="status-hero-row">
                <span className="status-large-dot" />
                <div>
                  <h4 className="status-heading">{portfolioData.personal.availability.status}</h4>
                  <p className="status-desc">{portfolioData.personal.availability.type}</p>
                </div>
              </div>
              <p className="availability-note">
                Ready to contribute to ambitious engineering teams, forward-thinking startups, or high-end bespoke client products.
              </p>
            </div>
          </BentoCard>

          {/* Card 4: GitHub Live Activity (Span Col 4) */}
          <BentoCard className="span-col-4">
            <div className="card-top-header">
              <span className="bento-badge"><FaGithub /> GitHub Activity</span>
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="external-icon-link"
                aria-label="View GitHub"
              >
                <FaExternalLinkAlt />
              </a>
            </div>

            <div className="github-stats-grid">
              <div className="gh-stat-box">
                <div className="gh-stat-top">
                  <FaCodeBranch className="gh-icon" />
                  <span className="gh-val">{githubStats.public_repos}</span>
                </div>
                <span className="gh-label">Public Repos</span>
              </div>

              <div className="gh-stat-box">
                <div className="gh-stat-top">
                  <FaStar className="gh-icon star" />
                  <span className="gh-val">{githubStats.stars}</span>
                </div>
                <span className="gh-label">Stars Earned</span>
              </div>
            </div>

            <div className="gh-user-banner">
              <span className="gh-handle">@muhammadhammad249</span>
              <span className="gh-commits">{githubStats.commitsThisYear} commits</span>
            </div>
          </BentoCard>

          {/* Card 5: Currently Building / "Now" Focus (Span Col 4) */}
          <BentoCard className="span-col-4">
            <div className="card-top-header">
              <span className="bento-badge amber"><FaBolt /> Currently Building / Now</span>
              <span className="bento-chip-sub">Q4 Active</span>
            </div>

            <div className="now-card-body">
              <h4 className="now-title">Next-Gen Full-Stack &amp; WebGL</h4>
              <p className="now-desc">
                {portfolioData.personal.now.focus}
              </p>
              <div className="now-learning">
                <span className="learning-label">Exploring:</span>
                <span className="learning-val">{portfolioData.personal.now.learning}</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 6: Experience & Education Quick Stats (Span Col 4) */}
          <BentoCard className="span-col-4">
            <div className="card-top-header">
              <span className="bento-badge cyan"><FaBriefcase /> Track Record</span>
              <span className="bento-chip-sub">3 Internships</span>
            </div>

            <div className="track-body">
              <div className="track-item">
                <FaBriefcase className="track-icon" />
                <div>
                  <span className="track-role">IIFA Tech • Preesoft • DevTechnoz</span>
                  <span className="track-sub">3 Software Engineering Internships</span>
                </div>
              </div>

              <div className="track-item">
                <FaGraduationCap className="track-icon violet" />
                <div>
                  <span className="track-role">BS Computer Science</span>
                  <span className="track-sub">Superior University (2022–2026)</span>
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 7: Direct Connect & Email Copy (Span Col 12 / Full Width Banner) */}
          <BentoCard className="span-col-12 bento-cta-card">
            <div className="bento-cta-content">
              <div>
                <span className="bento-badge green"><FaEnvelope /> Direct Line</span>
                <h3 className="bento-cta-heading">
                  Have an ambitious project in mind? Let’s engineer it.
                </h3>
                <p className="bento-cta-sub">
                  I’m always open to discussing new opportunities, code challenges, or product partnerships.
                </p>
              </div>

              <div className="bento-cta-actions">
                <button
                  className="bento-copy-btn glass-panel"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                >
                  {copied ? <FaCheck className="copy-icon-green" /> : <FaCopy />}
                  <span>{copied ? 'Email Copied!' : portfolioData.personal.email}</span>
                </button>

                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="bento-email-btn btn-primary-glow"
                  onClick={() => playClick()}
                >
                  <FaEnvelope />
                  <span>Send Direct Email</span>
                </a>

                <div className="bento-social-icons">
                  <a
                    href={portfolioData.personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-social-link"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href={portfolioData.personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bento-social-link"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

