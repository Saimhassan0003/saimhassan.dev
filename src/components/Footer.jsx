import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/footer.css';

const Footer = () => {
  const [showSticky, setShowSticky] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const hero = document.getElementById('hero');
    const onScroll = () => {
      if (!hero) { setShowSticky(window.scrollY > 400); return; }
      setShowSticky(window.scrollY > hero.offsetHeight - 100);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navCols = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', id: 'hero' },
        { label: 'Services', id: 'services' },
        { label: 'Portfolio', id: 'projects' },
        { label: 'Process', id: 'process' },
        { label: 'Skills', id: 'skills' },
        { label: 'Contact', id: 'contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'React Development', id: 'services' },
        { label: 'Full-Stack Apps', id: 'services' },
        { label: 'AI & ML Integration', id: 'services' },
        { label: 'UI/UX Design', id: 'services' },
        { label: 'E-commerce', id: 'services' },
        { label: 'Performance Audit', id: 'services' },
      ],
    },
  ];

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo-text">
                Saim<span className="footer-logo-dot">.</span>dev
              </div>
              <p className="footer-tagline">
                Full-Stack Development Partner for growing businesses.
                Transforming ideas into profitable digital products.
              </p>
              <div className="footer-cta-wrapper">
                <a
                  href="#contact"
                  className="footer-cta"
                  onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                >
                  📅 Book Free Consultation
                </a>
              </div>
              <div className="footer-social-row" style={{ marginTop: '1.25rem' }}>
                {[
                  { icon: '🐙', href: 'https://github.com/Saimhassan0003', label: 'GitHub' },
                  { icon: '💼', href: 'https://linkedin.com', label: 'LinkedIn' },
                  { icon: '💬', href: 'https://wa.me/923251013090', label: 'WhatsApp' },
                  { icon: '📧', href: 'mailto:saimhassantariq@gmail.com', label: 'Email' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-btn"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1 }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Nav Columns */}
            {navCols.map((col) => (
              <div key={col.title}>
                <div className="footer-nav-title">{col.title}</div>
                <div className="footer-nav-links">
                  {col.links.map((link) => (
                    <a
                      key={link.label}
                      className="footer-nav-link"
                      onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                      href={`#${link.id}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p className="footer-copyright">
              © {year} <span>Saim Hassan Tariq</span>. All rights reserved.
            </p>
            <p className="footer-made-with">
              Built with ⚛️ React · Framer Motion · ☕
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA Bar */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            className="sticky-cta visible"
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <p className="sticky-cta-text">
              Ready to build something great? <span>Let's talk →</span>
            </p>
            <motion.a
              href="#contact"
              className="btn btn-primary btn-sm"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
            >
              Book Free Consultation
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Float */}
      <motion.a
        href="https://wa.me/923251013090"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        whileHover={{ scale: 1.12 }}
        aria-label="Chat on WhatsApp"
      >
        💬
      </motion.a>
    </>
  );
};

export default Footer;
