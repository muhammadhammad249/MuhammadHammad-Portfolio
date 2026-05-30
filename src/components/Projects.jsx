import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './Projects.css';
import restaurantImg from '../assets/project-restaurant.png';
import dailyGoalImg from '../assets/goals.png';
import travelImg from '../assets/travel.png';
import netflixImg from '../assets/netflix.png';
import tictactoeImg from '../assets/project-tictactoe.png';
import currencyImg from '../assets/project-currency.png';
import compilerImg from '../assets/project-compiler.png';
import crmImg from '../assets/project-crm.png';
import weatherImg from '../assets/project-weather.png';
import aiImg from '../assets/3d-tech.png';
import loginImg from '../assets/project-login.png';

// ── Static data outside component so it's never re-created ──
const projectsData = [
    {
        title: 'Client Manager Pro',
        description: 'A comprehensive CRM dashboard for efficient client and project management, featuring real-time data visualization.',
        tech: ['React.js', 'Vite', 'Tailwind CSS'],
        image: crmImg,
        liveLink: '/Client%20Manager%20Pro/index.html',
    },
    {
        title: 'Weather App',
        description: 'A sleek, real-time weather forecasting application providing accurate meteorological data with locations.',
        tech: ['React.js', 'Vite', 'Tailwind CSS', 'Axios'],
        image: weatherImg,
        liveLink: '/Weather/index.html',
    },
    {
        title: 'JobBridge AI',
        description: 'A modern responsive job portal web application built with React.js that allows users to explore job opportunities and manage applications with a clean and user-friendly interface.',
        tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'Vercel'],
        image: compilerImg,
        liveLink: 'https://jobbridge-sigma.vercel.app',
        githubLink: 'https://github.com/muhammadhammad249/jobbridge',
    },
    {
        title: 'Modern Landing Page',
        description: 'A high-performance, responsive landing page with elegant animations and modern UI components.',
        tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
        image: aiImg,
        liveLink: '/landingpage/index.html',
    },
    {
        title: 'Modern Login Page',
        description: 'A clean and secure authentication interface with a modern glassmorphism design and smooth transitions.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        image: loginImg,
        liveLink: '/login%20page/index.html',
    },
    {
        title: 'Restaurant Website',
        description: 'A modern restaurant website with elegant design, menu showcase, and reservation system.',
        tech: ['React.js', 'Vite', 'CSS'],
        image: restaurantImg,
        liveLink: '/restaurant-website/index.html',
    },
    {
        title: 'Daily Goals',
        description: 'A productivity app for managing daily tasks and goals with a beautiful gradient interface.',
        tech: ['React.js', 'Vite', 'CSS'],
        image: dailyGoalImg,
        liveLink: '/Daily%20Goal/index.html',
    },
    {
        title: 'Travel Agency Website',
        description: 'A responsive travel agency website with tour packages, booking UI, and modern layout.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        image: travelImg,
        liveLink: '/travel-agency/index.html',
    },
    {
        title: 'Netflix Clone',
        description: 'A Netflix-inspired UI clone with movie sections and responsive design.',
        tech: ['React.js', 'CSS'],
        image: netflixImg,
        liveLink: '/Netflix/index.html',
    },
    {
        title: 'Tic Tac Toe Game',
        description: 'A classic Tic Tac Toe game with interactive UI and game logic.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        image: tictactoeImg,
        liveLink: '/tic-tac-toe/index.html',
    },
    {
        title: 'Currency Converter',
        description: 'Real-time currency converter application with exchange rate calculation.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        image: currencyImg,
        liveLink: '/currency-converter/index.html',
    },
    {
        title: 'C-Minus Compiler',
        description: 'A web-based interface for a C-Minus compiler, featuring code editing and compilation.',
        tech: ['C++', 'JavaScript', 'Web'],
        image: compilerImg,
        liveLink: '/C-minus%20project/web_compiler/index.html',
    }
];

// ── Pre-generate static random data once at module load ──
const STARS = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    opacity: Math.random(),
    scale: Math.random() * 0.5 + 0.5,
    duration: 2 + Math.random() * 3,
    delay: Math.random() * 5,
    left: Math.random() * 100,
    top: Math.random() * 100,
    width: Math.random() * 3,
    height: Math.random() * 3,
}));

const FAR_PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    duration: 20 + Math.random() * 20,
    delay: -Math.random() * 20,
    left: Math.random() * 100,
    top: Math.random() * 100,
}));

const MESH_NODES = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    cx: Math.random() * 100,
    cy: Math.random() * 100,
    duration: 3 + Math.random() * 5,
}));

// ── MagneticButton: memoized, no whileInView delay ──
const MagneticButton = memo(({ children, href }) => {
    const btnRef = useRef(null);
    const mX = useMotionValue(0);
    const mY = useMotionValue(0);

    const springX = useSpring(mX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mY, { stiffness: 150, damping: 15 });

    const handleMouseMove = useCallback((e) => {
        if (!btnRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        mX.set(clientX - (left + width / 2));
        mY.set(clientY - (top + height / 2));
    }, [mX, mY]);

    const handleMouseLeave = useCallback(() => {
        mX.set(0);
        mY.set(0);
    }, [mX, mY]);

    const handleClick = useCallback((e) => {
        e.preventDefault();
        if (href) window.open(href, '_blank', 'noopener,noreferrer');
    }, [href]);

    return (
        <motion.button
            ref={btnRef}
            onClick={handleClick}
            className="cyber-btn"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            <div className="btn-shine"></div>
        </motion.button>
    );
});

// ── ProjectCard: memoized, lazy image, reduced delays ──
const ProjectCard = memo(({ project, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
        x.set(0);
        y.set(0);
    }, [x, y]);

    return (
        <motion.div
            ref={cardRef}
            className="cyber-project-card"
            style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
        >
            <div className="card-glass-layer" style={{ transform: 'translateZ(20px)' }}></div>
            <div className="card-light-streak"></div>

            <div className="project-visual" style={{ transform: 'translateZ(40px)' }}>
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    width="400"
                    height="225"
                />
                <div className="image-overlay-neon"></div>
                <div className="corner-accents">
                    <span className="top-left"></span>
                    <span className="top-right"></span>
                    <span className="bottom-left"></span>
                    <span className="bottom-right"></span>
                </div>
            </div>

            <div className="project-info" style={{ transform: 'translateZ(60px)' }}>
                <h3 className="project-title-glow">{project.title}</h3>

                {/* Plain text – no typewriter per card (huge perf win) */}
                <p className="project-desc">{project.description}</p>

                <div className="tech-stack-neon">
                    {project.tech.map((tech, i) => (
                        <motion.span
                            key={tech}
                            className="tech-tag-cyber"
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.06 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>

                <div className="action-links">
                    <MagneticButton href={project.liveLink}>
                        <span>View Project</span> <FaExternalLinkAlt className="btn-icon" />
                    </MagneticButton>
                    {project.githubLink && (
                        <MagneticButton href={project.githubLink}>
                            <span>GitHub</span> <FaGithub className="btn-icon" />
                        </MagneticButton>
                    )}
                </div>
            </div>
        </motion.div>
    );
});

// ── StarField: memoized, static data ──
const StarField = memo(() => (
    <div className="star-field">
        {STARS.map((s) => (
            <motion.div
                key={s.id}
                className="star"
                initial={{ opacity: s.opacity, scale: s.scale }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [1, 2.5, 1] }}
                transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
                style={{
                    left: s.left + '%',
                    top: s.top + '%',
                    width: s.width + 'px',
                    height: s.height + 'px',
                }}
            />
        ))}
    </div>
));

// ── Projects section ──
const Projects = memo(() => {
    const sectionRef = useRef(null);
    const flareX = useMotionValue(0);
    const flareY = useMotionValue(0);

    const handleGlobalMouseMove = useCallback((e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        flareX.set(e.clientX - rect.left);
        flareY.set(e.clientY - rect.top);
    }, [flareX, flareY]);

    return (
        <section
            id="projects"
            className="projects-section"
            ref={sectionRef}
            onMouseMove={handleGlobalMouseMove}
        >
            <div className="cinematic-bg">
                <div className="deep-space"></div>
                <StarField />

                <motion.div className="mouse-flare" style={{ x: flareX, y: flareY }} />

                <div className="parallax-layers">
                    {/* Layer 1: Distant Particles */}
                    <div className="layer distant-particles">
                        {FAR_PARTICLES.map((p) => (
                            <motion.div
                                key={p.id}
                                className="particle-far"
                                animate={{ y: ['0%', '-100%'], opacity: [0, 0.3, 0] }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: 'linear',
                                    delay: p.delay,
                                }}
                                style={{ left: p.left + '%', top: p.top + '%' }}
                            />
                        ))}
                    </div>

                    {/* Layer 2: Digital Mesh Nodes */}
                    <div className="layer digital-mesh">
                        <svg className="mesh-svg">
                            <defs>
                                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            {MESH_NODES.map((n) => (
                                <motion.circle
                                    key={n.id}
                                    cx={n.cx + '%'}
                                    cy={n.cy + '%'}
                                    r="2"
                                    fill="url(#nodeGlow)"
                                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                                    transition={{ duration: n.duration, repeat: Infinity }}
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Layer 3: Holographic Panels */}
                    <div className="layer holo-panels">
                        {[0, 1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                className={`holo-panel hp${i}`}
                                animate={{ x: [-20, 20], y: [-20, 20], rotate: [0, 5, 0] }}
                                transition={{
                                    duration: 15 + i * 2,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="scanning-line"></div>
                <div className="cinematic-drift"></div>
            </div>

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.h2
                    className="projects-main-title"
                    initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    Featured Projects
                </motion.h2>

                <div className="projects-layout">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
});

export default Projects;
