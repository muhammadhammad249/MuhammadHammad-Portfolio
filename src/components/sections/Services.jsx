import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaLaptopCode, FaDatabase, FaPaintBrush, FaTachometerAlt } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import './Services.css';

const SERVICE_ICONS = {
  frontend: <FaLaptopCode />,
  fullstack: <FaDatabase />,
  'creative-ui': <FaPaintBrush />,
  performance: <FaTachometerAlt />,
};

export default function Services() {
  return (
    <section id="services" className="services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">06 / Engineering Offerings</span>
          <h2 className="section-title">
            What I <span className="gradient-text">Deliver</span>
          </h2>
          <p className="section-subtitle">
            From architecture to deployment, I build web software engineered for performance, aesthetic delight, and commercial growth.
          </p>
        </div>

        {/* 2x2 Services Grid */}
        <div className="services-grid">
          {portfolioData.services.map((service, idx) => (
            <motion.div
              key={service.id}
              className="service-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
            >
              <div className="service-header-row">
                <span className="service-number">{service.number}</span>
                <span className="service-icon-wrap">{SERVICE_ICONS[service.id]}</span>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <span className="service-tagline gradient-text-silver">{service.tagline}</span>
              <p className="service-desc">{service.description}</p>

              <div className="service-deliverables">
                <span className="deliverables-title">Key Deliverables:</span>
                <ul className="deliverables-list">
                  {service.deliverables.map((deliv, i) => (
                    <li key={i}>
                      <FaCheckCircle className="deliv-check-icon" />
                      <span>{deliv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

