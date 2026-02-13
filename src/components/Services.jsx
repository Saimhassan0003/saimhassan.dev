import React from 'react';
import { motion } from 'framer-motion';
import '../styles/services.css';

const Services = () => {
    const services = [
        {
            title: 'Web Development',
            description: 'Building modern, responsive web applications using React.js and latest web technologies with pixel-perfect designs.',
            icon: '💻'
        },
        {
            title: 'React Development',
            description: 'Expert in creating dynamic, high-performance React applications with advanced concepts and best practices.',
            icon: '⚛️'
        },
        {
            title: 'Machine Learning Integration',
            description: 'Implementing ML models and AI solutions into web applications for intelligent, data-driven experiences.',
            icon: '🤖'
        },
        {
            title: 'UI/UX Design',
            description: 'Designing beautiful, intuitive user interfaces with focus on user experience and modern design principles.',
            icon: '🎨'
        },
        {
            title: 'Frontend Optimization',
            description: 'Optimizing web applications for performance, SEO, and accessibility to deliver the best user experience.',
            icon: '⚡'
        },
        {
            title: 'Responsive Design',
            description: 'Creating mobile-first, responsive designs that work seamlessly across all devices and screen sizes.',
            icon: '📱'
        }
    ];

    return (
        <section id="services" className="services section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <h2 className="heading-lg text-center">What I Do</h2>
                    <p className="section-subtitle">My Services</p>
                </motion.div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="service-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
