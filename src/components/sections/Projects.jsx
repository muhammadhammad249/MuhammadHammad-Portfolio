import React, { useState } from 'react';
import { FaExternalLinkAlt, FaGithub, FaEye } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';
import CaseStudyModal from './CaseStudyModal';
import './Projects.css';

const CATEGORIES = [
  { id: 'all', label: 'All Projects (16)' },
  { id: 'featured', label: 'Featured' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'tools', label: 'Tools & Systems' },
];

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const { playClick, playPop } = useSound();

  const filteredProjects = portfolioData.projects.filter((p) => {
    if (filter === 'all') return true;
    if (filter === 'featured') return p.featured || p.category === 'featured';
    return p.category === filter;
  });

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">04 / Portfolio Showcase</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Creations &amp; Systems</span>
          </h2>
          <p className="section-subtitle">
            Explore 16 production-grade web platforms, interactive tools, and experimental UI interfaces crafted with modern React and clean engineering.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="projects-filter-bar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`filter-pill-btn ${filter === cat.id ? 'active' : ''}`}
              onClick={() => {
                playClick();
                setFilter(cat.id);
              }}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Bento Project Grid — CSS transitions only, no layout thrash */}
        <div className="projects-grid">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.id}
              className={`project-card-interactive glass-panel ${project.featured ? 'card-featured' : ''} card-reveal`}
              style={{ animationDelay: `${idx * 35}ms` }}
              onClick={() => {
                playPop();
                setSelectedProject(project);
              }}
            >
                {/* Media Preview Box */}
                <div className="project-thumbnail-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    width="440"
                    height="260"
                    loading="lazy"
                    className="project-thumb-img"
                  />
                  <div className="thumbnail-gradient-overlay" />
                  
                  {/* Floating category tag */}
                  <span className="project-category-tag">{project.tag}</span>

                  {/* Hover "Inspect Case Study" quick pill */}
                  <div className="thumb-hover-action">
                    <span className="inspect-pill">
                      <FaEye /> Case Study
                    </span>
                  </div>
                </div>

                {/* Content Info */}
                <div className="project-content-body">
                  <div className="project-title-row">
                    <h3 className="project-heading">{project.title}</h3>
                  </div>

                  <p className="project-summary">{project.description}</p>

                  {/* Tech stack badges */}
                  <div className="project-tech-badges">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span key={tech} className="tech-badge-mini">{tech}</span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="tech-badge-mini tech-badge-more">+{project.tech.length - 4}</span>
                    )}
                  </div>

                  {/* Card Bottom Links */}
                  <div className="project-card-actions" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn primary"
                      onClick={() => playClick()}
                    >
                      <span>Live App</span>
                      <FaExternalLinkAlt className="action-icon" />
                    </a>

                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action-btn secondary"
                        onClick={() => playClick()}
                        aria-label="GitHub Repository"
                      >
                        <FaGithub />
                      </a>
                    )}

                    <button
                      className="project-action-btn text-only"
                      onClick={() => {
                        playPop();
                        setSelectedProject(project);
                      }}
                    >
                      Case Study
                    </button>
                  </div>
                </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal with Shared Element Transition */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

