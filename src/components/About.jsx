import React from 'react';
import { motion } from 'framer-motion';
import '../styles/about.css';

const About = () => {
    return (
        <section id="about" className="about section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <h2 className="heading-lg text-center">About Me</h2>
                    <p className="section-subtitle">Get to know me better</p>
                </motion.div>

                <motion.div
                    className="about-content-wrapper"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="about-intro">

                        <p className="about-intro-subtitle">Frontend Developer | React Expert | ML Enthusiast</p>
                    </div>

                    <div className="about-description-grid">
                        <div className="about-description-card">
                            <p className="about-description">
                                I'm a passionate Frontend Developer specializing in React.js with expertise in building modern,
                                responsive web applications. I create beautiful, pixel-perfect user interfaces that provide
                                exceptional user experiences across all devices.
                            </p>
                            <p className="about-description">
                                My journey in frontend development has equipped me with a diverse skill set in modern
                                frameworks and libraries. I'm constantly learning and staying updated with the latest
                                React.js features, design trends, and best practices in web development.
                            </p>
                        </div>

                        <div className="about-tech-card">
                            <h3 className="about-tech-title">Technologies I Work With</h3>
                            <div className="tech-tags">
                                <span className="tech-tag">React.js</span>
                                <span className="tech-tag">JavaScript</span>
                                <span className="tech-tag">HTML5</span>
                                <span className="tech-tag">CSS3</span>
                                <span className="tech-tag">Tailwind CSS</span>
                                <span className="tech-tag">Python</span>
                                <span className="tech-tag">Machine Learning</span>
                                <span className="tech-tag">Django</span>
                                <span className="tech-tag">MongoDB</span>
                                <span className="tech-tag">GitHub</span>
                                <span className="tech-tag">Ai Cursor</span>
                                <span className="tech-tag">Antigravity</span>
                                <span className="tech-tag">Github Copilot</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
