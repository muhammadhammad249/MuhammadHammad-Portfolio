import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';
import './Resume.css';
import resumePdf from '../assets/Resume.pdf';

// Static particle data outside component
const DUST_PARTICLES = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    duration: 5 + (i % 5) + 5,   // deterministic, no Math.random()
    delay: (i * 0.4) % 5,
}));

const DATA_STREAMS = Array.from({ length: 8 }, (_, i) => i);

const Resume = memo(() => {

    return (
        <section id="resume" className="resume-section">
            <div className="resume-bg-overlay"></div>

            <div className="digital-dust">
                {DUST_PARTICLES.map((p) => (
                    <motion.div
                        key={p.id}
                        className={`dust-particle dp${p.id}`}
                        animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0], scale: [1, 1.5, 1] }}
                        transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
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
                        transition={{ duration: 0.6 }}
                    >
                        Resume
                    </motion.h2>
                    <div className="title-streak"></div>
                </div>

                <motion.div
                    className="futuristic-resume-card"
                    initial={{ opacity: 0, scale: 0.92, y: 30 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
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
                                filter: [
                                    'drop-shadow(0 0 10px #0ea5e9)',
                                    'drop-shadow(0 0 20px #0ea5e9)',
                                    'drop-shadow(0 0 10px #0ea5e9)'
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <FaFilePdf />
                        </motion.div>
                        <div className="hologram-base"></div>
                    </div>

                    <p className="resume-description">
                        You can view or download my resume to learn more about my experience, skills, and projects.
                    </p>

                    <div className="download-btn-wrapper" style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <motion.a
                            href={resumePdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="futuristic-download-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ cursor: 'pointer', border: 'none', background: 'none', textDecoration: 'none' }}
                        >
                            <FaEye className="btn-icon" />
                            <span>View Resume</span>
                            <div className="btn-pulse"></div>
                        </motion.a>

                        <motion.a
                            href={resumePdf}
                            download="Muhammad_Hammad_Resume.pdf"
                            className="futuristic-download-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ cursor: 'pointer', border: 'none', background: 'none', textDecoration: 'none' }}
                        >
                            <FaDownload className="btn-icon" />
                            <span>Download Resume</span>
                            <div className="btn-pulse"></div>
                        </motion.a>
                    </div>

                    <div className="card-data-streams">
                        {DATA_STREAMS.map((i) => (
                            <div key={i} className={`stream s${i}`}></div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Resume;
