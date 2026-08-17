import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="social-links">
                    <a href="https://github.com/muhammadhammad249" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/muhammad-hammad-40a156290/" target="_blank" rel="noopener noreferrer" className="social-icon">
                        <FaLinkedin />
                    </a>
                </div>
                <p>&copy; 2025 Muhammad Hammad — Full Stack Developer. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
