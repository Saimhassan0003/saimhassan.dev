import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/skills.css';

const categories = [
  {
    title: 'Frontend Development',
    skills: [
      { icon: '⚛️', name: 'React.js',       level: 'expert' },
      { icon: '📜', name: 'JavaScript ES6+', level: 'expert' },
      { icon: '🌐', name: 'HTML5 / CSS3',   level: 'expert' },
      { icon: '🌊', name: 'Tailwind CSS',    level: 'advanced' },
    ],
  },
  {
    title: 'Backend & Database',
    skills: [
      { icon: '🐍', name: 'Python / Django', level: 'advanced' },
      { icon: '📦', name: 'Node.js / Express', level: 'intermediate' },
      { icon: '🍃', name: 'MongoDB',          level: 'advanced' },
      { icon: '🗄️', name: 'PostgreSQL',       level: 'intermediate' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { icon: '🤖', name: 'TensorFlow',      level: 'intermediate' },
      { icon: '📊', name: 'Scikit-learn',    level: 'advanced' },
      { icon: '🐼', name: 'Pandas / NumPy',  level: 'advanced' },
      { icon: '🧠', name: 'Deep Learning',   level: 'intermediate' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { icon: '🐙', name: 'GitHub / Git',   level: 'advanced' },
      { icon: '⚡', name: 'Vite / Webpack', level: 'advanced' },
      { icon: '▲',  name: 'Vercel / AWS',   level: 'intermediate' },
      { icon: '🎨', name: 'Figma',          level: 'advanced' },
    ],
  },
];

const allTags = [
  'React.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS',
  'Python', 'Django', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
  'TensorFlow', 'Scikit-learn', 'Git', 'Vercel', 'AWS', 'Figma', 'REST APIs',
  'Framer Motion', 'GSAP', 'Redux', 'Next.js'
];

function SkillBar({ level, delay = 0 }) {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setAnimated(true), delay); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div className="skill-bar-track" ref={ref}>
      <div className={`skill-bar-fill ${level} ${animated ? 'animated' : ''}`} />
    </div>
  );
}

const Skills = () => {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag">Expertise</span>
          <h2 className="heading-lg heading-lg-light">Technologies & <span style={{ color: '#64FFDA' }}>Expertise</span></h2>
          <div className="divider-dark divider-dark-center" />
          <p className="section-subtitle section-subtitle-light">
            A carefully curated tech stack for building modern, scalable digital products.
          </p>
        </motion.div>

        <div className="skills-categories">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className="skills-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              <div className="skills-category-title">{cat.title}</div>
              <div className="skills-grid">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-row-header">
                      <span className="skill-name">
                        <span className="skill-icon">{skill.icon}</span>
                        {skill.name}
                      </span>
                      <span className={`skill-level-tag ${skill.level}`}>
                        {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                      </span>
                    </div>
                    <SkillBar level={skill.level} delay={si * 150} />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tag Cloud */}
        <motion.div
          className="skills-tag-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="skills-tag-label">Also Working With</p>
          <div className="skills-tags">
            {allTags.map((tag, i) => (
              <motion.span
                key={tag}
                className="skill-tag-pill"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
