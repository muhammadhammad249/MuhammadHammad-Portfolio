import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import './Skills.css';

const Skills = () => {
    const surroundings = [
        { name: 'HTML5', icon: <FaHtml5 />, pos: { top: '10%', left: '15%' }, delay: 0.1, color: '#e34f26' },
        { name: 'CSS3', icon: <FaCss3Alt />, pos: { top: '10%', right: '15%' }, delay: 0.2, color: '#1572b6' },
        { name: 'React.js', icon: <FaReact />, pos: { bottom: '15%', left: '10%' }, delay: 0.3, color: '#61dafb' },
        { name: 'Tailwind', icon: <SiTailwindcss />, pos: { bottom: '15%', right: '10%' }, delay: 0.4, color: '#06b6d4' },
        { name: 'Git', icon: <FaGitAlt />, pos: { top: '50%', left: '5%' }, delay: 0.5, color: '#f05032' },
        { name: 'GitHub', icon: <FaGithub />, pos: { top: '50%', right: '5%' }, delay: 0.6, color: '#ffffff' },
    ];

    const floatingAnimation = {
        y: [-10, 10, -10],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <section id="skills" className="skills-section">
            <div className="skills-bg-gradient"></div>
            <div className="particles-overlay">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={`particle p${i}`} />
                ))}
            </div>

            <div className="container skills-container">
                <motion.h2
                    className="skills-title"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Technical Skills
                </motion.h2>

                <div className="dashboard-wrapper">
                    {/* Connection Lines (SVG) */}
                    <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <motion.line x1="50" y1="50" x2="15" y2="10" className="c-line" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                        <motion.line x1="50" y1="50" x2="85" y2="10" className="c-line" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                        <motion.line x1="50" y1="50" x2="10" y2="85" className="c-line" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                        <motion.line x1="50" y1="50" x2="90" y2="85" className="c-line" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                        <motion.line x1="50" y1="50" x2="5" y2="50" className="c-line" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                        <motion.line x1="50" y1="50" x2="95" y2="50" className="c-line" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} />
                    </svg>

                    {/* Center Card (JS) */}
                    <div className="center-card-wrapper">
                        <motion.div
                            className="skill-card center-card js-card"
                            animate={{
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                    "0 0 20px rgba(247, 223, 30, 0.2)",
                                    "0 0 40px rgba(247, 223, 30, 0.4)",
                                    "0 0 20px rgba(247, 223, 30, 0.2)"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <div className="card-glass"></div>
                            <div className="skill-icon"><FaJs style={{ color: '#f7df1e' }} /></div>
                            <span className="skill-name">JavaScript</span>
                        </motion.div>
                    </div>

                    {/* Surrounding Cards */}
                    {surroundings.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="skill-card floating-card"
                            style={{ ...skill.pos }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: skill.delay, duration: 0.6 }}
                            animate={floatingAnimation}
                        >
                            <div className="card-glass"></div>
                            <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                            <span className="skill-name">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
