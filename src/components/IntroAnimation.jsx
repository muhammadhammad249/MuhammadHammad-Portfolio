import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './IntroAnimation.css';

/* ── Utility: random float in range ── */
const rand = (min, max) => Math.random() * (max - min) + min;

/* ── Particle canvas ── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const PARTICLE_COUNT = 120;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      r: rand(0.5, 2.5),
      vx: rand(-0.3, 0.3),
      vy: rand(-0.4, -0.1),
      alpha: rand(0.3, 0.9),
    }));

    // Glowing lines between close particles
    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99,179,237,${0.08 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139,207,255,${p.alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#63b3ed';
        ctx.fill();
        ctx.shadowBlur = 0;

        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) { p.y = H + 5; p.x = rand(0, W); }
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
      });
      drawLines();
      animFrame = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="intro-canvas" />;
};

/* ── Typewriter hook ── */
const useTypewriter = (text, speed = 55, startDelay = 0) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(startTimer);
  }, [text, speed, startDelay]);
  return { displayed, done };
};



/* ── Scene timing (ms) ── */
const SCENE_TIMINGS = [0, 800, 1700, 2800, 4100, 5300];
// scene 0 = particles only
// scene 1 = "HELLO, I'M"
// scene 2 = "MUHAMMAD HAMMAD"
// scene 3 = role + stack (typewriter)
// scene 4 = tech icons
// scene 5 = tagline + exit

const IntroAnimation = ({ onFinish }) => {
  const [scene, setScene] = useState(0);
  const [exiting, setExiting] = useState(false);

  // Role typewriter (starts at scene 3)
  const { displayed: roleText, done: roleTyped } = useTypewriter(
    'Full Stack Developer',
    60,
    scene >= 3 ? 0 : 999999
  );
  const { displayed: stackText } = useTypewriter(
    'React.js  •  Next.js  •  Node.js  •  MongoDB',
    35,
    scene >= 3 ? 1200 : 999999
  );

  useEffect(() => {
    const timers = SCENE_TIMINGS.map((t, i) =>
      setTimeout(() => setScene(i), t)
    );
    // exit transition at 6800ms
    const exitTimer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onFinish?.(), 900);
    }, 6800);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          className="intro-root"
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {/* Particle background */}
          <ParticleCanvas />

          {/* Radial glow orbs */}
          <div className="intro-orb intro-orb-1" />
          <div className="intro-orb intro-orb-2" />
          <div className="intro-orb intro-orb-3" />

          {/* Grid overlay */}
          <div className="intro-grid" />

          {/* ── Scene 1: HELLO, I'M ── */}
          <AnimatePresence>
            {scene >= 1 && (
              <motion.p
                className="intro-hello"
                key="hello"
                initial={{ opacity: 0, y: 18, letterSpacing: '0.6em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '0.4em' }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                HELLO, I'M
              </motion.p>
            )}
          </AnimatePresence>

          {/* ── Scene 2: MUHAMMAD HAMMAD ── */}
          <AnimatePresence>
            {scene >= 2 && (
              <motion.h1
                className="intro-name"
                key="name"
                initial={{ opacity: 0, scale: 0.78 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="intro-name-word">MUHAMMAD</span>
                <span className="intro-name-word intro-name-accent">HAMMAD</span>
              </motion.h1>
            )}
          </AnimatePresence>

          {/* ── Scene 3: Role + Stack ── */}
          <AnimatePresence>
            {scene >= 3 && (
              <motion.div
                className="intro-role-block"
                key="role"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <div className="intro-role-line">
                  <span className="intro-cursor-blink">|</span>
                  <span className="intro-role-text">{roleText}</span>
                </div>
                <div className="intro-stack">{stackText}</div>
              </motion.div>
            )}
          </AnimatePresence>



          {/* ── Scene 5: Tagline ── */}
          <AnimatePresence>
            {scene >= 5 && (
              <div className="intro-tagline-wrapper">
                <motion.p
                  className="intro-tagline"
                  key="tagline"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                >
                  Crafting Modern, Scalable &amp; User-Centric Web Experiences
                </motion.p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default IntroAnimation;
