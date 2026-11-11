import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaCodeBranch, FaStar, FaUsers, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import { useSound } from '../../hooks/useSound';
import './GitHubStats.css';

export default function GitHubStats() {
  const stats = useGitHubStats('muhammadhammad249');
  const { playClick } = useSound();

  return (
    <section id="github-stats" className="github-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">10 / Open Source Velocity</span>
          <h2 className="section-title">
            Live GitHub <span className="gradient-text">Activity</span>
          </h2>
          <p className="section-subtitle">
            Synchronized directly with GitHub's public API to showcase real-time code cadence and repository contributions.
          </p>
        </div>

        {/* GitHub Stats Cards */}
        <div className="github-overview-card glass-panel">
          <div className="github-card-header">
            <div className="gh-profile-meta">
              <div className="gh-icon-box">
                <FaGithub />
              </div>
              <div>
                <h3 className="gh-username">muhammadhammad249</h3>
                <span className="gh-status-text">Active Contributor &amp; Open Source Builder</span>
              </div>
            </div>

            <a
              href={portfolioData.personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic btn-secondary-glass gh-btn"
              onClick={() => playClick()}
            >
              <span>Follow on GitHub</span>
              <FaExternalLinkAlt className="btn-icon" />
            </a>
          </div>

          <div className="github-metrics-grid">
            <motion.div
              className="gh-metric-tile glass-panel"
              whileHover={{ y: -4 }}
            >
              <div className="tile-icon-row">
                <FaCodeBranch className="tile-icon cyan" />
                <span className="tile-title">Repositories</span>
              </div>
              <span className="tile-number">{stats.public_repos}</span>
              <span className="tile-sub">Public Repositories</span>
            </motion.div>

            <motion.div
              className="gh-metric-tile glass-panel"
              whileHover={{ y: -4 }}
            >
              <div className="tile-icon-row">
                <FaStar className="tile-icon amber" />
                <span className="tile-title">Total Stars</span>
              </div>
              <span className="tile-number">{stats.stars}</span>
              <span className="tile-sub">Stars Across Repos</span>
            </motion.div>

            <motion.div
              className="gh-metric-tile glass-panel"
              whileHover={{ y: -4 }}
            >
              <div className="tile-icon-row">
                <FaUsers className="tile-icon violet" />
                <span className="tile-title">Network</span>
              </div>
              <span className="tile-number">{stats.followers}</span>
              <span className="tile-sub">Developers Following</span>
            </motion.div>

            <motion.div
              className="gh-metric-tile glass-panel"
              whileHover={{ y: -4 }}
            >
              <div className="tile-icon-row">
                <FaCode className="tile-icon mint" />
                <span className="tile-title">Activity</span>
              </div>
              <span className="tile-number">{stats.commitsThisYear}</span>
              <span className="tile-sub">Recent Contributions</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

