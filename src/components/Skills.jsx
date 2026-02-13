import React from 'react';
import { motion } from 'framer-motion';
import '../styles/skills.css';

const Skills = () => {
    const skills = [
        { name: 'React.js', level: 'Expert', icon: '⚛️' },
        { name: 'JavaScript', level: 'Advanced', icon: '📜' },
        { name: 'HTML5', level: 'Expert', icon: '🌐' },
        { name: 'CSS3', level: 'Expert', icon: '🎨' },
        { name: 'Bootstrap', level: 'Advanced', icon: '🅱️' },
        { name: 'Tailwind CSS', level: 'Advanced', icon: '🌊' },
        { name: 'Django', level: 'Intermediate', icon: '🐍' },
        { name: 'MongoDB', level: 'Intermediate', icon: '🍃' },
        { name: 'GitHub', level: 'Advanced', icon: '🐙' },
        { name: 'Machine Learning', level: 'Intermediate', icon: '🤖' },
        { name: 'Responsive Design', level: 'Expert', icon: '📱' },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="skills" className="skills section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <h2 className="heading-lg text-center">My Skills</h2>
                    <p className="section-subtitle">Technologies I work with</p>
                </motion.div>

                <motion.div
                    className="skills-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            className="skill-card"
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                        >
                            <div className="skill-icon-wrapper">
                                <span className="skill-icon">{skill.icon}</span>
                            </div>
                            <h3 className="skill-name">{skill.name}</h3>
                            <div className="skill-bar-container">
                                <div className={`skill-bar ${skill.level.toLowerCase()}`}></div>
                            </div>
                            <p className="skill-level">{skill.level}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
