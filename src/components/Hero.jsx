import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import '../styles/hero.css';
import profileImg from '../assets/images/saim.jpeg';
import resume from '../assets/images/saim Resume_2.pdf';

/* ── Particle canvas ─────────────────────────────── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, particles = [], animId;

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMouse = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,255,218,${this.alpha})`;
        ctx.fill();
      }
      update() {
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - dist) / 100;
          this.x -= Math.cos(angle) * force * 3;
          this.y -= Math.sin(angle) * force * 3;
        } else {
          this.x += (this.baseX - this.x) * 0.05 + this.vx;
          this.y += (this.baseY - this.y) * 0.05 + this.vy;
          this.baseX += this.vx;
          this.baseY += this.vy;
          if (this.baseX < 0 || this.baseX > w) this.vx *= -1;
          if (this.baseY < 0 || this.baseY > h) this.vy *= -1;
        }
      }
    }

    const count = Math.min(80, Math.floor((w * h) / 15000));
    for (let i = 0; i < count; i++) particles.push(new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100,255,218,${0.08 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        particles[i].update();
        particles[i].draw();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />;
}

/* ── Animated Counter ────────────────────────────── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = () => {
          start += Math.ceil(target / 60);
          if (start >= target) { setCount(target); return; }
          setCount(start);
          requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Hero ────────────────────────────────────────── */
const Hero = () => {
  const expertiseCards = [
    { icon: '⚛️', label: 'React Expert', sub: 'Frontend Development', cls: 'expertise-card-1' },
    { icon: '🤖', label: 'ML Integration', sub: 'AI-Powered Solutions', cls: 'expertise-card-2' },
    { icon: '🚀', label: 'Full-Stack Dev', sub: 'End-to-End Products', cls: 'expertise-card-3' },
  ];

  return (
    <section id="hero" className="hero">
      <ParticleCanvas />

      <div className="hero-container">
        {/* ─ Left Content ─ */}
        <div className="hero-content">
          {/* Availability badge */}
          <motion.div
            className="hero-availability"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="pulse-dot" />
            Available for new projects
          </motion.div>

          <motion.p
            className="hero-label"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Full-Stack Development Partner
          </motion.p>

          <motion.h1
            className="hero-headline"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transforming Ideas Into{' '}
            <span className="highlight">Profitable Digital</span>{' '}
            Products
          </motion.h1>

          <motion.p
            className="hero-subheadline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your Technical Co-Founder for Growing Businesses
          </motion.p>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            I build modern, high-performance web products with React & AI integration —
            delivering measurable business outcomes, not just code.
          </motion.p>

          {/* Trust Badge */}
          <motion.div
            className="hero-trust-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span>50+ Projects Delivered</span>
            <div className="hero-trust-divider" />
            <span>98% Client Satisfaction</span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <motion.a
              href="#contact"
              className="btn btn-primary btn-lg"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              📅 Book Free Consultation
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {[
              { target: 50, suffix: '+', label: 'Projects Completed' },
              { target: 98, suffix: '%', label: 'Client Satisfaction' },
              { target: 2, suffix: '+', label: 'Years Experience' },
            ].map((s) => (
              <div className="hero-stat" key={s.label}>
                <span className="hero-stat-number">
                  <Counter target={s.target} suffix={s.suffix} />
                </span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─ Right Visual ─ */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {/* Profile Image */}
          <motion.div
            className="hero-image-wrapper"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="hero-image-ring" />
            <img src={profileImg} alt="Saim Hassan Tariq" className="hero-profile-img" />
          </motion.div>

          {/* Floating Cards */}
          {expertiseCards.map((card) => (
            <div key={card.cls} className={`expertise-card ${card.cls}`}>
              <span className="expertise-card-icon">{card.icon}</span>
              <div>
                <div className="expertise-card-label">{card.label}</div>
                <div className="expertise-card-sub">{card.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Cue */}
      <div className="hero-scroll-cue">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span className="scroll-label">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;    