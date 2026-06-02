import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let cx = mx;
    let cy = my;
    let px = cx;
    let py = cy;
    let ang = 0;
    let scl = 1;
    let tscl = 1;
    let rafId: number;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener('mousemove', onMouseMove);

    const tick = () => {
      px = cx;
      py = cy;
      
      // Interpolate coordinates for buttery smooth lag/follow inertia
      cx = lerp(cx, mx, 0.12);
      cy = lerp(cy, my, 0.12);
      
      // Interpolate scale
      scl = lerp(scl, tscl, 0.14);
      
      // Calculate velocity vector of cursor speed
      const vx = cx - px;
      const vy = cy - py;
      const sp = Math.sqrt(vx * vx + vy * vy);
      
      // If moving, calculate angular direction and rotate the pointer tip
      if (sp > 0.04) {
        const ta = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
        let d = ta - ang;
        while (d > 180) d -= 360;
        while (d < -180) d += 360;
        ang += d * 0.13;
      }
      
      el.style.transform = `translate(${cx - 14}px,${cy - 14}px) rotate(${ang}deg) scale(${scl})`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const onEnter = () => (tscl = 1.55);
    const onLeave = () => (tscl = 1);

    // Apply interactive magnetic triggers to all links, buttons, cards, and inputs
    const updateListeners = () => {
      document
        .querySelectorAll('a, button, .c-card, .cs-dot, .glass-card, input, textarea')
        .forEach((interactiveNode) => {
          interactiveNode.addEventListener('mouseenter', onEnter);
          interactiveNode.addEventListener('mouseleave', onLeave);
        });
    };
    updateListeners();

    // Use MutationObserver to dynamically attach triggers to dynamically rendered nodes
    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 28,
        height: 28,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
      className="hidden md:block" // Hidden on touch viewports for native feel
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ 
          width: '100%', 
          height: '100%', 
          filter: 'drop-shadow(0 0 8px #e2b853)' // Premium gold glow drop shadow
        }}
      >
        <path
          d="M14.49 7.16 Q16 4 17.51 7.16 L25.49 23.84 Q27 27 23.5 27 L8.5 27 Q5 27 6.51 23.84 Z"
          fill="#e2b853" // Avenor Warm Gold
          opacity="0.9"
        />
      </svg>
    </div>
  );
}
