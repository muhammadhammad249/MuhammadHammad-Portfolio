import React, { memo } from 'react';
import { motion } from 'framer-motion';
import './About.css';
import profileImg from '../assets/profile-real.jpg';
import tech3d from '../assets/3d-tech.png';

const slideInLeft = { initial: { opacity: 0, x: -50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: 'easeOut' } };
const slideInRight = { initial: { opacity: 0, x: 50 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.7, ease: 'easeOut', delay: 0.15 } };

const About = memo(() => (
    <section id="about" className="about-section">
        <div className="container about-container">
            <div className="about-grid">
                <motion.div className="about-image-container" {...slideInLeft}>
                    <div className="image-frame">
                        <img src={profileImg} alt="Muhammad Hammad" className="profile-pic" loading="lazy" decoding="async" width="320" height="320" />
                        <div className="frame-glow"></div>
                        <div className="frame-corner tc"></div>
                        <div className="frame-corner bc"></div>
                    </div>
                </motion.div>

                <motion.div className="about-info-container" {...slideInRight}>
                    <h2 className="section-title-alt">About Me</h2>
                    <div className="about-text-content">
                        <p className="lead-text">
                            I am a passionate Full Stack Developer specializing in building responsive and interactive web applications using React.js.
                        </p>
                        <p className="description-text">
                            With a strong foundation in modern web technologies, I focus on creating seamless user experiences and clean, maintainable code. My journey in web development is driven by a curiosity to learn and a desire to build impactful solutions.
                        </p>
                        <p className="description-text">
                            I am experienced in translating design mockups into high-quality code and collaborating with cross-functional teams to deliver exceptional products. I thrive in environments that challenge my technical skills and allow me to contribute to meaningful projects.
                        </p>

                        <div className="personal-stats">
                            <div className="stat-item">
                                <span className="stat-label">Location</span>
                                <span className="stat-value">Pakistan</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Availability</span>
                                <span className="stat-value">Full-time / Freelance</span>
                            </div>
                        </div>

                        <motion.div
                            className="about-3d-asset"
                            animate={{ y: [0, -20, 0], rotateZ: [0, 5, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src={tech3d} alt="3D Tech Asset" className="tech-3d-img" loading="lazy" decoding="async" width="200" height="200" />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
));

export default About;
