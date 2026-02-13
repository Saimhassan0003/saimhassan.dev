import React from 'react';
import { motion } from 'framer-motion';
import '../styles/experience.css';

const Experience = () => {
    const experiences = [
        {
            company: 'Skillware4u',
            role: 'Frontend Developer (React Expert)',
            duration: '2025 - Present',
            responsibilities: [
                'Developed responsive web applications using React.js and modern JavaScript',
                'Built pixel-perfect user interfaces with advanced React concepts',
                'Collaborated with cross-functional teams to deliver high-quality projects',
                'Implemented state management and optimized application performance'
            ]
        },
        {
            company: 'Skillware4u',
            role: 'ML Developer',
            duration: '2024 - Present (6 month)',
            responsibilities: [
                'Developed machine learning models and algorithms',
                'Implemented data preprocessing and feature engineering',
                'Worked on predictive analytics and model optimization',
                'Integrated ML solutions with web applications'
            ]
        }
    ];

    return (
        <section id="experience" className="experience section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <h2 className="heading-lg text-center">Work Experience</h2>
                    <p className="section-subtitle">My professional path</p>
                </motion.div>

                <div className="experience-timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="experience-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="experience-header">
                                <h3 className="experience-role">{exp.role}</h3>
                                <span className="experience-duration">{exp.duration}</span>
                            </div>
                            <h4 className="experience-company">{exp.company}</h4>
                            <ul className="experience-responsibilities">
                                {exp.responsibilities.map((resp, i) => (
                                    <li key={i}>{resp}</li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
