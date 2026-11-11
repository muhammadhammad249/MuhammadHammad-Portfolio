import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaCalendarAlt, FaCheck } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import './Experience.css';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section id="experience" className="experience-section" ref={ref}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">05 / Career Trajectory</span>
          <h2 className="section-title">
            Experience &amp; <span className="gradient-text">Academic Rigor</span>
          </h2>
          <p className="section-subtitle">
            A track record of software engineering internships delivering production code alongside computer science coursework.
          </p>
        </div>

        <div className="timeline-container">
          {/* Scroll-drawn center timeline line */}
          <div className="timeline-track-line" />

          {/* Internships List */}
          <div className="timeline-items-wrapper">
            {portfolioData.experience.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  className={`timeline-entry ${isEven ? 'entry-left' : 'entry-right'}`}
                  initial={{ opacity: 0, y: 35, x: isEven ? -25 : 25 }}
                  animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Timeline Dot Node */}
                  <div className="timeline-node">
                    <FaBriefcase className="timeline-node-icon" />
                    <span className="node-glow-ring" />
                  </div>

                  {/* Card Content */}
                  <div className="timeline-card glass-panel">
                    <div className="entry-header">
                      <div>
                        <span className="entry-badge">{exp.badge}</span>
                        <h3 className="entry-role">{exp.role}</h3>
                        <h4 className="entry-company">{exp.company}</h4>
                      </div>
                      <div className="entry-meta">
                        <span className="meta-pill"><FaCalendarAlt /> {exp.period}</span>
                        <span className="meta-pill"><FaMapMarkerAlt /> {exp.location}</span>
                      </div>
                    </div>

                    <p className="entry-desc">{exp.description}</p>

                    <ul className="entry-responsibilities">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i}>
                          <FaCheck className="resp-check-icon" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="entry-skills">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="entry-skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Education Entry */}
            {portfolioData.education.map((edu) => (
              <motion.div
                key={edu.id}
                className="timeline-entry entry-left"
                initial={{ opacity: 0, y: 35, x: -25 }}
                animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="timeline-node node-education">
                  <FaGraduationCap className="timeline-node-icon edu" />
                  <span className="node-glow-ring" />
                </div>

                <div className="timeline-card glass-panel card-education">
                  <div className="entry-header">
                    <div>
                      <span className="entry-badge cyan">{edu.badge}</span>
                      <h3 className="entry-role">{edu.degree}</h3>
                      <h4 className="entry-company">{edu.institution}</h4>
                    </div>
                    <div className="entry-meta">
                      <span className="meta-pill"><FaCalendarAlt /> {edu.period}</span>
                      <span className="meta-pill"><FaMapMarkerAlt /> {edu.location}</span>
                    </div>
                  </div>

                  <p className="entry-desc">{edu.description}</p>

                  <div className="coursework-block">
                    <span className="coursework-title">Key Computer Science Core:</span>
                    <div className="entry-skills">
                      {edu.coursework.map((course) => (
                        <span key={course} className="entry-skill-tag edu">{course}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

