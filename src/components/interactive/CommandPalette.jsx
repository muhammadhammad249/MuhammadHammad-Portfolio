import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaMoon, FaSun, FaFire, FaVolumeUp, FaVolumeMute, FaCopy, FaFilePdf, FaGithub, FaLinkedin, FaTimes } from 'react-icons/fa';
import { portfolioData } from '../../data/portfolioData';
import { useSound } from '../../hooks/useSound';
import './CommandPalette.css';

export default function CommandPalette({ isOpen, onClose, theme, toggleTheme, setTheme, isMuted, toggleSound }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const { playClick, playWhoosh } = useSound();

  const actions = [
    {
      id: 'sec-home',
      category: 'Navigation',
      label: 'Home / Hero',
      description: 'Back to top overview',
      perform: () => {
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-about',
      category: 'Navigation',
      label: 'About Muhammad Hammad',
      description: 'Bio, philosophy & stats',
      perform: () => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-bento',
      category: 'Navigation',
      label: 'Interactive Bento Grid',
      description: 'Bento highlights, stats & live widgets',
      perform: () => {
        document.getElementById('bento')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-projects',
      category: 'Navigation',
      label: 'Featured Projects',
      description: '14+ web applications & case studies',
      perform: () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-skills',
      category: 'Navigation',
      label: 'Tech Stack & Bubble Physics',
      description: 'Interactive draggable bubble playground',
      perform: () => {
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-experience',
      category: 'Navigation',
      label: 'Experience & Education',
      description: 'Internships at IIFA Tech, Preesoft, DevTechnoz & Superior University',
      perform: () => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-services',
      category: 'Navigation',
      label: 'Services & Offerings',
      description: 'Frontend, Full Stack, UI/UX & Optimization',
      perform: () => {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-process',
      category: 'Navigation',
      label: '4-Step Workflow',
      description: 'From discovery to deployment',
      perform: () => {
        document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-faq',
      category: 'Navigation',
      label: 'Frequently Asked Questions',
      description: 'Timelines, rates & collaboration',
      perform: () => {
        document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'sec-contact',
      category: 'Navigation',
      label: 'Contact & Hire',
      description: 'Direct inquiry form & details',
      perform: () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        onClose();
      }
    },
    {
      id: 'theme-crimson',
      category: 'Preferences',
      label: 'Switch to Crimson Velvet (Red + Charcoal)',
      description: 'Luxury deep charcoal & velvet crimson red aesthetic',
      icon: <FaFire style={{ color: '#F43F5E' }} />,
      perform: (e) => {
        if (setTheme) {
          setTheme('crimson', e);
        } else {
          toggleTheme(e);
        }
        onClose();
      }
    },
    {
      id: 'theme-dark',
      category: 'Preferences',
      label: 'Switch to Cyber Dark Theme',
      description: 'Deep obsidian and cyber-violet glow',
      icon: <FaMoon />,
      perform: (e) => {
        if (setTheme) {
          setTheme('dark', e);
        } else {
          toggleTheme(e);
        }
        onClose();
      }
    },
    {
      id: 'theme-light',
      category: 'Preferences',
      label: 'Switch to Clean Light Theme',
      description: 'High-contrast crafted light mode',
      icon: <FaSun />,
      perform: (e) => {
        if (setTheme) {
          setTheme('light', e);
        } else {
          toggleTheme(e);
        }
        onClose();
      }
    },
    {
      id: 'theme-toggle',
      category: 'Preferences',
      label:
        theme === 'crimson'
          ? 'Cycle Theme (Next: Cyber Dark)'
          : theme === 'dark'
          ? 'Cycle Theme (Next: Clean Light)'
          : 'Cycle Theme (Next: Crimson Velvet)',
      description: 'Circular reveal theme transition',
      icon: theme === 'crimson' ? <FaMoon /> : theme === 'dark' ? <FaSun /> : <FaFire style={{ color: '#F43F5E' }} />,
      perform: (e) => {
        toggleTheme(e);
        onClose();
      }
    },
    {
      id: 'sound-toggle',
      category: 'Preferences',
      label: isMuted ? 'Enable Sound FX' : 'Mute Sound FX',
      description: 'Subtle synthetic Web Audio effects',
      icon: isMuted ? <FaVolumeUp /> : <FaVolumeMute />,
      perform: () => {
        toggleSound();
      }
    },
    {
      id: 'copy-email',
      category: 'Quick Actions',
      label: copied ? 'Email Copied to Clipboard!' : 'Copy Email Address',
      description: portfolioData.personal.email,
      icon: <FaCopy />,
      perform: () => {
        navigator.clipboard.writeText(portfolioData.personal.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    },
    {
      id: 'download-resume',
      category: 'Quick Actions',
      label: 'Download Resume (PDF)',
      description: 'Muhammad Hammad’s official CV',
      icon: <FaFilePdf />,
      perform: () => {
        window.open(portfolioData.personal.resumeUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'open-github',
      category: 'Socials',
      label: 'Open GitHub Profile',
      description: portfolioData.personal.socials.github,
      icon: <FaGithub />,
      perform: () => {
        window.open(portfolioData.personal.socials.github, '_blank', 'noopener,noreferrer');
        onClose();
      }
    },
    {
      id: 'open-linkedin',
      category: 'Socials',
      label: 'Open LinkedIn Profile',
      description: portfolioData.personal.socials.linkedin,
      icon: <FaLinkedin />,
      perform: () => {
        window.open(portfolioData.personal.socials.linkedin, '_blank', 'noopener,noreferrer');
        onClose();
      }
    }
  ];

  const filtered = actions.filter((act) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      act.label.toLowerCase().includes(q) ||
      act.description.toLowerCase().includes(q) ||
      act.category.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      playWhoosh();
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, playWhoosh]);

  const handleClose = useCallback(() => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K toggle
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(true); // open trigger
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          playClick();
          filtered[selectedIndex].perform();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, filtered, selectedIndex, playClick, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="palette-backdrop" onClick={handleClose}>
          <motion.div
            className="palette-modal glass-panel"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.94, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header search bar */}
            <div className="palette-search-wrapper">
              <FaSearch className="palette-search-icon" />
              <input
                ref={inputRef}
                type="text"
                className="palette-input"
                placeholder="Type a command or jump to section... (e.g. Projects, Theme, Resume)"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
              />
              <button className="palette-close-btn" onClick={onClose} aria-label="Close command palette">
                <FaTimes />
              </button>
            </div>

            {/* Results list */}
            <div className="palette-results">
              {filtered.length === 0 ? (
                <div className="palette-empty">No commands matching "{query}"</div>
              ) : (
                filtered.map((action, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={action.id}
                      className={`palette-item ${isSelected ? 'selected' : ''}`}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        playClick();
                        action.perform();
                      }}
                    >
                      <div className="palette-item-left">
                        {action.icon && <span className="palette-item-icon">{action.icon}</span>}
                        <div>
                          <div className="palette-item-title">{action.label}</div>
                          <div className="palette-item-desc">{action.description}</div>
                        </div>
                      </div>
                      <span className="palette-item-category">{action.category}</span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer keyboard guide */}
            <div className="palette-footer">
              <span className="key-hint"><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
              <span className="key-hint"><kbd>↵</kbd> Select</span>
              <span className="key-hint"><kbd>esc</kbd> Close</span>
              <span className="key-hint"><kbd>Ctrl/⌘ K</kbd> Toggle</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

