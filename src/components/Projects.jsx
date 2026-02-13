import React from 'react';
import { motion } from 'framer-motion';
import '../styles/projects.css';

const Projects = () => {
    const projects = [
        {
            title: 'Skillwares4u',
            description: 'A comprehensive educational platform built with React.js, offering interactive courses and learning resources with modern UI/UX design.',
            tech: ['React', 'JavaScript', 'CSS3', 'Responsive Design'],
            liveLink: 'https://saimhassan0003.github.io/newskillware4u/',
            githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=450&fit=crop'
        },
        {
            title: 'INTRA Fitout Portfolio',
            description: 'Premium corporate website for INTRA Fitout showcasing luxury UAE interior design projects with professional animations and responsive design.',
            tech: ['React', 'CSS Grid', 'Flexbox', 'Framer Motion'],
            liveLink: '#',
            githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
            image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&h=450&fit=crop'
        },
        {
            title: 'Skillware Website',
            description: 'Modern educational website with advanced animations, interactive elements, and fully responsive design for optimal user experience.',
            tech: ['React', 'Vite', 'CSS3', 'Animation Libraries'],
            liveLink: '#',
            githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop'
        },
        {
            title: 'Web-Based Brain Tumor Classification',
            description: 'Medical AI web application for brain tumor classification using MRI scans, deep learning models, and interactive dashboard with data visualization.',
            tech: ['Python', 'TensorFlow', 'Django', 'React'],
            liveLink: '#',
            githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
            image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=450&fit=crop'
        },
        {
            title: 'Personal Portfolio',
            description: 'Modern and professional personal portfolio website showcasing skills, projects, and experience with smooth animations and light theme.',
            tech: ['React', 'Vite', 'CSS3', 'Framer Motion'],
            liveLink: '#',
            githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=450&fit=crop'
        },
        {
            title: 'Counsel X',
            description: 'Professional counseling and consultation platform with appointment booking, user management, and interactive dashboard for seamless client experience.',
            tech: ['React', 'Node.js', 'MongoDB', 'Express'],
            liveLink: '#',
            githubLink: 'https://github.com/Saimhassan0003?tab=repositories',
            image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=450&fit=crop'
        }
    ];

    return (
        <section id="projects" className="projects section-padding">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="section-header"
                >
                    <h2 className="heading-lg text-center">My Projects</h2>
                    <p className="section-subtitle">Some of my recent work</p>
                </motion.div>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="project-image">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="project-img"
                                />
                                <div className="project-overlay">
                                    <h3 className="project-overlay-title">{project.title}</h3>
                                </div>
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <p className="project-description">{project.description}</p>
                                <div className="project-tech">
                                    {project.tech.map((tech, i) => (
                                        <span key={i} className="tech-tag">{tech}</span>
                                    ))}
                                </div>
                                <div className="project-buttons">
                                    <a href={project.githubLink} className="btn btn-outline btn-sm">GitHub</a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
