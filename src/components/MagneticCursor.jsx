import React, { useEffect, useRef, useState } from 'react';
import '../styles/cursor.css';

const INTERACTIVE = 'a, button, [role="button"], input, select, textarea, .cursor-magnetic, .filter-btn, .service-card, .project-card, .phase-node, .channel-card, .testimonial-flip, .logo-chip, .skill-tag-pill';

const MagneticCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const animId  = useRef(null);
  const [hovering, setHovering]  = useState(false);
  const [clicking, setClicking]  = useState(false);
  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

  useEffect(() => {
    if (isTouchDevice()) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    const onOver = (e) => {
      if (e.target.closest(INTERACTIVE)) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest(INTERACTIVE)) setHovering(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    // Smooth ring follow
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left  = `${pos.current.x}px`;
        dotRef.current.style.top   = `${pos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      animId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(animId.current);
    };
  }, []);

  if (typeof window !== 'undefined' && isTouchDevice()) return null;

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${hovering ? 'hovering' : ''} ${clicking ? 'clicking' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'hovering' : ''} ${clicking ? 'clicking' : ''}`}
      />
    </>
  );
};

export default MagneticCursor;
