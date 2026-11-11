import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useKonami } from '../../hooks/useKonami';
import { useSound } from '../../hooks/useSound';

export default function EasterEgg() {
  const [active, setActive] = useState(false);
  const canvasRef = useRef(null);
  const { playChime } = useSound();

  const triggerEgg = () => {
    setActive(true);
    playChime();
    setTimeout(() => setActive(false), 5500);
  };

  useKonami(triggerEgg);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);

    const colors = ['#7C3AED', '#6366F1', '#22D3EE', '#34D399', '#F472B6', '#FBBF24'];
    const particles = Array.from({ length: 150 }, () => ({
      x: W / 2,
      y: H / 2,
      w: Math.random() * 10 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 24,
      vy: (Math.random() - 0.7) * 22,
      gravity: 0.38,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      opacity: 1,
    }));

    let animId;
    const render = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.rotation += p.vRot;
        p.opacity -= 0.003;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.opacity, 0);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <>
      <AnimatePresence>
        {active && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 99990, pointerEvents: 'none' }}>
            <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                bottom: '120px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(10, 11, 20, 0.92)',
                border: '1px solid #7C3AED',
                padding: '16px 28px',
                borderRadius: '9999px',
                boxShadow: '0 0 35px rgba(124, 58, 237, 0.6), 0 0 10px rgba(34, 211, 238, 0.4)',
                backdropFilter: 'blur(16px)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#FFFFFF',
                pointerEvents: 'auto',
                zIndex: 99991,
              }}
            >
              <span style={{ fontSize: '24px' }}>🎮</span>
              <div>
                <p style={{ fontWeight: 800, fontSize: '15px', color: '#22D3EE', margin: 0, letterSpacing: '0.04em' }}>
                  KONAMI CODE ACTIVATED!
                </p>
                <p style={{ fontSize: '12px', color: '#CBD5E1', margin: 0 }}>
                  You found Muhammad Hammad's secret developer mode!
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

