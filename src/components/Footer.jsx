import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-logo">
                        <span className="logo-text">Portfolio<span className="logo-dot">.</span></span>
                    </div>

                    <div className="footer-social">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">GitHub</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">Twitter</a>
                    </div>

                    <div className="footer-copyright">
                        <p>&copy; {currentYear} Saim Hassan Tariq. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
