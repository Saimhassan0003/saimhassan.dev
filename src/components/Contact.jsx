import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/contact.css';

const channels = [
  { icon: '📧', label: 'Email', value: 'saimhassantariq0003@gmail.com', href: 'mailto:saimhassantariq@gmail.com' },
  { icon: '💬', label: 'WhatsApp', value: 'Chat Now', href: 'https://wa.me/923251013090' },
  { icon: '🐙', label: 'GitHub', value: 'Saimhassan0003', href: 'https://github.com/Saimhassan0003/saimhassan.dev' },
  { icon: '💼', label: 'LinkedIn', value: 'Connect with me', href: 'https://linkedin.com' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', type: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production: send to backend / Formspree / etc.
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-tag section-tag-light">Let's Work Together</span>
          <h2 className="heading-lg">Start Your <span style={{ color: '#0A192F' }}>Project Today</span></h2>
          <div className="divider-dark divider-dark-center" />
          <p className="section-subtitle">
            Have a project in mind? Let's talk about how we can bring your idea to life.
          </p>
        </motion.div>

        <div className="contact-layout">
          {/* ─ Left Info ─ */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Availability */}
            <div className="contact-availability">
              <span className="pulse-dot" />
              <div className="availability-text">
                <span className="availability-status">✓ Available for new projects</span>
                <span className="availability-detail">Typically replies within 2 hours</span>
              </div>
            </div>

            <div>
              <h3 className="contact-info-headline">Let's Build Something<br />Amazing Together</h3>
            </div>

            <p className="contact-info-desc">
              Whether you need a full product build, a React frontend, or AI integration —
              I'm ready to become your dedicated technical partner. Book a free 30-minute
              discovery call and let's map out your project together.
            </p>

            {/* Social Proof */}
            <div className="contact-proof-row">
              {[
                { icon: '⚡', text: 'Avg reply: 2 hours' },
                { icon: '🎯', text: '100% response rate' },
                { icon: '📅', text: 'Avg project: 4–8 weeks' },
                { icon: '✅', text: '50+ projects delivered' },
              ].map((p) => (
                <div key={p.text} className="proof-item">
                  <span className="proof-icon">{p.icon}</span>
                  {p.text}
                </div>
              ))}
            </div>

            {/* Channels */}
            <div className="contact-channels">
              {channels.map((c) => (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-card"
                  whileHover={{ y: -3 }}
                >
                  <div className="channel-icon">{c.icon}</div>
                  <div>
                    <div className="channel-label">{c.label}</div>
                    <div className="channel-value">{c.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ─ Right Form ─ */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  className="form-success"
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="form-success-icon">🎉</div>
                  <div className="form-success-title">Message Sent!</div>
                  <p className="form-success-text">
                    Thanks for reaching out. I'll get back to you within 2 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="contact-form-title">Get a Free Estimate</div>
                  <div className="contact-form-subtitle">Fill in the details below and I'll get back to you quickly.</div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input
                        name="name" required
                        className="form-input"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input
                        name="email" type="email" required
                        className="form-input"
                        placeholder="john@company.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Project Type</label>
                    <select name="type" className="form-select" value={form.type} onChange={handleChange}>
                      <option value="">Select type...</option>
                      <option>Web Application</option>
                      <option>E-commerce Store</option>
                      <option>AI / ML Integration</option>
                      <option>Landing Page</option>

                      <option>Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tell Me About Your Project</label>
                    <textarea
                      name="message" required
                      className="form-textarea"
                      placeholder="Describe your project, goals, and any specific requirements..."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="form-submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    📅 Send Message & Get Estimate
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
