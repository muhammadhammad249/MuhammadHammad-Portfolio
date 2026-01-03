import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';
import restaurantImg from '../assets/project-restaurant.png';
import dailyGoalImg from '../assets/goals.png';
import travelImg from '../assets/travel.png';
import netflixImg from '../assets/netflix.png';
import tictactoeImg from '../assets/project-tictactoe.png';
import currencyImg from '../assets/project-currency.png';
import compilerImg from '../assets/project-compiler.png';

const projectsData = [
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
        liveLink: '/Daily Goal/index.html',
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
        liveLink: '/C-minus project/web_compiler/index.html',
    }
];

const TypewriterText = ({ text }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setDisplayedText(text.slice(0, i));
            i++;
            if (i > text.length) clearInterval(timer);
        }, 15);
        return () => clearInterval(timer);
    }, [text]);

    return <p className="project-desc">{displayedText}</p>;
};

const MagneticButton = ({ children, href }) => {
    const btnRef = useRef(null);
    const mX = useMotionValue(0);
    const mY = useMotionValue(0);

    const springX = useSpring(mX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mY, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
        if (!btnRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mX.set(clientX - centerX);
        mY.set(clientY - centerY);
    };

    const handleMouseLeave = () => {
        mX.set(0);
        mY.set(0);
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (href) {
            window.open(href, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <motion.button
            ref={btnRef}
            onClick={handleClick}
            className="cyber-btn"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            <div className="btn-shine"></div>
        </motion.button>
    );
};

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            className="cyber-project-card"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
        >
            <div className="card-glass-layer" style={{ transform: "translateZ(20px)" }}></div>
            <div className="card-light-streak"></div>

            <div className="project-visual" style={{ transform: "translateZ(40px)" }}>
                <img src={project.image} alt={project.title} />
                <div className="image-overlay-neon"></div>
                <div className="corner-accents">
                    <span className="top-left"></span>
                    <span className="top-right"></span>
                    <span className="bottom-left"></span>
                    <span className="bottom-right"></span>
                </div>
            </div>

            <div className="project-info" style={{ transform: "translateZ(60px)" }}>
                <motion.h3
                    className="project-title-glow"
                >
                    {project.title}
                </motion.h3>

                <TypewriterText text={project.description} />

                <div className="tech-stack-neon">
                    {project.tech.map((tech, i) => (
                        <motion.span
                            key={i}
                            className="tech-tag-cyber"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>

                <div className="action-links">
                    <MagneticButton href={project.liveLink}>
                        <span>View Project</span> <FaExternalLinkAlt className="btn-icon" />
                    </MagneticButton>
                </div>
            </div>
        </motion.div>
    );
};

const StarField = () => {
    return (
        <div className="star-field">
            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={i}
                    className="star"
                    initial={{
                        opacity: Math.random(),
                        scale: Math.random() * 0.5 + 0.5
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [1, 2.5, 1],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 5
                    }}
                    style={{
                        left: Math.random() * 100 + "%",
                        top: Math.random() * 100 + "%",
                        width: Math.random() * 3 + "px",
                        height: Math.random() * 3 + "px",
                    }}
                />
            ))}
        </div>
    );
};

const Projects = () => {
    const sectionRef = useRef(null);
    const flareX = useMotionValue(0);
    const flareY = useMotionValue(0);

    const handleGlobalMouseMove = (e) => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        flareX.set(e.clientX - rect.left);
        flareY.set(e.clientY - rect.top);
    };

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

                {/* Interactive Mouse Flare */}
                <motion.div
                    className="mouse-flare"
                    style={{ x: flareX, y: flareY }}
                />

                {/* Parallax Layers */}
                <div className="parallax-layers">
                    {/* Layer 1: Distant Particles */}
                    <div className="layer distant-particles">
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="particle-far"
                                animate={{
                                    y: ["0%", "-100%"],
                                    opacity: [0, 0.3, 0]
                                }}
                                transition={{
                                    duration: 20 + Math.random() * 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: -Math.random() * 20
                                }}
                                style={{
                                    left: Math.random() * 100 + "%",
                                    top: Math.random() * 100 + "%"
                                }}
                            />
                        ))}
                    </div>

                    {/* Layer 2: Digital Mesh & Nodes */}
                    <div className="layer digital-mesh">
                        <svg className="mesh-svg">
                            <defs>
                                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            {[...Array(15)].map((_, i) => (
                                <g key={i}>
                                    <motion.circle
                                        cx={Math.random() * 100 + "%"}
                                        cy={Math.random() * 100 + "%"}
                                        r="2"
                                        fill="url(#nodeGlow)"
                                        animate={{ opacity: [0.1, 0.5, 0.1] }}
                                        transition={{ duration: 3 + Math.random() * 5, repeat: Infinity }}
                                    />
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Layer 3: Holographic Panels */}
                    <div className="layer holo-panels">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`holo-panel hp${i}`}
                                animate={{
                                    x: [-20, 20],
                                    y: [-20, 20],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{
                                    duration: 15 + i * 2,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut"
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
                    initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    Featured Projects
                </motion.h2>

                <div className="projects-layout">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
