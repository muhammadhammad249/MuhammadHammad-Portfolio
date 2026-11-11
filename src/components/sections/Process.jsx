import React from 'react';
import { motion } from 'framer-motion';
import { FaCompass, FaDraftingCompass, FaLaptopCode, FaRocket } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import './Process.css';

const PROCESS_ICONS = [<FaCompass />, <FaDraftingCompass />, <FaLaptopCode />, <FaRocket />];

export default function Process() {
  return (
    <section id="process" className="process-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">07 / Methodology & Workflow</span>
          <h2 className="section-title">
            From Concept to <span className="gradient-text">Award-Winning Code</span>
          </h2>
          <p className="section-subtitle">
            A structured 4-step engineering discipline ensuring on-time delivery, pristine design fidelity, and zero performance compromises.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="process-grid">
          {portfolioData.process.map((item, idx) => (
            <motion.div
              key={item.step}
              className="process-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -6 }}
            >
              <div className="process-step-header">
                <span className="process-step-num">{item.step}</span>
                <span className="process-icon-wrap">{PROCESS_ICONS[idx]}</span>
              </div>

              <span className="process-duration-pill">{item.duration}</span>
              <h3 className="process-title">{item.title}</h3>
              <p className="process-desc">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

