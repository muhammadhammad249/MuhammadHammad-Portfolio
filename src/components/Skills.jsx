import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaGithub, FaWordpress } from 'react-icons/fa';
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si';
import './Skills.css';

// Static data outside component
const surroundings = [
    { name: 'HTML5', icon: <FaHtml5 />, pos: { top: '5%', left: '15%' }, delay: 0.1, color: '#e34f26' },
    { name: 'CSS3', icon: <FaCss3Alt />, pos: { top: '5%', right: '15%' }, delay: 0.2, color: '#1572b6' },
    { name: 'React.js', icon: <FaReact />, pos: { top: '77%', left: '15%' }, delay: 0.3, color: '#61dafb' },
    { name: 'Tailwind', icon: <SiTailwindcss />, pos: { top: '77%', right: '15%' }, delay: 0.4, color: '#06b6d4' },
    { name: 'Git', icon: <FaGitAlt />, pos: { top: '53%', left: '5%' }, delay: 0.5, color: '#f05032' },
    { name: 'GitHub', icon: <FaGithub />, pos: { top: '53%', right: '5%' }, delay: 0.6, color: '#ffffff' },
    { name: 'WordPress', icon: <FaWordpress />, pos: { top: '29%', left: '5%' }, delay: 0.7, color: '#21759b' },
    { name: 'Next.js', icon: <SiNextdotjs />, pos: { top: '29%', right: '5%' }, delay: 0.8, color: '#ffffff' },
];

const floatingTransition = { duration: 6, repeat: Infinity, ease: 'easeInOut' };
const floatingAnimate = { y: [-10, 10, -10] };

const PARTICLES = Array.from({ length: 20 }, (_, i) => i);

const Skills = memo(() => (
    <section id="skills" className="skills-section">
        <div className="skills-bg-gradient"></div>
        <div className="particles-overlay">
            {PARTICLES.map((i) => (
                <div key={i} className={`particle p${i}`} />
            ))}
        </div>

        <div className="container skills-container">
            <motion.h2
                className="skills-title"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Technical Skills
            </motion.h2>

            <div className="dashboard-wrapper">
                <svg className="connection-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {[
                        [15, 5], [85, 5], [15, 77], [85, 77], [5, 53], [95, 53], [5, 29], [95, 29]
                    ].map(([x2, y2], i) => (
                        <motion.line
                            key={i}
                            x1="50" y1="50" x2={x2} y2={y2}
                            className="c-line"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5 }}
                        />
                    ))}
                </svg>

                <div className="center-card-wrapper">
                    <motion.div
                        className="skill-card center-card js-card"
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: [
                                '0 0 20px rgba(247, 223, 30, 0.2)',
                                '0 0 40px rgba(247, 223, 30, 0.4)',
                                '0 0 20px rgba(247, 223, 30, 0.2)'
                            ]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <div className="card-glass"></div>
                        <div className="skill-icon"><FaJs style={{ color: '#f7df1e' }} /></div>
                        <span className="skill-name">JavaScript</span>
                    </motion.div>
                </div>

                {surroundings.map((skill) => (
                    <motion.div
                        key={skill.name}
                        className="skill-card floating-card"
                        style={{ ...skill.pos }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skill.delay, duration: 0.5 }}
                        animate={floatingAnimate}
                    >
                        <div className="card-glass"></div>
                        <div className="skill-icon" style={{ color: skill.color }}>{skill.icon}</div>
                        <span className="skill-name">{skill.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
));

export default Skills;
