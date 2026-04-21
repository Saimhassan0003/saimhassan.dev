import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/services.css';

const services = [
  {
    icon: '⚛️',
    title: 'React & Frontend Development',
    description: 'Pixel-perfect, high-performance interfaces using React.js with modern patterns and blazing-fast load times.',
    features: ['Component Architecture', 'State Management', 'Performance Optimization', 'Responsive Design'],
  },
  {
    icon: '🖥️',
    title: 'Full-Stack Web Applications',
    description: 'End-to-end web products with robust backends, RESTful APIs, and seamlessly connected frontends.',
    features: ['Django / Node.js backends', 'REST APIs', 'Database Design', 'Authentication & Security'],
  },
  {
    icon: '🤖',
    title: 'AI & ML Integration',
    description: 'Intelligent solutions powered by machine learning — from predictive models to AI-enhanced user experiences.',
    features: ['TensorFlow / PyTorch', 'Data Preprocessing', 'Model Deployment', 'AI-Powered Features'],
  },
  {
    icon: '🛒',
    title: 'E-Commerce Solutions',
    description: 'Conversion-optimised storefronts with seamless checkout, inventory management, and analytics dashboards.',
    features: ['Product Catalogs', 'Payment Integration', 'Order Management', 'Analytics Dashboard'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design & Prototyping',
    description: 'Beautiful, intuitive interfaces designed with user psychology in mind — not just aesthetics.',
    features: ['Figma Prototypes', 'User Research', 'Design Systems', 'Accessibility (WCAG)'],
  },
  {
    icon: '⚡',
    title: 'Performance & SEO Optimization',
    description: 'Speed and visibility improvements that directly impact revenue — because fast sites convert.',
    features: ['Core Web Vitals', 'SEO Audit & Fix', 'Code Splitting', 'Image Optimization'],
  },
];

const pricingTiers = [
  {
    plan: 'Starter',
    usd: '$299',
    pkr: 'PKR 85k',
    period: 'per project',
    features: [
      'Responsive Single Page App',
      'Up to 5 sections',
      'Contact form integration',
      'Mobile optimized',
      '2 rounds of revisions',
    ],
    cta: 'Get Started',
  },
  {
    plan: 'Professional',
    usd: '$799',
    pkr: 'PKR 225k',
    period: 'per project',
    features: [
      'Full multi-page web app',
      'Backend API integration',
      'Database & authentication',
      'Performance optimization',
      'Unlimited revisions',
    ],
    cta: 'Book a Call',
    featured: true,
  },
  {
    plan: 'Enterprise',
    usd: 'Custom',
    pkr: 'Custom',
    period: 'contact us',
    features: [
      'Full-stack product build',
      'AI / ML integration',
      'Scalable architecture',
      'Dedicated support',
      'IP ownership transfer',
    ],
    cta: "Let's Talk",
  },
];

/* 3D Tilt Card */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
  };

  const handleLeave = () => {
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={ref}
      className={`service-tilt-wrapper ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: 'transform 0.3s ease' }}
    >
      {children}
    </div>
  );
}

const Services = () => {
  const [currency, setCurrency] = React.useState('usd');

  return (
    <section id="services" className="services">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag section-tag-light">What We Deliver</span>
          <h2 className="heading-lg">Solutions That Drive <span style={{ color: '#0A192F' }}>Real Results</span></h2>
          <div className="divider-dark divider-dark-center" />
          <p className="section-subtitle">
            Not just development services — but business outcomes engineered for growth.
          </p>
        </motion.div>

        {/* Service Cards */}
        <div className="services-grid">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <TiltCard>
                <div className="service-card">
                  <div className="service-icon-box">{s.icon}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <p className="service-description">{s.description}</p>
                  <ul className="service-features">
                    {s.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Pricing */}
        <motion.div
          className="pricing-section"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="pricing-header">
            <h3 className="pricing-title">Transparent Pricing</h3>
            <p className="pricing-subtitle">No hidden fees — just results-driven development.</p>

            {/* Currency Toggle */}
            <div className="currency-toggle-wrapper">
              <span className={`currency-label ${currency === 'usd' ? 'active' : ''}`}>🇺🇸 USD</span>
              <div
                className={`currency-toggle ${currency === 'pkr' ? 'pkr' : ''}`}
                onClick={() => setCurrency(c => c === 'usd' ? 'pkr' : 'usd')}
              >
                <div className="currency-toggle-ball" />
              </div>
              <span className={`currency-label ${currency === 'pkr' ? 'active' : ''}`}>🇵🇰 PKR</span>
            </div>
          </div>

          <div className="pricing-grid">
            {pricingTiers.map((tier, i) => (
              <motion.div
                key={tier.plan}
                className={`pricing-card ${tier.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {tier.featured && <div className="pricing-badge">Most Popular</div>}
                <div className="pricing-plan">{tier.plan}</div>
                <motion.div
                  className="pricing-price"
                  key={currency + tier.plan}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {currency === 'usd' ? tier.usd : tier.pkr}
                </motion.div>
                <div className="pricing-period">{tier.period}</div>
                <ul className="pricing-features">
                  {tier.features.map((f) => (
                    <li key={f}>
                      <span className="pricing-check">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#contact"
                  className={`btn ${tier.featured ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center', borderColor: '#64FFDA', color: tier.featured ? '#0A192F' : '#64FFDA' }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                >
                  {tier.cta}
                </motion.a>
              </motion.div>
            ))}
          </div>


          <div className="services-book-cta">
            <motion.a
              href="#contact"
              className="btn btn-gold btn-lg"
              style={{ marginTop: '1rem' }}
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              📅 Book Free 30-Min Consultation
            </motion.a>
            <p className="book-cta-note">No commitment required · Get a custom project estimate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
