/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} title
 * @property {string} category - 'featured' | 'fullstack' | 'frontend' | 'tools'
 * @property {string} tag
 * @property {string} description
 * @property {string} fullDescription
 * @property {string[]} tech
 * @property {string} image
 * @property {string} liveLink
 * @property {string} [githubLink]
 * @property {string[]} highlights
 * @property {string} clientOrType
 * @property {string} year
 */

import islamicImg from '../assets/project-islamic.png';
import crmImg from '../assets/project-crm.png';
import weatherImg from '../assets/project-weather.png';
import compilerImg from '../assets/project-compiler.png';
import aiImg from '../assets/3d-tech.png';
import loginImg from '../assets/project-login.png';
import restaurantImg from '../assets/project-restaurant.png';
import dailyGoalImg from '../assets/goals.png';
import travelImg from '../assets/travel.png';
import netflixImg from '../assets/netflix.png';
import tictactoeImg from '../assets/project-tictactoe.png';
import currencyImg from '../assets/project-currency.png';
import repukeelImg from '../assets/project-repukeel.png';
import prolixusImg from '../assets/project-prolixus.jpeg';

export const portfolioData = {
  personal: {
    name: 'Muhammad Hammad',
    shortName: 'Hammad',
    monogram: 'MH',
    title: 'Full Stack Developer & Creative Engineer',
    roles: [
      'Full Stack Developer',
      'React & Next.js Specialist',
      'Creative UI/UX Engineer',
      'Interactive Web Craftsman',
      'Performance Optimizer'
    ],
    tagline: 'Engineering immersive, award-winning digital experiences with cutting-edge React, scalable backends, and bespoke glassmorphic aesthetics.',
    bio: 'I am a passionate Full Stack Developer and creative UI/UX engineer specializing in building ultra-responsive, highly engaging web applications. With expertise spanning modern React, Next.js, Node.js, and bespoke design systems, I turn complex problems into elegant, fast, and accessible digital solutions.',
    aboutParagraphs: [
      'I approach software engineering with the mindset of an architect and the precision of an artisan. Every interaction, transition, and line of code is measured for speed, clarity, and visual impact.',
      'Having worked through rigorous internships at IIFA Tech, Preesoft, and DevTechnoz, I have tackled everything from complex state-driven dashboards to multilingual educational platforms and scalable marketplaces.',
      'Currently pursuing my Bachelor of Science in Computer Science at Superior University, I continuously blend deep algorithmic principles with modern frontend aesthetics to push what is possible on the web.'
    ],
    email: 'muhammadhammadjato65@gmail.com',
    location: {
      city: 'Lahore',
      country: 'Pakistan',
      region: 'Punjab',
      timeZone: 'Asia/Karachi',
      label: 'Pakistan (PKT / UTC+5)',
    },
    availability: {
      status: 'Open to Opportunities',
      type: 'Full-time & High-Impact Freelance',
      isAvailable: true,
      badge: 'Available Now'
    },
    socials: {
      github: 'https://github.com/muhammadhammad249',
      linkedin: 'https://www.linkedin.com/in/muhammad-hammad-40a156290/',
      email: 'mailto:muhammadhammadjato65@gmail.com',
    },
    resumeUrl: '/Resume.pdf',
    stats: [
      { value: '17+', label: 'Completed Projects', icon: 'Rocket' },
      { value: '03', label: 'Tech Internships', icon: 'Briefcase' },
      { value: '100%', label: 'Commitment & Precision', icon: 'ShieldCheck' },
      { value: '99+', label: 'Lighthouse Score Target', icon: 'Gauge' },
    ],
    now: {
      focus: 'Next-gen Web Architectures & Interactive WebGL Experiences',
      learning: 'Advanced Three.js Shader Math & Distributed Systems',
      listeningTo: 'Ambient Synthwave & Lo-Fi Coding Beats'
    }
  },

  projects: [
    {
      id: 'repukeel-platform',
      title: 'RepuKeel — Brand Protection & DMCA SaaS',
      category: 'featured',
      tag: 'Next.js • Cybersecurity SaaS',
      description: 'Global reputation management and DMCA brand protection platform featuring automated takedown notices and reverse-image scanning.',
      fullDescription: 'A production cybersecurity and brand reputation platform engineered with Next.js, TypeScript, Tailwind CSS, and Supabase. Protects creators, high-profile executives, and corporate brands from intellectual property infringement, media piracy, and unauthorized impersonation through streamlined DMCA removal pipelines, reverse-image scanning tools, and real-time case analytics.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Node.js', 'SEO Architecture'],
      image: repukeelImg,
      liveLink: '/Repukeel/index.html',
      githubLink: 'https://github.com/muhammadhammad249/Repukeel',
      highlights: [
        'Automated DMCA takedown filing engine with 24-48h resolution tracking',
        'Cross-engine reverse image search tool and fingerprint comparison algorithms',
        '100% crawl audit score with deep structured Schema.org organization integration',
        'High-security client portal for brand scanning and infringing link submissions'
      ],
      clientOrType: 'Cybersecurity / Enterprise SaaS',
      year: '2025',
      featured: true
    },
    {
      id: 'prolixus-ecommerce',
      title: 'Prolixus — Luxury Organic E-Commerce',
      category: 'featured',
      tag: 'Next.js 16 • E-Commerce & Subscriptions',
      description: 'Luxury organic health e-commerce and subscription platform with Stripe/PayPal payments, multi-language support, and customer portal.',
      fullDescription: 'A bespoke modern e-commerce platform built with Next.js 16, React 19, and Tailwind CSS. Features an organic product catalog, recurring subscription payment processing via Stripe and PayPal SDKs, downloadable third-party laboratory verification certificates, bilingual localization (English / German), and a comprehensive member order tracking dashboard with automated PDF invoice generation.',
      tech: ['Next.js 16', 'React 19', 'Tailwind CSS', 'Stripe API', 'PayPal SDK', 'jsPDF', 'Framer Motion'],
      image: prolixusImg,
      liveLink: '/Prolixus/index.html',
      githubLink: 'https://github.com/UsmanAli39326/Prolixus',
      highlights: [
        'Dual payment architecture supporting Stripe recurring subscriptions & PayPal SDK',
        'Full bilingual internationalization with English and German language switching',
        'Automated client-side PDF invoice generation via jsPDF and lab certificate verification',
        'Customer order history portal with live status progression and subscription controls'
      ],
      clientOrType: 'E-Commerce / HealthTech',
      year: '2025',
      featured: true
    },
    {
      id: 'islamic-platform',
      title: 'Islamic Educational Platform',
      category: 'featured',
      tag: 'Next.js 14 • Full Stack',
      description: 'Comprehensive Islamic education portal featuring Quran recitations, Hadith libraries, live tutor bookings, and prayer times.',
      fullDescription: 'A production-grade Islamic educational web application engineered with Next.js App Router, TypeScript, and Tailwind CSS. Built to support multilingual localization (English, Arabic, Urdu) through next-intl, interactive audio Quran streaming, dynamic prayer time calculation algorithms, and a seamless teacher consultation scheduling workflow.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'next-intl', 'Audio API', 'Vercel'],
      image: islamicImg,
      liveLink: 'https://islamic-educational-platform.vercel.app',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Full internationalization with English, Arabic, and Urdu RTL support',
        'Interactive audio streaming player with bookmarking & surah search',
        'Integrated prayer time engine calculated based on geolocation coordinates',
        'High-contrast accessible typography with Arabic calligraphic font optimization'
      ],
      clientOrType: 'EdTech / Community',
      year: '2024–2025',
      featured: true
    },
    {
      id: 'client-manager-pro',
      title: 'Client Manager Pro',
      category: 'featured',
      tag: 'React.js • CRM & Analytics',
      description: 'High-performance CRM dashboard for client lifecycle tracking, project analytics, and milestone automation.',
      fullDescription: 'An enterprise-grade CRM dashboard built with React.js, Vite, and Tailwind CSS. Provides agencies and freelancers with real-time analytics, revenue forecasting, project status kanban boards, contact management, and automated invoicing indicators.',
      tech: ['React.js', 'Vite', 'Tailwind CSS', 'Chart.js / Recharts', 'LocalStorage State'],
      image: crmImg,
      liveLink: '/client-manager-pro/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Real-time data visualization charts and project progress metrics',
        'Interactive kanban board with drag-and-drop task status progression',
        'Instant search, filtering, and exportable customer summaries',
        'Ultra-fast load time under 600ms with optimized client-side state'
      ],
      clientOrType: 'Productivity / Enterprise Tool',
      year: '2024',
      featured: true
    },
    {
      id: 'livestock-link-pk',
      title: 'Livestock Link PK',
      category: 'featured',
      tag: 'Next.js • Digital Marketplace',
      description: 'National digital marketplace connecting agricultural livestock farmers, buyers, and logistics across Pakistan.',
      fullDescription: 'A modern e-commerce and classifieds marketplace platform tailored for livestock trading. Connects verified sellers with verified buyers across nationwide regions, offering direct messaging, categorized animal listings, weight/price calculators, and seller verification credentials.',
      tech: ['Next.js', 'React', 'Tailwind CSS', 'Server Actions', 'Vercel'],
      image: aiImg,
      liveLink: 'https://livestocklinkpk.vercel.app',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Bespoke mobile-first marketplace layout designed for rapid browsing on 3G/4G networks',
        'Multi-criteria search filtering by breed, age, weight, and provincial location',
        'Direct buyer-to-seller communication channel and verified seller badges',
        'Optimized Next.js image loading with blur-up placeholders'
      ],
      clientOrType: 'AgriTech / Marketplace',
      year: '2024',
      featured: true
    },
    {
      id: 'jobbridge-ai',
      title: 'JobBridge AI',
      category: 'featured',
      tag: 'React.js • Career Portal',
      description: 'AI-assisted career portal matching developers with high-growth tech opportunities through intelligent skill clustering.',
      fullDescription: 'A streamlined web application connecting tech talent with forward-thinking employers. Includes resume parsing simulation, skill matching matrices, categorized job filters, and an application pipeline tracker.',
      tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      image: compilerImg,
      liveLink: 'https://jobbridge-sigma.vercel.app',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Intelligent role suggestion based on user-selected tech stacks',
        'Instant bookmarking and applicant stage tracking',
        'Interactive filter drawer with salary range and remote-work sliders'
      ],
      clientOrType: 'HR Tech / SaaS',
      year: '2024',
      featured: true
    },
    {
      id: 'weather-app',
      title: 'Aura Weather Real-Time',
      category: 'frontend',
      tag: 'React.js • Geolocation API',
      description: 'Sleek, atmospheric meteorological forecasting platform with hourly breakdowns and dynamic weather animations.',
      fullDescription: 'Real-time weather station built with React.js, Tailwind CSS, and Axios. Dynamically alters its background themes and glass textures based on real-time atmospheric conditions (rain, sunny, snowfall, thunder).',
      tech: ['React.js', 'Vite', 'Tailwind CSS', 'Axios', 'OpenWeatherMap API'],
      image: weatherImg,
      liveLink: '/Weather/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Dynamic visual mood reacting to local temperature and weather patterns',
        '5-day extended forecast with humidity, wind speed, UV index, and air pressure',
        'Instant city lookup with debounced autocomplete'
      ],
      clientOrType: 'Utility App',
      year: '2024',
      featured: false
    },
    {
      id: 'restaurant-showcase',
      title: 'L’Étoile Dining Showcase',
      category: 'frontend',
      tag: 'Vanilla JS / React • Luxury UI',
      description: 'Ultra-luxurious gourmet restaurant website with interactive menu filtering, gallery, and reservation booking.',
      fullDescription: 'An atmospheric dining experience website showcasing gourmet dishes, chef profiles, private dining rooms, and online table reservations with interactive date/time slot selection.',
      tech: ['JavaScript', 'HTML5', 'CSS3', 'Smooth Scroll', 'Vite'],
      image: restaurantImg,
      liveLink: '/restaurant-website/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Interactive visual menu with dietary tags and ingredients preview',
        'Elegant modal reservation engine with instant confirmation',
        'Atmospheric parallax image galleria'
      ],
      clientOrType: 'Hospitality / Branding',
      year: '2024',
      featured: false
    },
    {
      id: 'daily-goals',
      title: 'Daily Goals Momentum',
      category: 'frontend',
      tag: 'React.js • Productivity',
      description: 'Focus and goal execution system featuring streak tracking, micro-milestone completion, and gradient themes.',
      fullDescription: 'A clean, distraction-free productivity app helping users architect and execute daily habits with streak analytics, motivational progress bars, and resilient local storage sync.',
      tech: ['React.js', 'Vite', 'CSS Modules', 'Web Storage API'],
      image: dailyGoalImg,
      liveLink: '/daily-goal/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Fluid add, toggle, and archive workflow with micro-confetti celebrations',
        'Visual daily completion rings with percentage gauges',
        'Full keyboard navigation support'
      ],
      clientOrType: 'Productivity Tool',
      year: '2024',
      featured: false
    },
    {
      id: 'travel-agency',
      title: 'Wanderlust Expeditions',
      category: 'frontend',
      tag: 'Creative UI • Travel',
      description: 'Destination showcase and curated adventure booking platform with destination search and pricing cards.',
      fullDescription: 'A responsive travel agency website highlighting popular travel destinations, package itineraries, customer reviews, and customizable excursion bookings.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Grid'],
      image: travelImg,
      liveLink: '/travel-agency/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Destination discovery grid with interactive cost estimators',
        'Smooth accordion itinerary overview with day-by-day highlights',
        'Mobile-optimized touch carousels'
      ],
      clientOrType: 'Travel & Tourism',
      year: '2024',
      featured: false
    },
    {
      id: 'netflix-clone',
      title: 'CineStream Cinema UI',
      category: 'frontend',
      tag: 'React.js • Media Streaming UI',
      description: 'Pixel-perfect Netflix streaming interface clone with video modal trailers, category rails, and hero billboard.',
      fullDescription: 'A movie catalog browsing interface inspired by modern streaming services. Features horizontal carousel shelves, movie synopsis cards, preview trailers, and custom rating badges.',
      tech: ['React.js', 'CSS3', 'REST API', 'Framer Motion'],
      image: netflixImg,
      liveLink: '/Netflix/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Dynamic hero banner with backdrop trailers and action triggers',
        'Multi-row endless horizontal scrolling categories',
        'Responsive layout across mobile, tablet, and ultra-wide screens'
      ],
      clientOrType: 'Media / Entertainment',
      year: '2024',
      featured: false
    },
    {
      id: 'c-minus-compiler',
      title: 'C-Minus Web IDE & Compiler',
      category: 'tools',
      tag: 'C++ • WebIDE • Systems',
      description: 'Web-based interactive compiler interface for the C-Minus language with syntax highlighting and token inspection.',
      fullDescription: 'An educational compiler tool allowing developers to type C-Minus code directly in browser, analyze lexical tokens, parse grammar trees, and view intermediate code output.',
      tech: ['C++', 'JavaScript', 'WebAssembly/Web', 'Ace Editor'],
      image: compilerImg,
      liveLink: '/c-minus-project/web_compiler/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Real-time lexical token generator and syntax tree inspector',
        'Integrated code editor with line numbers and error marking',
        'Sample code snippets covering conditionals, loops, and recursive functions'
      ],
      clientOrType: 'Developer Tool / Education',
      year: '2023–2024',
      featured: false
    },
    {
      id: 'modern-landing',
      title: 'Nova SaaS Landing Page',
      category: 'frontend',
      tag: 'Creative UI • Marketing',
      description: 'Futuristic product landing page with glowing neon highlights, 3D assets, and conversion-focused copy.',
      fullDescription: 'High-conversion SaaS landing page engineered with modern design principles: dark mode glass cards, animated gradient borders, sticky floating navbar, and pricing tiers.',
      tech: ['HTML5', 'Tailwind CSS', 'JavaScript', 'AOS / Keyframes'],
      image: aiImg,
      liveLink: '/landingpage/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Fluid multi-breakpoint typography and responsive bento layouts',
        'Interactive toggle between monthly and annual pricing tiers',
        'Micro-interactions on hover and magnetic CTA buttons'
      ],
      clientOrType: 'Marketing / Landing Page',
      year: '2024',
      featured: false
    },
    {
      id: 'modern-login',
      title: 'Glassmorphic Auth Suite',
      category: 'frontend',
      tag: 'UI/UX • Security Interface',
      description: 'Frosted glass authentication interface with password visibility toggles and real-time form validation.',
      fullDescription: 'A sleek login and signup portal showcasing modern glassmorphism effects, backdrop blur shaders, animated floating bubbles, and user input validation feedback.',
      tech: ['HTML5', 'CSS3 Glassmorphism', 'JavaScript'],
      image: loginImg,
      liveLink: '/login-page/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Multi-layer frosted glass effect with depth-separated card lighting',
        'Smooth transition between sign-in and sign-up state modes',
        'Keyboard-accessible form fields with instant status indicators'
      ],
      clientOrType: 'Design Concept / Auth',
      year: '2024',
      featured: false
    },
    {
      id: 'tic-tac-toe',
      title: 'Quantum Tic-Tac-Toe',
      category: 'tools',
      tag: 'JavaScript • Game Engine',
      description: 'Modern interactive game with minimax AI difficulty options, winning move visualization, and score counters.',
      fullDescription: 'An interactive classic puzzle game enhanced with glowing cyberpunk neon markers, turn history, score persistency, and single-player vs AI mode.',
      tech: ['HTML5', 'CSS3', 'JavaScript Logic'],
      image: tictactoeImg,
      liveLink: '/tic-tac-toe/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Smart AI opponent with algorithmic move prediction',
        'Win streak tracker saved across browser sessions',
        'Responsive touch controls for instant mobile play'
      ],
      clientOrType: 'Casual Gaming',
      year: '2023',
      featured: false
    },
    {
      id: 'currency-converter',
      title: 'Flux Currency Exchange',
      category: 'tools',
      tag: 'JavaScript • Financial Tool',
      description: 'Live global currency exchange calculator with 150+ fiat currencies and instant country flag indicators.',
      fullDescription: 'Fast, dependable financial currency converter fetching real-time market foreign exchange rates. Allows rapid swaps between currencies with historical conversion rates display.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Exchange Rates API'],
      image: currencyImg,
      liveLink: '/currency-converter/index.html',
      githubLink: 'https://github.com/muhammadhammad249',
      highlights: [
        'Instant two-way rate conversion with zero keystroke delay',
        'Support for over 150 international fiat currencies and crypto tokens',
        'Dynamic flag iconography and popular currency shortcut chips'
      ],
      clientOrType: 'Financial Tool',
      year: '2023',
      featured: false
    }
  ],

  experience: [
    {
      id: 'iifa-tech',
      role: 'Frontend Developer Intern',
      company: 'IIFA Tech',
      location: 'Pakistan (Hybrid)',
      period: '2024',
      type: 'Internship',
      badge: 'Frontend Engineering',
      description: 'Spearheaded frontend component engineering and performance audits across client applications.',
      responsibilities: [
        'Engineered responsive, accessible React.js interfaces conforming to modern WCAG AA accessibility standards.',
        'Collaborated with senior engineers to migrate monolithic views into modular, reusable UI component systems.',
        'Optimized bundle size and render cycles, slashing First Contentful Paint (FCP) by over 35%.',
        'Implemented state management patterns and integrated RESTful endpoints with error resilience.'
      ],
      skills: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Git', 'REST APIs', 'Performance']
    },
    {
      id: 'preesoft',
      role: 'Full Stack Developer Intern',
      company: 'Preesoft',
      location: 'Pakistan',
      period: '2024',
      type: 'Internship',
      badge: 'Full Stack Systems',
      description: 'Built and maintained end-to-end web features connecting client frontends with backend services.',
      responsibilities: [
        'Developed interactive user dashboards and CRUD management panels using React and Node.js.',
        'Wrote robust API endpoints and middleware for secure data handling and authentication.',
        'Assisted in database schema modeling and query optimizations for relational and NoSQL databases.',
        'Participated in code reviews, sprint planning, and CI/CD deployment routines on cloud platforms.'
      ],
      skills: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Agile / Scrum']
    },
    {
      id: 'devtechnoz',
      role: 'Web Developer',
      company: 'DevTechnoz',
      location: 'Pakistan',
      period: '2026',
      type: 'Web Engineering',
      badge: 'Web Development',
      description: 'Crafted bespoke client websites, landing pages, and interactive web elements.',
      responsibilities: [
        'Designed and coded pixel-perfect responsive layouts from Figma and Adobe XD design mockups.',
        'Ensured cross-browser compatibility across Chrome, Safari, Firefox, and Edge on all screen sizes.',
        'Implemented interactive CSS keyframe animations and JavaScript DOM manipulators to elevate user delight.',
        'Maintained Git version control workflows and contributed to documentation.'
      ],
      skills: ['HTML5', 'CSS3 / SCSS', 'JavaScript', 'Responsive Design', 'Git', 'Figma']
    }
  ],

  education: [
    {
      id: 'superior-university',
      degree: 'Bachelor of Science in Computer Science (BS CS)',
      institution: 'Superior University',
      location: 'Lahore, Pakistan',
      period: '2022 – 2026',
      badge: 'Undergraduate',
      description: 'Rigorous computer science curriculum focusing on software architecture, algorithms, and web engineering.',
      coursework: [
        'Data Structures & Algorithms',
        'Object-Oriented Programming (OOP)',
        'Database Management Systems (DBMS)',
        'Web Engineering & Distributed Systems',
        'Operating Systems & System Architecture',
        'Software Quality Assurance & Testing'
      ]
    }
  ],

  skills: {
    categories: [
      {
        name: 'Frontend & UI Engineering',
        icon: 'Layout',
        items: [
          { name: 'React.js', level: 95, color: '#61DAFB' },
          { name: 'Next.js', level: 90, color: '#FFFFFF' },
          { name: 'TypeScript', level: 85, color: '#3178C6' },
          { name: 'JavaScript (ES6+)', level: 95, color: '#F7DF1E' },
          { name: 'Tailwind CSS', level: 95, color: '#06B6D4' },
          { name: 'Framer Motion', level: 90, color: '#FF0055' },
          { name: 'HTML5 / Semantic Web', level: 98, color: '#E34F26' },
          { name: 'CSS3 / Modern Layouts', level: 95, color: '#1572B6' }
        ]
      },
      {
        name: 'Backend & Systems',
        icon: 'Server',
        items: [
          { name: 'Node.js', level: 85, color: '#5FA04E' },
          { name: 'Express.js', level: 85, color: '#EEEEEE' },
          { name: 'RESTful API Architecture', level: 90, color: '#22D3EE' },
          { name: 'MongoDB', level: 82, color: '#47A248' },
          { name: 'Next.js API Routes', level: 88, color: '#7C3AED' },
          { name: 'SQL & Database Design', level: 80, color: '#336791' }
        ]
      },
      {
        name: 'Tools, DevOps & Design',
        icon: 'Wrench',
        items: [
          { name: 'Git & Version Control', level: 92, color: '#F05032' },
          { name: 'GitHub Ecosystem', level: 92, color: '#FFFFFF' },
          { name: 'Vite Build Tooling', level: 90, color: '#646CFF' },
          { name: 'Vercel Deployment', level: 94, color: '#000000' },
          { name: 'Figma UI to Code', level: 88, color: '#F24E1E' },
          { name: 'Postman & API Testing', level: 86, color: '#FF6C37' }
        ]
      }
    ],

    // Interactive bubbles data for physics playground
    bubbles: [
      { id: 'b-react', name: 'React', color: '#61DAFB', radius: 46, category: 'frontend' },
      { id: 'b-next', name: 'Next.js', color: '#E2E8F0', radius: 44, category: 'frontend' },
      { id: 'b-ts', name: 'TypeScript', color: '#38BDF8', radius: 42, category: 'frontend' },
      { id: 'b-js', name: 'JavaScript', color: '#FACC15', radius: 48, category: 'frontend' },
      { id: 'b-tailwind', name: 'Tailwind', color: '#22D3EE', radius: 44, category: 'frontend' },
      { id: 'b-node', name: 'Node.js', color: '#4ADE80', radius: 44, category: 'backend' },
      { id: 'b-framer', name: 'Framer', color: '#F472B6', radius: 40, category: 'frontend' },
      { id: 'b-mongo', name: 'MongoDB', color: '#34D399', radius: 42, category: 'backend' },
      { id: 'b-git', name: 'Git', color: '#FB923C', radius: 38, category: 'tools' },
      { id: 'b-github', name: 'GitHub', color: '#CBD5E1', radius: 40, category: 'tools' },
      { id: 'b-html', name: 'HTML5', color: '#F87171', radius: 40, category: 'frontend' },
      { id: 'b-css', name: 'CSS3', color: '#60A5FA', radius: 40, category: 'frontend' },
      { id: 'b-vite', name: 'Vite', color: '#A855F7', radius: 40, category: 'tools' },
      { id: 'b-vercel', name: 'Vercel', color: '#F1F5F9', radius: 42, category: 'tools' },
      { id: 'b-rest', name: 'REST APIs', color: '#818CF8', radius: 42, category: 'backend' },
      { id: 'b-figma', name: 'Figma', color: '#EC4899', radius: 38, category: 'design' }
    ]
  },

  services: [
    {
      id: 'frontend',
      number: '01',
      title: 'Frontend Engineering',
      tagline: 'Pixel-perfect, high-performance web applications',
      description: 'Crafting responsive, accessible, and ultra-fast client-side applications using React.js, Next.js, and modern TypeScript. Prioritizing Core Web Vitals, optimal rendering, and modular architecture.',
      deliverables: [
        'Single Page Applications (SPA) & Server-Side Rendered (SSR) Platforms',
        'State architecture via Zustand, Context, or Redux',
        'Strict WCAG 2.1 AA accessibility compliance',
        'Sub-second first paint and fluid interactions'
      ]
    },
    {
      id: 'fullstack',
      number: '02',
      title: 'Full Stack Development',
      tagline: 'End-to-end web apps with scalable backends',
      description: 'Building connected platforms where intuitive interfaces seamlessly pair with resilient APIs, secure authentication, database schemas, and real-time cloud data pipelines.',
      deliverables: [
        'RESTful & serverless API architecture',
        'MongoDB / SQL schema modeling & ORM integration',
        'Authentication, authorization & session guards',
        'Automated CI/CD deployment pipelines on Vercel'
      ]
    },
    {
      id: 'creative-ui',
      number: '03',
      title: 'Creative UI/UX & Micro-Interactions',
      tagline: 'Awwwards-level design execution that captivates',
      description: 'Elevating digital products beyond static layouts with glassmorphic cards, physics-based bubbles, kinetic typography, 3D spotlight effects, and smooth scroll choreography.',
      deliverables: [
        'Custom interactive micro-animations with Framer Motion',
        'Frosted glassmorphism design tokens & circular reveal theme shifts',
        'Responsive interactive canvas & particle effects',
        'Interactive case study modals & command palette navigation'
      ]
    },
    {
      id: 'performance',
      number: '04',
      title: 'Performance & SEO Optimization',
      tagline: 'Turning slow websites into 95+ Lighthouse rockets',
      description: 'Auditing and revamping web platforms to achieve 95+ Lighthouse scores, lightning-fast Largest Contentful Paint (LCP), rich structured JSON-LD schemas, and organic search discoverability.',
      deliverables: [
        'Asset optimization, modern formats (WebP/AVIF), and lazy loading',
        'Clean bundle splitting, code pruning, and tree shaking',
        'Open Graph, Twitter card, and JSON-LD schema integration',
        'Vercel Analytics & Speed Insights integration'
      ]
    }
  ],

  process: [
    {
      step: '01',
      title: 'Discovery & Architecture',
      duration: 'Phase 1',
      description: 'We define the core objective, analyze user personas, establish technical constraints, and architect the component hierarchy and data models for optimal scalability.'
    },
    {
      step: '02',
      title: 'Design & Prototype',
      duration: 'Phase 2',
      description: 'Crafting the design token system, establishing fluid typography, dark/light theme palettes, glassmorphism depths, and building interactive mockups.'
    },
    {
      step: '03',
      title: 'Precision Engineering',
      duration: 'Phase 3',
      description: 'Writing clean, typed, modular code with React and modern tools. We implement kinetic interactions, physics bubbles, accessible forms, and serverless backends.'
    },
    {
      step: '04',
      title: 'Testing, Polish & Launch',
      duration: 'Phase 4',
      description: 'Conducting cross-device testing, stress testing performance budgets, auditing accessibility, configuring security headers, and launching to production on Vercel.'
    }
  ],

  testimonials: [
    {
      id: 't1',
      name: 'Syed Ali Raza',
      role: 'Senior Project Lead',
      company: 'Tech Ecosystems',
      content: 'Hammad combines technical rigor with an innate eye for aesthetics. His ability to deliver complex React interfaces on time while exceeding performance targets is outstanding.',
      rating: 5,
      avatar: 'AR'
    },
    {
      id: 't2',
      name: 'Farhan Tariq',
      role: 'Engineering Manager',
      company: 'Digital Solutions Lab',
      content: 'Working with Muhammad was effortless. He quickly understood the vision for our educational platform and brought it to life with multilingual support and flawless UI design.',
      rating: 5,
      avatar: 'FT'
    },
    {
      id: 't3',
      name: 'Zainab Noor',
      role: 'Product Designer',
      company: 'Creative Studio',
      content: 'One of the rare frontend developers who truly respects design fidelity. Every micro-interaction and curve of the interface felt hand-crafted and premium.',
      rating: 5,
      avatar: 'ZN'
    }
  ],

  faq: [
    {
      question: 'What types of projects do you specialize in?',
      answer: 'I specialize in high-end React and Next.js applications, ranging from interactive creative web portfolios and SaaS dashboards to full-stack e-commerce platforms and custom Web APIs.'
    },
    {
      question: 'Are you available for full-time roles or freelance work?',
      answer: 'Yes! I am actively open to full-time software engineering roles as well as select high-impact freelance projects and consulting opportunities worldwide.'
    },
    {
      question: 'How do you ensure high performance and 95+ Lighthouse scores?',
      answer: 'Performance is engineered from the first line of code: strictly modular chunk splitting, optimized image formats, zero render-blocking dependencies, hardware-accelerated animations, and proper bundle tree-shaking.'
    },
    {
      question: 'What is your typical project turnaround time?',
      answer: 'Depending on scope, a bespoke high-performance landing page or portfolio takes 1–2 weeks, while larger full-stack platforms and web portals generally take 3–6 weeks.'
    },
    {
      question: 'How do we collaborate across time zones?',
      answer: 'I am based in Pakistan (PKT, UTC+5) and routinely collaborate with teams across the US, UK, Middle East, and Asia using asynchronous tools (Slack, GitHub, Loom, Notion) along with daily synchronous standups.'
    },
    {
      question: 'Can you work with existing codebases or Figma designs?',
      answer: 'Absolutely. Whether migrating legacy apps to modern Vite + React/Next.js or translating complex multi-page Figma design systems into pixel-perfect code, I ensure a smooth and clean transition.'
    }
  ],

  achievements: [
    {
      id: 'superior-honor',
      title: 'BS Computer Science Progression',
      issuer: 'Superior University',
      year: '2022–2026',
      description: 'Active computer science undergraduate pursuing advanced software engineering and web systems.'
    },
    {
      id: 'internship-excellence',
      title: 'Triple Tech Internship Completion',
      issuer: 'IIFA Tech • Preesoft • DevTechnoz',
      year: '2023–2024',
      description: 'Successfully concluded three intensive software engineering internships spanning frontend, full-stack, and web development.'
    },
    {
      id: 'production-platforms',
      title: 'Production Deployments On Vercel',
      issuer: 'Independent / Client Products',
      year: '2024–2025',
      description: 'Engineered and launched 14+ public web applications and open-source tools with 99.9% uptime.'
    }
  ]
};

export default portfolioData;

