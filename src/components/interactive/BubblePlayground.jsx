import { useRef, useEffect, useCallback } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';

export default function BubblePlayground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const bubblesRef = useRef([]);
  const draggedBubble = useRef(null);
  const mousePos = useRef({ x: -1000, y: -1000, isDown: false });
  const animFrameId = useRef(null);
  const isVisibleRef = useRef(true);
  const lastTimeRef = useRef(0);
  const gradientMap = useRef(new Map());
  const { playPop } = useSound();

  const bubbleDefs = portfolioData.skills.bubbles;

  const initBubbles = useCallback((width, height) => {
    const W = Math.max(width || 800, 320);
    const H = Math.max(height || 480, 300);

    bubblesRef.current = bubbleDefs.map((def, i) => {
      const radius = W < 600 ? def.radius * 0.75 : def.radius;
      return {
        id: def.id,
        name: def.name,
        color: def.color,
        radius,
        x: (W / 5) * ((i % 4) + 1) + (Math.random() - 0.5) * 40,
        y: (H / 5) * (Math.floor(i / 4) + 1) + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        mass: radius * 0.5,
      };
    });
    gradientMap.current.clear();
  }, [bubbleDefs]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = (canvas.width = Math.max(container.clientWidth || 800, 320));
    let H = (canvas.height = Math.max(container.clientHeight || 480, 300));
    initBubbles(W, H);

    const observer = new IntersectionObserver(([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    const handleVisibility = () => { isVisibleRef.current = !document.hidden; };
    document.addEventListener('visibilitychange', handleVisibility);

    const updatePhysics = () => {
      const bubbles = bubblesRef.current;
      const mouse = mousePos.current;

      for (let i = 0; i < bubbles.length; i++) {
        const b = bubbles[i];
        if (b === draggedBubble.current) {
          b.vx = (mouse.x - b.x) * 0.35;
          b.vy = (mouse.y - b.y) * 0.35;
          b.x = mouse.x;
          b.y = mouse.y;
        } else {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130 && dist > 0) {
            const f = (1 - dist / 130) * 1.8;
            b.vx += (dx / dist) * f;
            b.vy += (dy / dist) * f;
          }

          b.x += b.vx;
          b.y += b.vy;
          b.vx = b.vx * 0.985 + (Math.random() - 0.5) * 0.03;
          b.vy = b.vy * 0.985 + (Math.random() - 0.5) * 0.03;

          if (b.x - b.radius < 0) { b.x = b.radius; b.vx = Math.abs(b.vx) * 0.8; }
          else if (b.x + b.radius > W) { b.x = W - b.radius; b.vx = -Math.abs(b.vx) * 0.8; }
          if (b.y - b.radius < 0) { b.y = b.radius; b.vy = Math.abs(b.vy) * 0.8; }
          else if (b.y + b.radius > H) { b.y = H - b.radius; b.vy = -Math.abs(b.vy) * 0.8; }
        }

        for (let j = i + 1; j < bubbles.length; j++) {
          const b2 = bubbles[j];
          const dX = b2.x - b.x;
          const dY = b2.y - b.y;
          const d = Math.sqrt(dX * dX + dY * dY);
          const min = b.radius + b2.radius;
          if (d < min && d > 0) {
            const overlap = min - d;
            const nx = dX / d;
            const ny = dY / d;
            if (b !== draggedBubble.current) { b.x -= nx * overlap * 0.5; b.y -= ny * overlap * 0.5; }
            if (b2 !== draggedBubble.current) { b2.x += nx * overlap * 0.5; b2.y += ny * overlap * 0.5; }
            const p = (2 * (nx * (b.vx - b2.vx) + ny * (b.vy - b2.vy))) / (b.mass + b2.mass);
            if (b !== draggedBubble.current) { b.vx -= p * b2.mass * nx * 0.85; b.vy -= p * b2.mass * ny * 0.85; }
            if (b2 !== draggedBubble.current) { b2.vx += p * b.mass * nx * 0.85; b2.vy += p * b.mass * ny * 0.85; }
          }
        }
      }
    };

    const drawBubble = (b, isDragged) => {
      ctx.save();
      ctx.translate(b.x, b.y);

      ctx.beginPath();
      ctx.arc(0, 0, b.radius, 0, Math.PI * 2);

      let grad = gradientMap.current.get(b.id);
      if (!grad) {
        grad = ctx.createRadialGradient(-b.radius * 0.3, -b.radius * 0.3, b.radius * 0.1, 0, 0, b.radius);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
        grad.addColorStop(0.5, 'rgba(124, 58, 237, 0.1)');
        grad.addColorStop(1, 'rgba(5, 6, 12, 0.55)');
        gradientMap.current.set(b.id, grad);
      }
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.lineWidth = 1.75;
      ctx.strokeStyle = b.color;
      if (isDragged) { ctx.shadowColor = b.color; ctx.shadowBlur = 18; }
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(-b.radius * 0.25, -b.radius * 0.25, b.radius * 0.5, Math.PI * 1.1, Math.PI * 1.8);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `600 ${Math.max(b.radius * 0.32, 11)}px "Space Grotesk", sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.name, 0, 0);

      ctx.restore();
    };

    const render = (time) => {
      animFrameId.current = requestAnimationFrame(render);
      if (!isVisibleRef.current || time - lastTimeRef.current < 33) return;
      lastTimeRef.current = time;

      updatePhysics();
      ctx.clearRect(0, 0, W, H);
      bubblesRef.current.forEach(b => drawBubble(b, b === draggedBubble.current));
    };

    animFrameId.current = requestAnimationFrame(render);

    const getCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches && e.touches[0] ? e.touches[0] : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : null);
      return {
        x: (t ? t.clientX : e.clientX) - rect.left,
        y: (t ? t.clientY : e.clientY) - rect.top,
      };
    };

    const onDown = (e) => {
      const { x, y } = getCoords(e);
      mousePos.current = { x, y, isDown: true };
      for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
        const b = bubblesRef.current[i];
        if ((b.x - x) ** 2 + (b.y - y) ** 2 <= b.radius ** 2) {
          draggedBubble.current = b;
          playPop();
          break;
        }
      }
    };

    const onMove = (e) => {
      const { x, y } = getCoords(e);
      mousePos.current.x = x;
      mousePos.current.y = y;
    };

    const onUp = () => {
      mousePos.current.isDown = false;
      draggedBubble.current = null;
    };

    const onLeave = () => {
      mousePos.current = { x: -1000, y: -1000, isDown: false };
      draggedBubble.current = null;
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const nW = Math.max(Math.floor(entry.contentRect.width), 320);
        const nH = Math.max(Math.floor(entry.contentRect.height) || 480, 300);
        if (nW !== W || nH !== H) {
          W = canvas.width = nW;
          H = canvas.height = nH;
          gradientMap.current.clear();
        }
      }
    });
    ro.observe(container);

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    return () => {
      cancelAnimationFrame(animFrameId.current);
      observer.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [initBubbles, playPop]);

  return (
    <div
      ref={containerRef}
      className="draggable-bubble-canvas"
      style={{
        width: '100%',
        height: '480px',
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-glass)',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.25)',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      <div style={{ position: 'absolute', top: '16px', left: '20px', zIndex: 2, pointerEvents: 'none' }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'var(--accent-cyan)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            background: 'var(--bg-glass-hover)',
            padding: '4px 10px',
            borderRadius: '9999px',
            border: '1px solid var(--border-glass)',
          }}
        >
          ● Interactive Bubble Physics — Drag &amp; Toss!
        </span>
      </div>
      <canvas
        ref={canvasRef}
        style={{ display: 'block', width: '100%', height: '100%', cursor: 'grab', touchAction: 'none' }}
      />
    </div>
  );
}
