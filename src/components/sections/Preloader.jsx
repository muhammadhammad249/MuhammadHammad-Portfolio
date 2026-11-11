import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('Initializing system...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const inc = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + inc, 100);

        if (next < 30) setPhaseText('Synthesizing design tokens...');
        else if (next < 65) setPhaseText('Loading interactive components...');
        else if (next < 95) setPhaseText('Establishing WebGL atmosphere...');
        else setPhaseText('Welcome to Muhammad Hammad’s Portfolio');

        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsDone(true);
        setTimeout(() => {
          onComplete?.();
        }, 700);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top and bottom curtain panels for dramatic curtain reveal */}
          <motion.div
            className="curtain-panel curtain-top"
            exit={{ y: '-100%' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          />
          <motion.div
            className="curtain-panel curtain-bottom"
            exit={{ y: '100%' }}
            transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          />

          <motion.div
            className="preloader-content"
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Animated Monogram Logo */}
            <div className="preloader-monogram-box">
              <svg width="84" height="84" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="preGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED" />
                    <stop offset="50%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
                <rect
                  x="4"
                  y="4"
                  width="92"
                  height="92"
                  rx="24"
                  fill="none"
                  stroke="url(#preGrad)"
                  strokeWidth="2"
                  opacity="0.4"
                />
                <path
                  d="M 22 72 L 22 28 L 36 50 L 50 28 L 50 72"
                  fill="none"
                  stroke="url(#preGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 58 28 L 58 72 M 58 50 L 78 50 M 78 28 L 78 72"
                  fill="none"
                  stroke="url(#preGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Percentage counter */}
            <div className="preloader-counter">
              <span className="counter-num">{progress}</span>
              <span className="counter-percent">%</span>
            </div>

            {/* Progress bar track */}
            <div className="preloader-track">
              <motion.div
                className="preloader-bar"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* System phase text */}
            <p className="preloader-phase">{phaseText}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

