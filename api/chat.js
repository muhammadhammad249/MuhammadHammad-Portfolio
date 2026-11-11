// Vercel Serverless Function: /api/chat.js
// Grounded AI assistant answering queries about Muhammad Hammad

const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const limit = 12; // 12 requests per minute

  const record = rateLimitMap.get(ip) || { count: 0, resetAt: now + windowMs };
  if (now > record.resetAt) {
    record.count = 1;
    record.resetAt = now + windowMs;
    rateLimitMap.set(ip, record);
    return false;
  }

  record.count += 1;
  rateLimitMap.set(ip, record);
  return record.count > limit;
}

const SYSTEM_PROMPT = `
You are the dedicated AI assistant for Muhammad Hammad, a Full Stack Developer and Creative Engineer based in Pakistan.
Answer questions accurately, politely, concisely, and with an enthusiastic, professional tone.

Key Facts about Muhammad Hammad:
- Name: Muhammad Hammad
- Roles: Full Stack Developer, React & Next.js Specialist, Creative UI/UX Engineer.
- Tech Stack: React.js, Next.js 14, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, Node.js, Express, MongoDB, REST APIs, Git, Vite, Vercel.
- Internships & Experience:
  1. IIFA Tech (Frontend Developer Intern) — React components, WCAG AA accessibility, performance optimization.
  2. Preesoft (Full Stack Developer Intern) — REST APIs, dashboards, MongoDB and Node.js backend integration.
  3. DevTechnoz (Web Developer Intern) — Responsive design, cross-browser compatibility, modern layouts.
- Education: Bachelor of Science in Computer Science (BS CS) at Superior University (2022–2026).
- Location: Lahore, Pakistan (PKT / UTC+5).
- Availability: Open to full-time engineering positions and select freelance/contract projects worldwide.
- Contact: muhammadhammadjato65@gmail.com | GitHub: github.com/muhammadhammad249 | LinkedIn: linkedin.com/in/muhammad-hammad-40a156290/
- Top Projects:
  1. RepuKeel (Next.js, TypeScript, Tailwind, Supabase — Global reputation defense & DMCA SaaS)
  2. Prolixus (Next.js 16, React 19, Tailwind, Stripe & PayPal — Organic e-commerce & subscriptions)
  3. Islamic Educational Platform (Next.js, TypeScript, Tailwind, next-intl, audio streaming, prayer times)
  4. Client Manager Pro (React.js, Vite, Tailwind CRM dashboard with real-time analytics)
  5. Livestock Link PK (Next.js livestock marketplace)
  6. JobBridge AI (React.js job portal)
  7. Aura Weather (React.js, Axios, real-time meteorological forecasting)

Always encourage users to reach out to Hammad via email or LinkedIn for collaborations!
`;

export default async function handler(req, res) {
  // CORS & Options
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please wait a minute before asking again.' });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message text is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.AI_API_KEY;

  // If no external API key is set, use grounded simulated AI intelligence fallback
  if (!apiKey) {
    const q = message.toLowerCase();
    let reply = "";

    // Greetings & Casual check-ins (English & Roman Urdu)
    if (/^(hi|hello|hey|hiya|yo|greetings|howdy|sup)\b/i.test(q) || /^(salam|assalam|aoa|kia hal|kya hal|kese ho|kaise ho)\b/i.test(q)) {
      reply = "Hello! 👋 Great to meet you! I'm Muhammad Hammad's AI Assistant. How can I help you today? You can ask me about his tech stack, featured projects like Prolixus and RepuKeel, software internships, or hiring availability!";
    } else if (q.includes('who are you') || q.includes('who is hammad') || q.includes('tell me about yourself') || q.includes('about hammad') || q.includes('introduction') || q.includes('bio') || q.includes('kon ho') || q.includes('kon hai')) {
      reply = "Muhammad Hammad is a passionate Full Stack Developer and Creative Engineer based in Lahore, Pakistan. He specializes in crafting ultra-responsive, Awwwards-level web apps using modern React, Next.js, TypeScript, and Node.js with scalable databases and smooth 60fps animations.";
    } else if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('frontend') || q.includes('backend') || q.includes('framework') || q.includes('tools')) {
      reply = "Hammad's core technology arsenal includes:\n• Frontend: React 19, Next.js 14/16, TypeScript, JavaScript (ES6+), Tailwind CSS, Framer Motion, HTML5/CSS3\n• Backend & APIs: Node.js, Express.js, RESTful APIs, Supabase\n• Databases: MongoDB, Supabase PostgreSQL\n• Tooling & Deployment: Git, GitHub, Vite, Vercel, Postman, Figma.";
    } else if (q.includes('react')) {
      reply = "React is Hammad's primary expertise! He builds production applications using React 19 and Next.js App Router, leveraging custom hooks, context state management, server components, and fluid Framer Motion animations.";
    } else if (q.includes('next') || q.includes('nextjs') || q.includes('next.js')) {
      reply = "Hammad has deep experience with Next.js 14 and Next.js 16, utilizing Server-Side Rendering (SSR), Static Site Generation (SSG), App Router, dynamic API routes, and internationalization (next-intl). Both RepuKeel and Prolixus are powered by Next.js!";
    } else if (q.includes('node') || q.includes('express') || q.includes('backend')) {
      reply = "For backend engineering, Hammad builds scalable REST APIs using Node.js and Express, integrated with MongoDB (Mongoose) and Supabase, with JWT authentication, role-based access control, and payment processing (Stripe & PayPal).";
    } else if (q.includes('project') || q.includes('work') || q.includes('portfolio') || q.includes('build') || q.includes('show me')) {
      reply = "Hammad has built 17+ production-grade projects! Top highlights include:\n1. RepuKeel: Next.js DMCA protection and brand defense SaaS\n2. Prolixus: Next.js 16 luxury organic e-commerce with Stripe & PayPal subscriptions\n3. Islamic Educational Platform: Multilingual portal with Quran audio & prayer times\n4. Client Manager Pro: Real-time React CRM dashboard with analytics\n5. Livestock Link PK: National agri-marketplace.";
    } else if (q.includes('prolixus')) {
      reply = "Prolixus is a bespoke luxury organic e-commerce platform built with Next.js 16 and Tailwind CSS. It features Stripe recurring subscriptions, PayPal SDK, downloadable lab verification certificates, English/German bilingual support, and a complete customer order dashboard.";
    } else if (q.includes('repukeel') || q.includes('dmca')) {
      reply = "RepuKeel is a production cybersecurity and reputation management platform built with Next.js, TypeScript, and Supabase. It protects brands from piracy, content leaks, and impostor profiles with automated DMCA takedowns and reverse-image search tools.";
    } else if (q.includes('experience') || q.includes('intern') || q.includes('job') || q.includes('company') || q.includes('work history') || q.includes('career')) {
      reply = "Hammad has completed 3 rigorous software engineering internships:\n1. IIFA Tech — Frontend Developer Intern (React components, WCAG AA accessibility, performance optimization)\n2. Preesoft — Full Stack Intern (REST APIs, admin dashboards, MongoDB & Node.js backend integration)\n3. DevTechnoz — Web Developer Intern (Responsive layouts, cross-browser compatibility, modern UI).";
    } else if (q.includes('education') || q.includes('university') || q.includes('degree') || q.includes('college') || q.includes('superior') || q.includes('study') || q.includes('bs cs')) {
      reply = "Hammad is currently completing his Bachelor of Science in Computer Science (BS CS) at Superior University in Pakistan (2022–2026), combining algorithmic problem-solving with modern software engineering.";
    } else if (q.includes('hire') || q.includes('available') || q.includes('freelance') || q.includes('contract') || q.includes('job offer') || q.includes('work together') || q.includes('remote')) {
      reply = "Yes! Hammad is actively available for full-time software engineering roles and high-impact freelance/contract projects. He has proven experience collaborating with global remote teams across US, UK, and Europe. You can email him directly at muhammadhammadjato65@gmail.com to discuss your project!";
    } else if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('message') || q.includes('connect') || q.includes('phone') || q.includes('whatsapp') || q.includes('linkedin') || q.includes('github')) {
      reply = "You can get in touch with Hammad through:\n• Email: muhammadhammadjato65@gmail.com\n• LinkedIn: linkedin.com/in/muhammad-hammad-40a156290\n• GitHub: github.com/muhammadhammad249\n• Or use the validated Contact Form on this portfolio page!";
    } else if (q.includes('location') || q.includes('where') || q.includes('city') || q.includes('country') || q.includes('pakistan') || q.includes('lahore') || q.includes('time') || q.includes('timezone')) {
      reply = "Hammad is located in Lahore, Pakistan (PKT, UTC+5). He coordinates smoothly with remote teams across multiple time zones, including North American and European business hours.";
    } else if (q.includes('service') || q.includes('what can you do') || q.includes('what do you offer') || q.includes('can you build') || q.includes('website') || q.includes('app')) {
      reply = "Hammad offers end-to-end web engineering services:\n1. Full-Stack Web Applications (React, Next.js, Node.js, MongoDB)\n2. High-Converting Landing Pages with Awwwards-grade interactive aesthetics\n3. SaaS & Dashboard Architectures with analytics and authentication\n4. E-Commerce Platforms with Stripe, PayPal, and subscription management\n5. Web Performance Optimization (Lighthouse 95+ score targets).";
    } else if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('pricing') || q.includes('budget') || q.includes('how much')) {
      reply = "Pricing depends on the scope, features, and timeline of the project. Hammad offers flexible fixed-milestone pricing for defined deliverables as well as hourly arrangements. Send a brief of your project to muhammadhammadjato65@gmail.com for a free consultation and estimate!";
    } else if (q.includes('resume') || q.includes('cv') || q.includes('pdf')) {
      reply = "You can download Hammad's official resume by clicking the 'Download CV' button in the Hero section of this portfolio, or by opening the Command Palette (Ctrl+K or Cmd+K) and selecting 'Download Resume'!";
    } else if (q.includes('thank') || q.includes('thanks') || q.includes('shukriya') || q.includes('nice') || q.includes('great') || q.includes('awesome') || q.includes('cool')) {
      reply = "Thank you so much! It means a lot. Hammad has poured immense craft and precision into engineering every pixel and animation here. Feel free to explore more or reach out if you'd like to collaborate!";
    } else if (q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('allah hafiz')) {
      reply = "Goodbye! Thanks for stopping by Muhammad Hammad's portfolio. Have a wonderful day ahead, and don't hesitate to reach out at muhammadhammadjato65@gmail.com anytime!";
    } else {
      reply = `Thank you for asking! Muhammad Hammad is a Full Stack Developer & Creative Engineer who crafts high-performance web systems using React, Next.js, TypeScript, and modern backend architectures. Feel free to explore his projects on this site or email him directly at muhammadhammadjato65@gmail.com!`;
    }

    return res.status(200).json({ reply, source: 'grounded-knowledge' });
  }

  try {
    // If Gemini API Key is provided
    if (process.env.GEMINI_API_KEY) {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
      const payload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_PROMPT}\n\nUser Question: ${message}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
        }
      };

      const aiResponse = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!aiResponse.ok) {
        throw new Error(`Gemini API returned status ${aiResponse.status}`);
      }

      const data = await aiResponse.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Hammad is ready to collaborate! Contact him at muhammadhammadjato65@gmail.com.";
      return res.status(200).json({ reply, source: 'gemini-live' });
    }

    // If OpenAI API Key is provided
    if (process.env.OPENAI_API_KEY) {
      const endpoint = 'https://api.openai.com/v1/chat/completions';
      const aiResponse = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message }
          ],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (!aiResponse.ok) {
        throw new Error(`OpenAI API returned status ${aiResponse.status}`);
      }

      const data = await aiResponse.json();
      const reply = data?.choices?.[0]?.message?.content || "Hammad is ready to collaborate! Contact him at muhammadhammadjato65@gmail.com.";
      return res.status(200).json({ reply, source: 'openai-live' });
    }
  } catch {
    return res.status(200).json({
      reply: "Hammad is a Full Stack Developer specializing in React, Next.js, and high-performance web systems. Feel free to reach him directly at muhammadhammadjato65@gmail.com!",
      source: 'fallback'
    });
  }
}

