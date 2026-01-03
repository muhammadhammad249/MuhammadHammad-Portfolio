import React from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload } from 'react-icons/fa';
import './Resume.css';
import resumePdf from '../assets/Hammad.pdf';

const Resume = () => {
    return (
        <section id="resume" className="resume-section">
            <div className="resume-bg-overlay"></div>

            {/* Digital Dust / Particles */}
            <div className="digital-dust">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={`dust-particle dp${i}`}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0, 0.5, 0],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 5,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <div className="container resume-container">
                <div className="resume-title-wrapper">
                    <motion.h2
                        className="resume-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Resume
                    </motion.h2>
                    <div className="title-streak"></div>
                </div>

                <motion.div
                    className="futuristic-resume-card"
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="card-glass-effect"></div>
                    <div className="card-glow-border"></div>

                    <div className="hologram-container">
                        <div className="light-cylinder"></div>
                        <motion.div
                            className="hologram-icon"
                            animate={{
                                y: [-15, 15, -15],
                                rotateY: [0, 10, -10, 0],
                                filter: ["drop-shadow(0 0 10px #0ea5e9)", "drop-shadow(0 0 20px #0ea5e9)", "drop-shadow(0 0 10px #0ea5e9)"]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <FaFilePdf />
                        </motion.div>
                        <div className="hologram-base"></div>
                    </div>

                    <p className="resume-description">
                        You can download my resume to learn more about my experience, skills, and projects.
                    </p>

                    <div className="download-btn-wrapper">
                        <motion.a
                            href={resumePdf}
                            download="Hammad.pdf"
                            className="futuristic-download-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaDownload className="btn-icon" />
                            <span>Download Resume (PDF)</span>
                            <div className="btn-pulse"></div>
                        </motion.a>
                    </div>

                    {/* Rise particles inside card */}
                    <div className="card-data-streams">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className={`stream s${i}`}></div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Resume;
