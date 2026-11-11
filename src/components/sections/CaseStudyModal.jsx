import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaCheckCircle, FaLayerGroup, FaCalendarAlt } from 'react-icons/fa';
import { useSound } from '../../hooks/useSound';
import './CaseStudyModal.css';

export default function CaseStudyModal({ project, onClose }) {
  const { playClick, playWhoosh } = useSound();

  useEffect(() => {
    if (project) {
      playWhoosh();
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'unset';
      };
    }
  }, [project, onClose, playWhoosh]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="case-study-modal glass-panel"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button
            className="modal-close-icon-btn"
            onClick={() => {
              playClick();
              onClose();
            }}
            aria-label="Close Case Study"
          >
            <FaTimes />
          </button>

          {/* Visual Header Image */}
          <div className="modal-banner">
            <img
              src={project.image}
              alt={project.title}
              width="800"
              height="450"
              className="modal-banner-img"
            />
            <div className="modal-banner-gradient" />
            <div className="modal-banner-meta">
              <span className="modal-pill-tag">{project.tag}</span>
              <h2 className="modal-project-title">{project.title}</h2>
            </div>
          </div>

          {/* Body Content */}
          <div className="modal-body-scroll">
            {/* Meta Row */}
            <div className="modal-meta-bar">
              <div className="meta-cell">
                <span className="meta-label"><FaLayerGroup /> Type / Domain</span>
                <span className="meta-value">{project.clientOrType}</span>
              </div>
              <div className="meta-cell">
                <span className="meta-label"><FaCalendarAlt /> Year</span>
                <span className="meta-value">{project.year}</span>
              </div>
            </div>

            {/* In-depth narrative */}
            <div className="modal-section-block">
              <h4 className="modal-block-heading">Project Overview & Architecture</h4>
              <p className="modal-block-text">{project.fullDescription || project.description}</p>
            </div>

            {/* Highlights List */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="modal-section-block">
                <h4 className="modal-block-heading">Key Technical Highlights</h4>
                <ul className="modal-highlights-list">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="modal-highlight-item">
                      <FaCheckCircle className="highlight-check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="modal-section-block">
              <h4 className="modal-block-heading">Technologies Leveraged</h4>
              <div className="modal-tech-chips">
                {project.tech.map((t) => (
                  <span key={t} className="m-chip">{t}</span>
                ))}
              </div>
            </div>

            {/* Actions Footer */}
            <div className="modal-actions-footer">
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-magnetic btn-primary-glow"
                onClick={() => playClick()}
              >
                <span>Launch Live Project</span>
                <FaExternalLinkAlt className="btn-icon" />
              </a>

              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-magnetic btn-secondary-glass"
                  onClick={() => playClick()}
                >
                  <FaGithub className="btn-icon" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

