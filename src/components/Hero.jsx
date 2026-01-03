import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaArrowRight, FaFileDownload } from 'react-icons/fa';
import './Hero.css';
import project1 from '../assets/project-restaurant.png';
import project2 from '../assets/netflix.png';
import project3 from '../assets/travel.png';

const MagneticButton = ({ children, href, download = false, target = "_self", onClick, ...props }) => {
    const btnRef = useRef(null);
    const mX = useMotionValue(0);
    const mY = useMotionValue(0);

    const springX = useSpring(mX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mY, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e) => {
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

    return (
        <motion.a
            ref={btnRef}
            href={href}
            className={`hero-cyber-btn ${props.className || ''}`}
            target={target}
            download={download}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 25px var(--primary-color)" }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
            <div className="btn-shine"></div>
        </motion.a>
    );
};

const Hero = () => {
    const typewriterEffect = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            }
        }
    };

    const characterAnimation = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const line1 = "👋 Hi, I'm";
    const line2 = "Muhammad Hammad,";
    const line3 = "a Web Developer";

    const renderTypewriter = (text) => (
        text.split("").map((char, index) => (
            <motion.span key={index} variants={characterAnimation}>
                {char === " " ? "\u00A0" : char}
            </motion.span>
        ))
    );

    const handleScroll = (e, id) => {
        e.preventDefault();
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero-section">
            <div className="hero-background-gradient"></div>
            <div className="container hero-container">
                <div className="hero-left">
                    <motion.div
                        className="hero-heading-container"
                        variants={typewriterEffect}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="hero-title">
                            <span style={{ display: 'block', marginBottom: '0.2rem', fontSize: '0.8em' }}>{renderTypewriter(line1)}</span>
                            <span style={{ display: 'block', marginBottom: '0.2rem', color: 'var(--primary-color)', whiteSpace: 'nowrap' }}>{renderTypewriter(line2)}</span>
                            <span style={{ display: 'block', fontSize: '0.8em' }}>{renderTypewriter(line3)}</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8 }}
                    >
                        Crafting high-performance, beautiful, and interactive web experiences with modern technologies. Let's build something amazing together.
                    </motion.p>

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                    >
                        <MagneticButton href="#projects" onClick={(e) => handleScroll(e, '#projects')}>
                            <span>See My Work</span> <FaArrowRight />
                        </MagneticButton>
                        <MagneticButton href="#resume" onClick={(e) => handleScroll(e, '#resume')}>
                            <span>Resume</span> <FaFileDownload />
                        </MagneticButton>
                    </motion.div>
                </div>

                <div className="hero-right">
                    <div className="floating-cards-container">
                        <motion.div
                            className="floating-card card-1"
                            animate={{
                                y: [-10, 10, -10],
                                rotate: [-5, -2, -5]
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <img src={project1} alt="Project 1" />
                        </motion.div>
                        <motion.div
                            className="floating-card card-2"
                            animate={{
                                y: [10, -10, 10],
                                rotate: [5, 8, 5]
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <img src={project2} alt="Project 2" />
                        </motion.div>
                        <motion.div
                            className="floating-card card-3"
                            animate={{
                                y: [-5, 5, -5],
                                rotate: [15, 12, 15]
                            }}
                            transition={{
                                duration: 7,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <img src={project3} alt="Project 3" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
