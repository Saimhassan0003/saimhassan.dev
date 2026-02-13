import React from 'react';
import { motion } from 'framer-motion';
import '../styles/contact.css';

const Contact = () => {
    const contactInfo = [
        { icon: '📧', title: 'Email', value: 'saimhassantariq@gmail.com', link: 'mailto:saimhassantariq@gmail.com' },
        { icon: '📱', title: 'Phone', value: '03251013090', link: 'tel:03251013090' },
        { icon: '�', title: 'WhatsApp', value: 'Chat Now', link: 'https://wa.me/923251013090' },
        { icon: '�📍', title: 'Location', value: 'Lahore', link: null },
        { icon: '🐙', title: 'GitHub', value: 'View Profile', link: 'https://github.com' },
        { icon: '💼', title: 'LinkedIn', value: 'Connect', link: 'https://linkedin.com' }
    ];

    return (
        <section id="contact" className="contact section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <h2 className="heading-lg text-center">Get In Touch</h2>
                    <p className="section-subtitle">Let's connect!</p>
                </motion.div>

                <div className="contact-content">
                    <motion.div
                        className="contact-grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={index}
                                href={info.link}
                                target={info.link && info.link.startsWith('http') ? "_blank" : "_self"}
                                rel={info.link && info.link.startsWith('http') ? "noopener noreferrer" : ""}
                                className={`contact-card ${!info.link ? 'no-hover' : ''}`}
                                whileHover={info.link ? { y: -5, boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.3)" } : {}}
                                style={{ cursor: info.link ? 'pointer' : 'default' }}
                            >
                                <div className="contact-icon">{info.icon}</div>
                                <div>
                                    <h3>{info.title}</h3>
                                    <p>{info.value}</p>
                                </div>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
