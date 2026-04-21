import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/projects.css';

const ALL = 'All';

const projects = [
  {
    title: 'SEHATTI — Workplace Wellbeing Portal',
    description: 'A confidential workplace wellbeing diagnostic platform for employees and HR leaders across the GCC region. Features a 5-minute diagnostic survey that generates personalized wellbeing reports, helping organizations identify and address employee wellness gaps.',
    tech: ['React', 'Vite', 'Framer Motion', 'Vercel'],
    category: 'Web App',
    metric: '⚡ 5-min diagnostic survey',
    liveLink: 'https://sehatti-survery-kr17.vercel.app',
    githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=450&fit=crop',
  },
  {
    title: 'ESOL Education Platform',
    description: 'Pixel-perfect replica and enhancement of the official ESOL UK education website. Features a full course catalog (A1–C2 levels), live class booking, SELT test info, SCQF database integration, and pricing pages. Globally recognized English language qualifications platform.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
    category: 'Web App',
    metric: '↑ Multi-page full replica',
    liveLink: 'https://saimhassan0003.github.io/education-website/',
    githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop',
  },
  {
    title: 'Skillwares4u Platform',
    description: 'Comprehensive educational platform with interactive courses, live quizzes, and progress tracking. Increased student engagement by 60%.',
    tech: ['React', 'JavaScript', 'CSS3', 'Firebase'],
    category: 'Web App',
    metric: '↑ 60% engagement',
    githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=450&fit=crop',
  },
  {
    title: 'INTRA Fitout Portfolio',
    description: 'Premium corporate website for UAE luxury interior design firm. Professional animations, project gallery, and client portal.',
    tech: ['React', 'Framer Motion', 'CSS Grid', 'GSAP'],
    category: 'Web App',
    metric: '↑ 3x lead generation',
    liveLink: '#',
    githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=450&fit=crop',
  },
  {
    title: 'NeuroScan AI Diagnostic',
    description: 'Medical AI platform for brain tumor classification using MRI scans. Deep learning model with 94% accuracy, integrated clinical dashboard.',
    tech: ['Python', 'TensorFlow', 'Django', 'React'],
    category: 'ML & AI',
    metric: '94% model accuracy',
    liveLink: '#',
    githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=450&fit=crop',
  },
  {
    title: 'Counsel X Platform',
    description: 'Professional counseling & consultation booking app with real-time scheduling, video integration, and encrypted client records.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express'],
    category: 'Web App',
    metric: '↑ 40% booking rate',
    liveLink: '#',
    githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop',
  },
  {
    title: 'Sales Prediction Engine',
    description: 'Machine learning system that predicts quarterly sales with 89% accuracy using historical data, seasonal patterns and market signals.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
    category: 'ML & AI',
    metric: '89% prediction accuracy',
    liveLink: '#',
    githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop',
  },
];

const categories = [ALL, 'Web App', 'ML & AI'];

/* Magnetic hover card */
function MagneticCard({ children }) {
  const ref = useRef(null);
  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.06;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.06;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleLeave = () => { ref.current.style.transform = 'translate(0,0)'; };
  return (
    <div ref={ref} onMouseMove={handleMove} onMouseLeave={handleLeave} style={{ transition: 'transform 0.3s ease', height: '100%' }}>
      {children}
    </div>
  );
}

const Projects = () => {
  const [active, setActive] = useState(ALL);

  const filtered = active === ALL ? projects : projects.filter(p => p.category === active);

  return (
    <section id="projects" className="projects">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Portfolio</span>
          <h2 className="heading-lg heading-lg-light">Featured <span style={{ color: '#64FFDA' }}>Work</span></h2>
          <div className="divider-dark divider-dark-center" />
          <p className="section-subtitle section-subtitle-light">
            Real projects. Real results. Delivered for real businesses.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="projects-filters">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <MagneticCard>
                  <div className="project-card">
                    {/* Image */}
                    <div className="project-img-wrapper">
                      <img src={p.image} alt={p.title} className="project-img" />
                      <div className="project-img-overlay">
                        {p.liveLink && p.liveLink !== '#' && (
                          <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="project-overlay-btn">
                            🔗 Live Demo
                          </a>
                        )}
                        <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="project-overlay-btn">
                          GitHub
                        </a>
                      </div>
                      <span className="project-category-badge">{p.category}</span>
                    </div>

                    {/* Body */}
                    <div className="project-body">
                      <h3 className="project-title">{p.title}</h3>
                      <p className="project-description">{p.description}</p>
                      {p.metric && (
                        <div className="project-metric">
                          <span>📈</span>{p.metric}
                        </div>
                      )}
                      <div className="project-tech-row">
                        {p.tech.map((t) => (
                          <span key={t} className="project-tech-tag">{t}</span>
                        ))}
                      </div>
                      <div className="project-card-footer">
                        <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="project-card-link">
                          GitHub ↗
                        </a>
                        {p.liveLink && p.liveLink !== '#' && (
                          <a href={p.liveLink} target="_blank" rel="noopener noreferrer" className="project-card-link">
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </MagneticCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <div className="projects-cta">
          <motion.a
            href="https://github.com/Saimhassan0003?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-lg"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            View All Projects on GitHub ↗
          </motion.a>
          <p className="projects-cta-note">Want to discuss your project? → Book a free consultation</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
