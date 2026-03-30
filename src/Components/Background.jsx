import React, { useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 28;
const DOT_RADIUS = 1.1;
const GLOW_RADIUS = 180;
const GLOW_STRENGTH = 0.55;
const ACCENT = '52, 211, 153';

const Background = () => {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(null);
  const dirtyRef  = useRef(true);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.width  / dpr;
    const H = canvas.height / dpr;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(dpr, dpr);

    const { x: mx, y: my } = mouseRef.current;
    const cx = W * 0.5;
    const cy = H * 0.38;

    // Center ambient glow
    const ambientGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.55);
    ambientGrad.addColorStop(0,   `rgba(${ACCENT}, 0.06)`);
    ambientGrad.addColorStop(0.5, `rgba(${ACCENT}, 0.02)`);
    ambientGrad.addColorStop(1,   'transparent');
    ctx.fillStyle = ambientGrad;
    ctx.fillRect(0, 0, W, H);

    // Dot grid
    const cols = Math.ceil(W / GRID_SIZE) + 1;
    const rows = Math.ceil(H / GRID_SIZE) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * GRID_SIZE;
        const y = r * GRID_SIZE;

        const dist = Math.hypot(x - mx, y - my);
        const centerDist = Math.hypot(x - cx, y - cy);

        const centerBoost = Math.max(0, 1 - centerDist / (Math.max(W, H) * 0.5));
        const baseAlpha = 0.07 + centerBoost * 0.06;

        const cursorBoost = dist < GLOW_RADIUS
          ? GLOW_STRENGTH * Math.pow(1 - dist / GLOW_RADIUS, 2)
          : 0;

        const alpha = Math.min(baseAlpha + cursorBoost, 0.72);

        ctx.beginPath();
        ctx.arc(x, y, DOT_RADIUS + cursorBoost * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${alpha})`;
        ctx.fill();
      }
    }

    // Cursor halo
    if (mx > 0 && mx < W) {
      const cursorGrad = ctx.createRadialGradient(mx, my, 0, mx, my, GLOW_RADIUS);
      cursorGrad.addColorStop(0,   `rgba(${ACCENT}, 0.08)`);
      cursorGrad.addColorStop(0.4, `rgba(${ACCENT}, 0.03)`);
      cursorGrad.addColorStop(1,   'transparent');
      ctx.fillStyle = cursorGrad;
      ctx.fillRect(0, 0, W, H);
    }

    ctx.restore();
    dirtyRef.current = false;
  }, []);

  const scheduleRedraw = useCallback(() => {
    if (dirtyRef.current) return;
    dirtyRef.current = true;
    rafRef.current = requestAnimationFrame(draw);
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      dirtyRef.current = true;
      draw();
    };

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      scheduleRedraw();
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      scheduleRedraw();
    };

    resize();
    window.addEventListener('resize',       resize,       { passive: true });
    window.addEventListener('mousemove',    onMouseMove,  { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('resize',       resize);
      window.removeEventListener('mousemove',    onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [draw, scheduleRedraw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default Background;
