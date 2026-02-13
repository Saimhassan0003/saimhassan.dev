import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/hero.css';
import profileImg from '../assets/images/saim - Copy.jpeg';

const Hero = () => {
    const roles = ['Frontend Developer', 'UI/UX Designer', 'React Expert'];
    const [currentRole, setCurrentRole] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const role = roles[currentRole];
        const typingSpeed = isDeleting ? 50 : 100;

        const timer = setTimeout(() => {
            if (!isDeleting) {
                setDisplayText(role.substring(0, displayText.length + 1));
                if (displayText === role) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setDisplayText(role.substring(0, displayText.length - 1));
                if (displayText === '') {
                    setIsDeleting(false);
                    setCurrentRole((prev) => (prev + 1) % roles.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentRole]);

    return (
        <section id="hero" className="hero">
            <div className="hero-container">
                {/* Content on LEFT side */}
                <div className="hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="greeting">Hi, I'm Saim Hassan Tariq</h2>
                        <h1 className="hero-title">
                            <span className="hero-role">a {displayText}<span className="typing-cursor">|</span></span>
                        </h1>
                        <p className="hero-subtitle">Professional Coder. Machine Learning Enthusiast.</p>
                    </motion.div>

                    <motion.p
                        className="hero-tagline"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        I build modern web applications with React and apply machine learning for intelligent solutions. Creating responsive, dynamic, and high-performance experiences.
                    </motion.p>

                    <motion.div
                        className="hero-buttons"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <a href="#projects" className="btn btn-primary">View Portfolio</a>
                        <a href="#contact" className="btn btn-outline">Contact Me</a>
                    </motion.div>
                </div>

                {/* Image on RIGHT side - InBio style */}
                <motion.div
                    className="hero-image"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="image-wrapper">
                        <img src={profileImg} alt="Saim Hassan Tariq" className="profile-img" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
