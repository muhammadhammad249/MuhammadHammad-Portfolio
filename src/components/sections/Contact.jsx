import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaEnvelope, FaCopy, FaCheck, FaGithub, FaLinkedin, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';
import Toast from '../ui/Toast';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    hp: '' // honeypot
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  const { playClick, playPop, playChime } = useSound();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    playPop();
    setCopied(true);
    setToast({
      type: 'success',
      title: 'Email Copied!',
      message: `${portfolioData.personal.email} copied to clipboard.`
    });
    setTimeout(() => {
      setCopied(false);
      setToast(null);
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check for bots
    if (formData.hp) {
      console.warn('Bot detected by honeypot.');
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({
        type: 'error',
        title: 'Missing Fields',
        message: 'Please complete all required fields.'
      });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    playClick();
    setStatus('loading');

    // Simulate sending or mailto fallback
    setTimeout(() => {
      setStatus('success');
      playChime();
      setToast({
        type: 'success',
        title: 'Transmission Received!',
        message: 'Thank you for reaching out, Hammad will respond within 24 hours.'
      });

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '', hp: '' });

      setTimeout(() => {
        setStatus('idle');
        setToast(null);
      }, 5000);
    }, 1200);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">12 / Initiate Connection</span>
          <h2 className="section-title">
            Let’s Build Something <span className="gradient-text">Exceptional</span>
          </h2>
          <p className="section-subtitle">
            Whether you have an ambitious product to engineer, a question about my work, or a full-time role to discuss, my inbox is open.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Social Channels */}
          <motion.div
            className="contact-info-col glass-panel"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="contact-col-title">Direct Channels</h3>
            <p className="contact-col-desc">
              Feel free to send an inquiry via the form or reach out through direct email and social channels.
            </p>

            <div className="contact-method-cards">
              {/* Email Card */}
              <div className="method-card glass-panel" onClick={handleCopyEmail}>
                <div className="method-icon-wrap">
                  <FaEnvelope />
                </div>
                <div className="method-meta">
                  <span className="method-label">Official Email</span>
                  <span className="method-val">{portfolioData.personal.email}</span>
                </div>
                <button
                  className="copy-chip-btn"
                  title="Click to copy email"
                  aria-label="Copy email"
                >
                  {copied ? <FaCheck className="green" /> : <FaCopy />}
                </button>
              </div>

              {/* Location Card */}
              <div className="method-card glass-panel">
                <div className="method-icon-wrap cyan">
                  <FaMapMarkerAlt />
                </div>
                <div className="method-meta">
                  <span className="method-label">Base Location</span>
                  <span className="method-val">{portfolioData.personal.location.label}</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="contact-socials-wrapper">
              <span className="socials-label">Social Ecosystem:</span>
              <div className="contact-social-pills">
                <a
                  href={portfolioData.personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill glass-panel"
                >
                  <FaGithub /> <span>GitHub</span>
                </a>
                <a
                  href={portfolioData.personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill glass-panel"
                >
                  <FaLinkedin /> <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="contact-form-col glass-panel"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Honeypot field (hidden from legitimate users) */}
              <input
                type="text"
                name="hp"
                value={formData.hp}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Your Name *</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Morgan"
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@domain.com"
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">Subject / Purpose</label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack Role / Project Inquiry"
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Project Details &amp; Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or requirements..."
                  rows="5"
                  required
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-magnetic btn-primary-glow form-submit-btn"
              >
                {status === 'loading' ? (
                  <>
                    <FaSpinner className="spinner-icon" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="btn-icon" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}

