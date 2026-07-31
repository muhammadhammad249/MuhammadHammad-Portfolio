import React, { useRef, memo, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { FaArrowRight, FaFileDownload } from 'react-icons/fa';
import './Hero.css';
import project1 from '../assets/project-restaurant.png';
import project2 from '../assets/netflix.png';
import project3 from '../assets/travel.png';

// Defined outside component — stable reference, never re-created
const typewriterEffect = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
};

const characterAnimation = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 }
};

const LINE1 = '👋 Hi, I\'m';
const LINE2 = 'Muhammad Hammad,';
const LINE3 = 'a Web Developer';

const renderTypewriter = (text) =>
    text.split('').map((char, index) => (
        <motion.span key={index} variants={characterAnimation}>
            {char === ' ' ? '\u00A0' : char}
        </motion.span>
    ));

// Pre-render so memo comparison works
const line1Rendered = renderTypewriter(LINE1);
const line2Rendered = renderTypewriter(LINE2);
const line3Rendered = renderTypewriter(LINE3);

const MagneticButton = memo(({ children, href, download = false, target = '_self', onClick, className = '' }) => {
    const btnRef = useRef(null);
    const mX = useMotionValue(0);
    const mY = useMotionValue(0);

    const springX = useSpring(mX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mY, { stiffness: 150, damping: 15 });

    const handleMouseMove = useCallback((e) => {
        if (!btnRef.current) return;
        const { left, top, width, height } = btnRef.current.getBoundingClientRect();
        mX.set(e.clientX - (left + width / 2));
        mY.set(e.clientY - (top + height / 2));
    }, [mX, mY]);

    const handleMouseLeave = useCallback(() => { mX.set(0); mY.set(0); }, [mX, mY]);

    return (
        <motion.a
            ref={btnRef}
            href={href}
            className={`hero-cyber-btn ${className}`}
            target={target}
            download={download}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 25px var(--primary-color)' }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            <div className="btn-shine"></div>
        </motion.a>
    );
});

const Hero = memo(() => {
    const handleScroll = useCallback((e, id) => {
        e.preventDefault();
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    }, []);

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
                            <span style={{ display: 'block', marginBottom: '0.2rem', fontSize: '0.8em' }}>{line1Rendered}</span>
                            <span style={{ display: 'block', marginBottom: '0.2rem', color: 'var(--primary-color)', whiteSpace: 'nowrap' }}>{line2Rendered}</span>
                            <span style={{ display: 'block', fontSize: '0.8em' }}>{line3Rendered}</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 0.7 }}
                    >
                        Crafting high-performance, beautiful, and interactive web experiences with modern technologies. Let's build something amazing together.
                    </motion.p>

                    <motion.div
                        className="hero-cta"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.7 }}
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
                            animate={{ y: [-10, 10, -10], rotate: [-5, -2, -5] }}
                            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src={project1} alt="Restaurant Project" width="300" height="200" loading="eager" fetchPriority="high" />
                        </motion.div>
                        <motion.div
                            className="floating-card card-2"
                            animate={{ y: [10, -10, 10], rotate: [5, 8, 5] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src={project2} alt="Netflix Clone" width="300" height="200" loading="eager" />
                        </motion.div>
                        <motion.div
                            className="floating-card card-3"
                            animate={{ y: [-5, 5, -5], rotate: [15, 12, 15] }}
                            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <img src={project3} alt="Travel Project" width="300" height="200" loading="eager" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Hero;
