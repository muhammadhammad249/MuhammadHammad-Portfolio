import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaGithub, FaFigma, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiMongodb, SiExpress, SiVite, SiVercel, SiPostman, SiFramer } from 'react-icons/si';
import { portfolioData } from '../../data/portfolioData';
import BubblePlayground from '../interactive/BubblePlayground';
import './TechStack.css';

const ROW_ONE = [
  { name: 'React.js', icon: <FaReact />, color: '#61DAFB' },
  { name: 'Next.js 14', icon: <SiNextdotjs />, color: '#FFFFFF' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'JavaScript ES6+', icon: <FaJs />, color: '#F7DF1E' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
  { name: 'Framer Motion', icon: <SiFramer />, color: '#FF0055' },
  { name: 'HTML5 Semantic', icon: <FaHtml5 />, color: '#E34F26' },
  { name: 'CSS3 / Modern Layout', icon: <FaCss3Alt />, color: '#1572B6' },
];

const ROW_TWO = [
  { name: 'Node.js', icon: <FaNodeJs />, color: '#5FA04E' },
  { name: 'Express.js', icon: <SiExpress />, color: '#EEEEEE' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
  { name: 'REST APIs', icon: <SiPostman />, color: '#FF6C37' },
  { name: 'Git Versioning', icon: <FaGitAlt />, color: '#F05032' },
  { name: 'GitHub Ecosystem', icon: <FaGithub />, color: '#CBD5E1' },
  { name: 'Vite Tooling', icon: <SiVite />, color: '#646CFF' },
  { name: 'Vercel Deployment', icon: <SiVercel />, color: '#FFFFFF' },
  { name: 'Figma UI Sync', icon: <FaFigma />, color: '#F24E1E' },
];

export default function TechStack() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="tech-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-eyebrow">03 / Capabilities & Technologies</span>
          <h2 className="section-title">
            The Technology <span className="gradient-text">Arsenal</span>
          </h2>
          <p className="section-subtitle">
            A curated stack of battle-tested libraries, frameworks, and modern tools leveraged to build resilient digital products.
          </p>
        </div>

        {/* Dual Infinite Marquee */}
        <div className="marquee-wrapper">
          {/* Row 1: Leftward drift */}
          <div className="marquee-track marquee-left">
            <div className="marquee-items">
              {ROW_ONE.concat(ROW_ONE).map((item, idx) => (
                <div key={idx} className="tech-pill">
                  <span className="pill-icon" style={{ color: item.color }}>{item.icon}</span>
                  <span className="pill-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2: Rightward drift */}
          <div className="marquee-track marquee-right">
            <div className="marquee-items">
              {ROW_TWO.concat(ROW_TWO).map((item, idx) => (
                <div key={idx} className="tech-pill">
                  <span className="pill-icon" style={{ color: item.color }}>{item.icon}</span>
                  <span className="pill-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Physics Bubble Playground */}
        <div className="bubbles-container-wrapper">
          <BubblePlayground />
        </div>

        {/* Detailed Competency Matrix Tabs */}
        <div className="competency-matrix-section">
          <div className="category-tabs-bar">
            {portfolioData.skills.categories.map((cat, idx) => (
              <button
                key={cat.name}
                className={`category-tab-btn ${activeCategory === idx ? 'active' : ''}`}
                onClick={() => setActiveCategory(idx)}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="skills-meter-grid">
            {portfolioData.skills.categories[activeCategory].items.map((skill) => (
              <div key={skill.name} className="skill-meter-card glass-panel">
                <div className="skill-meter-top">
                  <span className="skill-meter-name">{skill.name}</span>
                  <span className="skill-meter-pct">{skill.level}%</span>
                </div>
                <div className="skill-meter-track">
                  <motion.div
                    className="skill-meter-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: `linear-gradient(90deg, #7C3AED, ${skill.color})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

