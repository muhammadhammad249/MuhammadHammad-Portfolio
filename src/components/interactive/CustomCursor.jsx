import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() => {
    return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Lighter spring — less mass, faster settle
  const springConfig = { damping: 28, stiffness: 400, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Refs for RAF throttling
  const rafId = useRef(null);
  const pendingPos = useRef({ x: -100, y: -100 });
  const spotlightRef = useRef(null);
  // Throttle cursor-type checks (mouseover fires constantly)
  const overTimer = useRef(null);

  useEffect(() => {
    if (isTouchDevice) return;

    spotlightRef.current = document.querySelector('.spotlight-glow');

    const handleMouseMove = (e) => {
      pendingPos.current = { x: e.clientX, y: e.clientY };
      if (rafId.current) return; // already scheduled
      rafId.current = requestAnimationFrame(() => {
        const { x, y } = pendingPos.current;
        mouseX.set(x);
        mouseY.set(y);
        // Direct element update — prevents full-document style invalidation
        if (spotlightRef.current) {
          spotlightRef.current.style.setProperty('--mouse-x', `${x}px`);
          spotlightRef.current.style.setProperty('--mouse-y', `${y}px`);
        }
        if (!isVisible) setIsVisible(true);
        rafId.current = null;
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Throttle cursor-type detection to 60ms intervals
    const handleMouseOver = (e) => {
      if (overTimer.current) return;
      overTimer.current = setTimeout(() => {
        overTimer.current = null;
        const target = e.target;
        if (!target) return;
        const interactive = target.closest('a, button, [role="button"], input, textarea, select, .interactive-card');
        const projectCard = target.closest('.project-card-interactive');
        const dragArea = target.closest('.draggable-bubble-canvas, .drag-handle');
        if (dragArea) setCursorType('drag');
        else if (projectCard) setCursorType('view');
        else if (interactive) setCursorType('link');
        else setCursorType('default');
      }, 60);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(overTimer.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Outer follow ring */}
      <motion.div
        className={`custom-cursor-ring cursor-${cursorType}`}
        style={{ x: smoothX, y: smoothY }}
      >
        {cursorType === 'view' && <span className="cursor-label">VIEW</span>}
        {cursorType === 'drag' && <span className="cursor-label">DRAG</span>}
      </motion.div>

      {/* Instant inner pointer dot */}
      <motion.div
        className={`custom-cursor-dot cursor-${cursorType}`}
        style={{ x: mouseX, y: mouseY }}
      />
    </>
  );
}

