import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaTimes, FaPaperPlane, FaMagic } from 'react-icons/fa';
import { useSound } from '../../hooks/useSound';
import './AIChatWidget.css';

const QUICK_PROMPTS = [
  "What is your tech stack?",
  "Tell me about your internships",
  "Show me top projects",
  "Are you available for hire?"
];

// Comprehensive client-side conversational AI engine
function generateSmartResponse(input) {
  const q = (input || '').toLowerCase().trim();

  // Greetings & Casual check-ins (English & Roman Urdu)
  if (/^(hi|hello|hey|hiya|yo|greetings|howdy|sup)\b/i.test(q) || /^(salam|assalam|aoa|kia hal|kya hal|kese ho|kaise ho)\b/i.test(q)) {
    return "Hello! 👋 Great to meet you! I'm Muhammad Hammad's AI Assistant. How can I help you today? You can ask me about his tech stack, featured projects like Prolixus and RepuKeel, software internships, or hiring availability!";
  }

  // Who is Hammad / Introduction
  if (q.includes('who are you') || q.includes('who is hammad') || q.includes('tell me about yourself') || q.includes('about hammad') || q.includes('introduction') || q.includes('bio') || q.includes('kon ho') || q.includes('kon hai')) {
    return "Muhammad Hammad is a passionate Full Stack Developer and Creative Engineer based in Lahore, Pakistan. He specializes in crafting ultra-responsive, Awwwards-level web apps using modern React, Next.js, TypeScript, and Node.js with scalable databases and smooth 60fps animations.";
  }

  // Tech stack & skills
  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('frontend') || q.includes('backend') || q.includes('framework') || q.includes('tools')) {
    return "Hammad's core technology arsenal includes:\n• Frontend: React 19, Next.js 14/16, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5/CSS3\n• Backend & APIs: Node.js, Express.js, RESTful APIs, Supabase\n• Databases: MongoDB, Supabase PostgreSQL\n• Tooling & Deployment: Git, GitHub, Vite, Vercel, Postman, Figma.";
  }

  // Specific technologies
  if (q.includes('react')) {
    return "React is Hammad's primary expertise! He builds production applications using React 19 and Next.js App Router, leveraging custom hooks, context state management, server components, and fluid Framer Motion animations.";
  }
  if (q.includes('next') || q.includes('nextjs') || q.includes('next.js')) {
    return "Hammad has deep experience with Next.js 14 and Next.js 16, utilizing Server-Side Rendering (SSR), Static Site Generation (SSG), App Router, dynamic API routes, and internationalization (next-intl). Both RepuKeel and Prolixus are powered by Next.js!";
  }
  if (q.includes('node') || q.includes('express') || q.includes('backend')) {
    return "For backend engineering, Hammad builds scalable REST APIs using Node.js and Express, integrated with MongoDB (Mongoose) and Supabase, with JWT authentication, role-based access control, and payment processing (Stripe & PayPal).";
  }
  if (q.includes('tailwind')) {
    return "Hammad is an expert in Tailwind CSS! He designs responsive, accessible design systems with custom tokens, dark/light themes, fluid clamp typography, and bespoke glassmorphism aesthetics.";
  }

  // Projects & Portfolio
  if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('build') || q.includes('show me')) {
    return "Hammad has built 17+ production-grade projects! Top highlights include:\n1. RepuKeel: Next.js DMCA protection and brand defense SaaS\n2. Prolixus: Next.js 16 luxury organic e-commerce with Stripe & PayPal subscriptions\n3. Islamic Educational Platform: Multilingual portal with Quran audio & prayer times\n4. Client Manager Pro: Real-time React CRM dashboard with analytics\n5. Livestock Link PK: National agri-marketplace\n\nCheck out the Projects section on this page to explore live previews and case studies!";
  }

  // Prolixus specific
  if (q.includes('prolixus')) {
    return "Prolixus is a bespoke luxury organic e-commerce platform built with Next.js 16 and Tailwind CSS. It features Stripe recurring subscriptions, PayPal SDK, downloadable lab verification certificates, English/German bilingual support, and a complete customer order dashboard.";
  }

  // RepuKeel specific
  if (q.includes('repukeel') || q.includes('dmca')) {
    return "RepuKeel is a production cybersecurity and reputation management platform built with Next.js, TypeScript, and Supabase. It protects brands from piracy, content leaks, and impostor profiles with automated DMCA takedowns and reverse-image search tools.";
  }

  // Internships & Work Experience
  if (q.includes('experience') || q.includes('intern') || q.includes('job') || q.includes('company') || q.includes('work history') || q.includes('career')) {
    return "Hammad's professional software engineering experience includes:\n1. IIFA Tech — Frontend Developer Intern (React components, WCAG AA accessibility, performance optimization)\n2. Preesoft — Full Stack Intern (REST APIs, admin dashboards, MongoDB & Node.js backend integration)\n3. DevTechnoz — Web Developer (Responsive layouts, cross-browser compatibility, modern UI)";
  }

  // Education
  if (q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('college') || q.includes('superior') || q.includes('study') || q.includes('academic') || q.includes('bs cs')) {
    return "Hammad is currently completing his Bachelor of Science in Computer Science (BS CS) at Superior University in Pakistan (2022–2026), combining algorithmic problem-solving with modern software engineering.";
  }

  // Hiring, Availability & Freelance
  if (q.includes('hire') || q.includes('available') || q.includes('freelance') || q.includes('contract') || q.includes('job offer') || q.includes('opportunity') || q.includes('work together') || q.includes('remote') || q.includes('full time')) {
    return "Yes! Hammad is actively available for full-time software engineering roles and high-impact freelance/contract projects. He has proven experience collaborating with global remote teams across US, UK, and Europe. You can email him directly at muhammadhammadjato65@gmail.com to discuss your project!";
  }

  // Contact info
  if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('message') || q.includes('connect') || q.includes('phone') || q.includes('whatsapp') || q.includes('linkedin') || q.includes('github')) {
    return "You can get in touch with Hammad through:\n• Email: muhammadhammadjato65@gmail.com\n• LinkedIn: linkedin.com/in/muhammad-hammad-40a156290\n• GitHub: github.com/muhammadhammad249\n• Or use the validated Contact Form on this portfolio page!";
  }

  // Location & Timezone
  if (q.includes('location') || q.includes('where') || q.includes('city') || q.includes('country') || q.includes('pakistan') || q.includes('lahore') || q.includes('time') || q.includes('timezone')) {
    return "Hammad is located in Lahore, Pakistan (PKT, UTC+5). He coordinates smoothly with remote teams across multiple time zones, including North American and European business hours.";
  }

  // Services offered
  if (q.includes('service') || q.includes('what can you do') || q.includes('what do you offer') || q.includes('can you build') || q.includes('website') || q.includes('landing page') || q.includes('saas') || q.includes('app')) {
    return "Hammad offers end-to-end web engineering services:\n1. Full-Stack Web Applications (React, Next.js, Node.js, MongoDB)\n2. High-Converting Landing Pages with Awwwards-grade interactive aesthetics\n3. SaaS & Dashboard Architectures with analytics and authentication\n4. E-Commerce Platforms with Stripe, PayPal, and subscription management\n5. Web Performance Optimization (Lighthouse 95+ score targets).";
  }

  // Pricing / Cost
  if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('pricing') || q.includes('budget') || q.includes('how much') || q.includes('charge')) {
    return "Pricing depends on the scope, features, and timeline of the project. Hammad offers flexible fixed-milestone pricing for defined deliverables as well as hourly arrangements. Send a brief of your project to muhammadhammadjato65@gmail.com for a free consultation and estimate!";
  }

  // Resume / CV
  if (q.includes('resume') || q.includes('cv') || q.includes('pdf') || q.includes('download resume')) {
    return "You can download Hammad's official resume by clicking the 'Download CV' button in the Hero section of this portfolio, or by opening the Command Palette (Ctrl+K or Cmd+K) and selecting 'Download Resume'!";
  }

  // Compliments & Gratitude
  if (q.includes('thank') || q.includes('thanks') || q.includes('shukriya') || q.includes('nice') || q.includes('great') || q.includes('awesome') || q.includes('cool') || q.includes('good') || q.includes('love it') || q.includes('amazing')) {
    return "Thank you so much! It means a lot. Hammad has poured immense craft and precision into engineering every pixel and animation here. Feel free to explore more or reach out if you'd like to collaborate!";
  }

  // Goodbyes
  if (q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('take care') || q.includes('allah hafiz')) {
    return "Goodbye! Thanks for stopping by Muhammad Hammad's portfolio. Have a wonderful day ahead, and don't hesitate to reach out at muhammadhammadjato65@gmail.com anytime!";
  }

  // Roman Urdu Common Queries
  if (q.includes('kaam') || q.includes('kya krty ho') || q.includes('kya karte ho') || q.includes('btao') || q.includes('dikhao')) {
    return "Muhammad Hammad Full Stack Developer aur Creative UI/UX Engineer hain. Unho ne React 19, Next.js, Node.js aur MongoDB me 17+ projects banaye hain jin me RepuKeel aur Prolixus top projects hain. Aap un ki skills, projects ya internships ke baare me pooch sakte hain!";
  }
  if (q.includes('kahan') || q.includes('rehte ho') || q.includes('lahore')) {
    return "Hammad Lahore, Pakistan me based hain aur worldwide clients aur remote companies ke sath smooth communication ke sath kaam karte hain!";
  }
  if (q.includes('number') || q.includes('phone') || q.includes('rabta') || q.includes('email btao')) {
    return "Aap Hammad se email: muhammadhammadjato65@gmail.com ya LinkedIn par rabta kar sakte hain, ya phir Contact section me direct message send kar sakte hain!";
  }

  // Short gibberish or unclear input
  if (q.length < 4 || !/[aeiouy]/i.test(q)) {
    return "I didn't quite catch that! 😊 You can ask me anything about Muhammad Hammad, such as:\n• 'What is his tech stack?'\n• 'Tell me about Prolixus & RepuKeel'\n• 'What software internships has he done?'\n• 'Is he available for hire?'\nOr feel free to ask in English or Roman Urdu!";
  }

  // Intelligent Contextual Fallback for any other custom question
  return `Thank you for asking! Muhammad Hammad is a Full Stack Developer & Creative Engineer specializing in React 19, Next.js, TypeScript, and high-performance backend systems. Whether you need a full SaaS platform, an interactive landing page, or custom engineering, Hammad is ready to help. You can email him directly at muhammadhammadjato65@gmail.com or leave a message through the contact form below!`;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "👋 Hi! I'm Hammad's AI Assistant. Ask me anything about his technical stack, projects, internships, or availability for your next project!"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { playClick, playWhoosh, playPop } = useSound();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query.trim() || loading) return;

    playClick();
    const cleanQuery = query.trim();
    const userMsg = { id: Date.now().toString(), role: 'user', text: cleanQuery };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      let replyText = '';

      // First attempt: Call backend API endpoint
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: cleanQuery })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.reply) {
            replyText = data.reply;
          }
        }
      } catch {
        // Backend not available in local dev or offline — fallback gracefully
      }

      // If backend was not reached or returned empty, use our comprehensive intelligent NLP responder
      if (!replyText) {
        replyText = generateSmartResponse(cleanQuery);
      }

      playPop();
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: replyText
        }
      ]);
    } catch {
      playPop();
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: generateSmartResponse(cleanQuery)
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-widget-container">
      {/* Floating trigger button */}
      <motion.button
        className="ai-trigger-btn"
        onClick={() => {
          if (!isOpen) playWhoosh();
          setIsOpen(!isOpen);
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open AI Assistant"
      >
        <div className="ai-trigger-glow"></div>
        {isOpen ? <FaTimes /> : <FaRobot />}
        {!isOpen && <span className="ai-badge-pulse"></span>}
      </motion.button>

      {/* Chat modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chat-window glass-panel"
            initial={{ opacity: 0, scale: 0.88, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 30 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="ai-chat-header">
              <div className="ai-chat-header-info">
                <div className="ai-avatar-orb">
                  <FaRobot />
                  <span className="ai-status-dot"></span>
                </div>
                <div>
                  <h4 className="ai-title">Hammad AI</h4>
                  <p className="ai-subtitle">Always online &amp; grounded in portfolio</p>
                </div>
              </div>
              <button
                className="ai-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages body */}
            <div className="ai-chat-body">
              {messages.map((m) => (
                <div key={m.id} className={`ai-message-row ${m.role}`}>
                  <div className={`ai-message-bubble ${m.role}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="ai-message-row assistant">
                  <div className="ai-message-bubble assistant typing-bubble">
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                    <span className="typing-dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Bar */}
            <div className="ai-quick-prompts">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  className="quick-prompt-pill"
                  onClick={() => handleSend(prompt)}
                >
                  <FaMagic className="quick-magic-icon" />
                  <span>{prompt}</span>
                </button>
              ))}
            </div>

            {/* Input form */}
            <form
              className="ai-chat-input-row"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="ai-chat-input"
                placeholder="Ask me anything about Hammad..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={300}
              />
              <button
                type="submit"
                className="ai-chat-send-btn"
                disabled={!input.trim() || loading}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
