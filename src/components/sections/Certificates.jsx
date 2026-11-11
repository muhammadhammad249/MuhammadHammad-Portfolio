import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUniversity, FaRocket } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import './Certificates.css';

const ACH_ICONS = [<FaUniversity />, <FaAward />, <FaRocket />];

export default function Certificates() {
  return (
    <section id="achievements" className="certificates-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">08 / Verification & Honors</span>
          <h2 className="section-title">
            Milestones &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Notable academic credentials, engineering honors, and verified product deliveries.
          </p>
        </div>

        <div className="certificates-grid">
          {portfolioData.achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              className="achievement-card glass-panel"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -5 }}
            >
              <div className="achievement-icon-wrap">
                {ACH_ICONS[idx % ACH_ICONS.length]}
              </div>

              <div className="achievement-meta">
                <span className="achievement-year">{ach.year}</span>
                <h3 className="achievement-title">{ach.title}</h3>
                <span className="achievement-issuer gradient-text-silver">{ach.issuer}</span>
                <p className="achievement-desc">{ach.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

