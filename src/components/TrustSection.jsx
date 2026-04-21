import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/trust.css';

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let v = 0;
        const step = () => {
          v += Math.ceil(target / 50);
          if (v >= target) { setCount(target); return; }
          setCount(v);
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



const metrics = [
  { icon: '🚀', target: 50, suffix: '+', label: 'Projects Delivered' },
  { icon: '⭐', target: 98, suffix: '%', label: 'Client Satisfaction' },
  { icon: '⚡', target: 2,  suffix: '+', label: 'Years Experience' },
  { icon: '🌍', target: 12, suffix: '+', label: 'Happy Clients' },
];

const techStack = [
  { icon: '⚛️', name: 'React.js' },
  { icon: '🐍', name: 'Python / Django' },
  { icon: '🤖', name: 'TensorFlow' },
  { icon: '🍃', name: 'MongoDB' },
  { icon: '☁️', name: 'AWS' },
  { icon: '▲', name: 'Vercel' },
  { icon: '🎨', name: 'Tailwind CSS' },
  { icon: '🐙', name: 'GitHub' },
  { icon: '📦', name: 'Node.js' },
  { icon: '🗄️', name: 'PostgreSQL' },
];

const testimonials = [
  {
    name: 'Saif Ur Rehman',
    role: 'Founder & CEO, Devugo Tech',
    company: 'Devugo Tech',
    photo: '/saif-avatar.png',
    initials: 'SR',
    stars: 5,
    front: 'Saim built our SaaS platform with incredible speed and precision.',
    back: 'Saim is an exceptional developer — he understood our MERN stack requirements instantly, delivered clean architecture, and the AI automation features he integrated have saved our team 20+ hours per week. Highly recommended for any serious tech project!',
  },
  {
    name: 'Hasnat Ahmad',
    role: 'CEO, Skillware4u',
    company: 'Skillware4u',
    photo: '/hasnat-avatar.png',
    initials: 'HA',
    stars: 5,
    front: 'Outstanding React work — our LMS platform looks and performs brilliantly.',
    back: 'Saim delivered a pixel-perfect, fully responsive educational platform for Skillware4u. His Moodle integration and React expertise were spot on. The platform now serves hundreds of students with zero downtime. A true professional!',
  },
  {
    name: 'Ahmed Raza',
    role: 'CEO, TechVentures PK',
    company: 'TechVentures PK',
    photo: null,
    initials: 'AR',
    stars: 5,
    front: 'Saim delivered our platform ahead of schedule with exceptional quality.',
    back: 'Working with Saim was a game-changer. He understood our vision instantly and the React app he built has increased our user engagement by 60%. Highly recommend!',
  },
];

const TrustSection = () => {
  const doubled = [...techStack, ...techStack];

  return (
    <section id="trust" className="trust">
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* ─ Metrics ─ */}
        <motion.div
          className="trust-metrics"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } }
          }}
        >
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              className="metric-card"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <div className="metric-icon">{m.icon}</div>
              <div className="metric-number">
                <Counter target={m.target} suffix={m.suffix} />
              </div>
              <div className="metric-label">{m.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ─ Tech Stack Carousel ─ */}
        <motion.div
          className="trust-logos-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="trust-logos-label">Technologies & Platforms We Work With</p>
          <div className="logos-track-wrapper">
            <div className="logos-track">
              {doubled.map((t, i) => (
                <div key={i} className="logo-chip">
                  <span className="logo-chip-icon">{t.icon}</span>
                  <span className="logo-chip-name">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ─ Testimonials ─ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="trust-testimonials-title">What Clients Say</p>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="testimonial-flip"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="testimonial-flip-inner">
                  {/* Front */}
                  <div className="testimonial-front">
                    <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
                    <p className="testimonial-text">"{t.front}"</p>
                    <div className="testimonial-author">
                      {t.photo ? (
                        <img src={t.photo} alt={t.name} className="testimonial-avatar-img" />
                      ) : (
                        <div className="testimonial-avatar">{t.initials}</div>
                      )}
                      <div>
                        <div className="testimonial-name">{t.name}</div>
                        <div className="testimonial-role">{t.role}</div>
                      </div>
                    </div>
                    <p className="testimonial-flip-hint" style={{ marginTop: '0.75rem' }}>
                      🔄 Hover for full review
                    </p>
                  </div>
                  {/* Back */}
                  <div className="testimonial-back">
                    <div className="testimonial-quote">"</div>
                    <p className="testimonial-back-text">{t.back}</p>
                    <div className="testimonial-author" style={{ marginTop: '1rem' }}>
                      {t.photo ? (
                        <img src={t.photo} alt={t.name} className="testimonial-avatar-img" />
                      ) : (
                        <div className="testimonial-avatar">{t.initials}</div>
                      )}
                      <div>
                        <div className="testimonial-name">{t.name}</div>
                        <div className="testimonial-role">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustSection;
