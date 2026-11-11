import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';
import './Testimonials.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const { playClick } = useSound();
  const list = portfolioData.testimonials;

  const handlePrev = () => {
    playClick();
    setCurrent((prev) => (prev - 1 + list.length) % list.length);
  };

  const handleNext = () => {
    playClick();
    setCurrent((prev) => (prev + 1) % list.length);
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">09 / Endorsements &amp; Trust</span>
          <h2 className="section-title">
            Words from <span className="gradient-text">Collaborators</span>
          </h2>
          <p className="section-subtitle">
            What engineering managers, product leads, and peers say about my technical velocity and design craft.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="testimonial-carousel-wrapper">
          <div className="testimonial-card-frame">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="testimonial-card glass-panel"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="quote-mark-badge">
                  <FaQuoteLeft />
                </div>

                <div className="stars-row">
                  {Array.from({ length: list[current].rating }).map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>

                <p className="testimonial-quote">
                  "{list[current].content}"
                </p>

                <div className="testimonial-author-row">
                  <div className="author-avatar-orb">
                    {list[current].avatar}
                  </div>
                  <div>
                    <h4 className="author-name">{list[current].name}</h4>
                    <p className="author-role">
                      {list[current].role} • <span className="author-company">{list[current].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="testimonial-controls">
            <button
              className="carousel-btn prev"
              onClick={handlePrev}
              aria-label="Previous Testimonial"
            >
              <FaChevronLeft />
            </button>

            <div className="carousel-dots">
              {list.map((_, idx) => (
                <button
                  key={idx}
                  className={`dot-pill ${idx === current ? 'active' : ''}`}
                  onClick={() => {
                    playClick();
                    setCurrent(idx);
                  }}
                  aria-label={`Jump to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              className="carousel-btn next"
              onClick={handleNext}
              aria-label="Next Testimonial"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

