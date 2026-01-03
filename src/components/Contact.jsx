import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert('Message sent! (Holographic transmission complete)');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="contact-section">
            <div className="cyber-bg">
                <div className="deep-space-bg"></div>
                <div className="digital-web"></div>

                {/* Space Particles */}
                <div className="space-particles">
                    {[...Array(60)].map((_, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: 0.2 + Math.random() * 0.6
                            }}
                        />
                    ))}
                </div>

                {/* Floating Code Text */}
                <div className="code-dust">
                    {[
                        "git push origin main",
                        "npm run build",
                        "const x = new App();",
                        "docker-compose.yml",
                        "api.v1.connect()",
                        "system.init(status: 200)",
                        "import { motion } from 'framer-motion';"
                    ].map((text, i) => (
                        <span
                            key={i}
                            className="code-line"
                            style={{
                                top: `${10 + Math.random() * 80}%`,
                                left: `${5 + Math.random() * 90}%`,
                                animationDelay: `${Math.random() * 10}s`
                            }}
                        >
                            {text}
                        </span>
                    ))}
                </div>
            </div>

            <div className="container contact-wrapper">
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="contact-title">Get In Touch</h2>
                </motion.div>

                <div className="contact-grid">
                    {/* Left: Contact Info Info Panel */}
                    <motion.div
                        className="contact-info-minimal"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="minimal-item">
                            <FaEnvelope className="m-icon" />
                            <div className="m-text">
                                <span>Email</span>
                                <a href="mailto:muhammadhammadjato65@gmail.com">muhammadhammadjato65@gmail.com</a>
                            </div>
                        </div>

                        <div className="minimal-item">
                            <FaGithub className="m-icon" />
                            <div className="m-text">
                                <span>GitHub</span>
                                <a href="https://github.com/muhammadhammad249" target="_blank" rel="noopener noreferrer">github.com/muhammadhammad249</a>
                            </div>
                        </div>

                        <div className="minimal-item">
                            <FaLinkedin className="m-icon" />
                            <div className="m-text">
                                <span>LinkedIn</span>
                                <a href="https://www.linkedin.com/in/muhammad-hammad-40a156290/" target="_blank" rel="noopener noreferrer">linkedin.com/in/muhammad-hammad-40a156290</a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        className="contact-form-glass"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <form className="glassmorphism-form" onSubmit={handleSubmit}>
                            <div className="form-inner-glow"></div>

                            <div className="input-field">
                                <label>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                />
                            </div>

                            <div className="input-field">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Email"
                                />
                            </div>

                            <div className="input-field">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Message"
                                ></textarea>
                            </div>

                            <button type="submit" className="glass-submit-btn">
                                Send Message
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
