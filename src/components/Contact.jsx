import React, { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

// Static data outside component – never re-generated on state change
const SPACE_PARTICLES = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    top: (i * 1.67) % 100,
    left: (i * 7.3) % 100,
    opacity: 0.2 + (i % 7) * 0.08,
}));

const CODE_LINES = [
    'git push origin main',
    'npm run build',
    'const x = new App();',
    'docker-compose.yml',
    'api.v1.connect()',
    'system.init(status: 200)',
    "import { motion } from 'framer-motion';",
];

const CODE_LINE_STYLES = CODE_LINES.map((_, i) => ({
    top: `${10 + (i * 13) % 80}%`,
    left: `${5 + (i * 17) % 90}%`,
    animationDelay: `${(i * 1.4) % 10}s`,
}));

const Contact = memo(() => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        alert('Message sent! (Holographic transmission complete)');
        setFormData({ name: '', email: '', message: '' });
    }, []);

    return (
        <section id="contact" className="contact-section">
            <div className="cyber-bg">
                <div className="deep-space-bg"></div>
                <div className="digital-web"></div>

                <div className="space-particles">
                    {SPACE_PARTICLES.map((p) => (
                        <div
                            key={p.id}
                            className="particle"
                            style={{ top: `${p.top}%`, left: `${p.left}%`, opacity: p.opacity }}
                        />
                    ))}
                </div>

                <div className="code-dust">
                    {CODE_LINES.map((text, i) => (
                        <span key={i} className="code-line" style={CODE_LINE_STYLES[i]}>
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
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="contact-title">Get In Touch</h2>
                </motion.div>

                <div className="contact-grid">
                    <motion.div
                        className="contact-info-minimal"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
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

                    <motion.div
                        className="contact-form-glass"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <form className="glassmorphism-form" onSubmit={handleSubmit}>
                            <div className="form-inner-glow"></div>
                            <div className="input-field">
                                <label>Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
                            </div>
                            <div className="input-field">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email" />
                            </div>
                            <div className="input-field">
                                <label>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Your Message"></textarea>
                            </div>
                            <button type="submit" className="glass-submit-btn">Send Message</button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
});

export default Contact;
