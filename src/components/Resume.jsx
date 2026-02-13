import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/resume.css';

const Resume = () => {
    const [activeTab, setActiveTab] = useState('education');

    const tabs = [
        { id: 'education', label: 'Education' },
        { id: 'skills', label: 'Professional Skills' },
        { id: 'experience', label: 'Experience' }
    ];

    const education = [
        {
            degree: 'Bachelor in Computer Science',
            institution: 'Comsats University Islamabad',
            period: '2022 - 2026',
            description: 'Focused on software development, web technologies, and machine learning. Completed various projects in React.js and Python.'
        },
        {
            degree: 'Intermediate in Computer Science',
            institution: 'Govt college Vehari',
            period: '2020 - 2022',
            description: 'Studied fundamental computer science concepts, programming basics, and mathematics.'
        }
    ];

    const skills = [
        { name: 'React.js', level: 90 },
        { name: 'JavaScript', level: 80 },
        { name: 'HTML5 & CSS3', level: 98 },
        { name: 'Python', level: 75 },
        { name: 'Machine Learning', level: 70 },
        { name: 'UI/UX Design', level: 90 }
    ];

    const experience = [
        {
            title: 'Frontend Developer (React Expert)',
            company: 'Skillware4u',
            period: '2025 - Present',
            description: 'Building modern web applications using React.js, creating responsive designs, and implementing machine learning features.'
        },
        {
            title: 'Machine Learning Engineer',
            company: 'Skillware4u',
            period: '2024 (6 months)',
            description: 'Developed and maintained web applications, collaborated with design team, and learned industry best practices.'
        }
    ];

    return (
        <section id="resume" className="resume section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <h2 className="heading-lg text-center">My Resume</h2>
                    <p className="section-subtitle">My professional journey</p>
                </motion.div>

                {/* Tab Buttons */}
                <motion.div
                    className="resume-tabs"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </motion.div>

                {/* Tab Content */}
                <div className="resume-content">
                    {/* Education Tab */}
                    {activeTab === 'education' && (
                        <motion.div
                            className="tab-panel"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="tab-title">Education Quality</h3>
                            <div className="timeline">
                                {education.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="timeline-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <span className="timeline-period">{item.period}</span>
                                            <h4 className="timeline-title">{item.degree}</h4>
                                            <p className="timeline-subtitle">{item.institution}</p>
                                            <p className="timeline-description">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Skills Tab */}
                    {activeTab === 'skills' && (
                        <motion.div
                            className="tab-panel"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="tab-title">Professional Skills</h3>
                            <div className="skills-grid">
                                {skills.map((skill, index) => (
                                    <motion.div
                                        key={index}
                                        className="skill-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="skill-header">
                                            <span className="skill-name">{skill.name}</span>
                                            <span className="skill-percentage">{skill.level}%</span>
                                        </div>
                                        <div className="skill-bar">
                                            <motion.div
                                                className="skill-progress"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                            ></motion.div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Experience Tab */}
                    {activeTab === 'experience' && (
                        <motion.div
                            className="tab-panel"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="tab-title">Job Experience</h3>
                            <div className="timeline">
                                {experience.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="timeline-item"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <span className="timeline-period">{item.period}</span>
                                            <h4 className="timeline-title">{item.title}</h4>
                                            <p className="timeline-subtitle">{item.company}</p>
                                            <p className="timeline-description">{item.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Resume;
