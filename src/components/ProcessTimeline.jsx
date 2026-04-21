import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/timeline.css';

const phases = [
  {
    icon: '🔍',
    title: 'Discovery',
    duration: 'Day 1–2',
    desc: 'Deep-dive into your business goals, target audience, and technical requirements.',
    deliverables: [
      'Project brief & scope document',
      'Competitor analysis',
      'Tech stack recommendation',
      'Timeline & milestones',
    ],
  },
  {
    icon: '🎨',
    title: 'Design',
    duration: 'Day 3–7',
    desc: 'Wireframes, mockups and interactive prototype — approved before a line of code is written.',
    deliverables: [
      'Low-fi wireframes',
      'High-fi Figma mockups',
      'Responsive layouts',
      'Client approval checkpoint',
    ],
  },
  {
    icon: '⚙️',
    title: 'Development',
    duration: 'Week 2–5',
    desc: 'Agile sprints with weekly demos. Clean, documented, production-ready code.',
    deliverables: [
      'Frontend components',
      'Backend APIs',
      'Database schema',
      'Weekly demo calls',
    ],
  },
  {
    icon: '🧪',
    title: 'Testing',
    duration: 'Week 5–6',
    desc: 'Cross-browser, cross-device, performance and security testing before launch.',
    deliverables: [
      'Browser compatibility',
      'Performance audit',
      'Security review',
      'UAT with client',
    ],
  },
  {
    icon: '🚀',
    title: 'Launch',
    duration: 'Week 6–7',
    desc: 'Smooth deployment to production with zero downtime, monitoring and handover docs.',
    deliverables: [
      'Production deployment',
      'DNS & SSL setup',
      'Analytics integration',
      'Full handover docs',
    ],
  },
  {
    icon: '🔧',
    title: 'Support',
    duration: 'Ongoing',
    desc: 'Post-launch support, bug fixes, and feature iterations to keep your product growing.',
    deliverables: [
      '30-day warranty',
      'Bug fix guarantee',
      'Feature iterations',
      'Monthly progress reports',
    ],
  },
];

const ProcessTimeline = () => {
  const [activePhase, setActivePhase] = useState(null);
  const [lineAnimated, setLineAnimated] = useState(false);
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Intersection observer for line animation
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setLineAnimated(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // Drag-to-scroll
  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - wrapperRef.current.offsetLeft;
    scrollLeft.current = wrapperRef.current.scrollLeft;
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    const x = e.pageX - wrapperRef.current.offsetLeft;
    wrapperRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };
  const onMouseUp = () => { isDragging.current = false; };

  return (
    <section id="process" className="process" ref={sectionRef}>
      <div className="container">
        <motion.div
          className="process-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag section-tag-light">How We Work</span>
          <h2 className="heading-lg">Streamlined <span style={{ color: '#0A192F' }}>Development Process</span></h2>
          <div className="divider-dark divider-dark-center" />
          <p className="section-subtitle">
            A proven 6-phase process that delivers on time, on budget, and beyond expectations.
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll */}
      <div
        className="process-scroll-wrapper"
        ref={wrapperRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <div className="process-track">
          {/* connecting line */}
          <div className="process-line">
            <div className={`process-line-fill ${lineAnimated ? 'animated' : ''}`} />
          </div>

          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              className={`process-phase ${activePhase === i ? 'active' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div
                className="phase-node"
                onClick={() => setActivePhase(activePhase === i ? null : i)}
              >
                <span>{phase.icon}</span>
                <span className="phase-number">{i + 1}</span>
              </div>

              <div className="phase-content">
                <div className="phase-title">{phase.title}</div>
                <div className="phase-duration">{phase.duration}</div>
                <p className="phase-desc">{phase.desc}</p>
              </div>

              {/* Expanded panel */}
              <AnimatePresence>
                {activePhase === i && (
                  <motion.div
                    className="phase-detail"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="phase-detail-title">Deliverables</div>
                    <ul className="phase-deliverables">
                      {phase.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="process-cta">
        <motion.a
          href="#contact"
          className="btn btn-primary btn-lg"
          whileHover={{ scale: 1.04, y: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        >
          Start Your Project →
        </motion.a>
        <p className="process-hint">👆 Click any phase to see deliverables · Drag to scroll</p>
      </div>
    </section>
  );
};

export default ProcessTimeline;
