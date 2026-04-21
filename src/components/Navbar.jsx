import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // Active section detection
      const sections = ['hero', 'trust', 'services', 'projects', 'process', 'skills', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'hero',     label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Portfolio' },
    { id: 'process',  label: 'Process' },
    { id: 'skills',   label: 'Skills' },
    { id: 'contact',  label: 'Contact' },
  ];

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-container">
          {/* Logo */}
          <motion.div
            className="navbar-logo"
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.04 }}
          >
            <span className="logo-text">
              Saim<span className="logo-dot">.</span>dev
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="navbar-desktop">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`navbar-link ${activeSection === link.id ? 'active-link' : ''}`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            onClick={() => scrollToSection('contact')}
            className="navbar-cta"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Let's Talk
          </motion.a>

          {/* Hamburger */}
          <div
            className={`navbar-hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(0,0,0,0.6)',
                zIndex: 1000
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              className="navbar-mobile-menu"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="mobile-links">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="mobile-link"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  className="mobile-cta-wrapper"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a
                    onClick={() => scrollToSection('contact')}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                  >
                    Let's Talk
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
