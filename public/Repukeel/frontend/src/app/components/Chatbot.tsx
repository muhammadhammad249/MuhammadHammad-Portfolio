/* eslint-disable */
"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';

// -----------------------------------------------------------------------------
// TYPES & SCRIPT CONFIG
// -----------------------------------------------------------------------------
type StepType = 'choice' | 'text' | 'phone' | 'end';

interface ScriptStep {
  id: number;
  botMessage: string;
  type: StepType;
  options?: string[]; // Only if type === 'choice'
  key: string; // The key to store the answer under
}

const CONVERSATION_SCRIPT: ScriptStep[] = [
  {
    id: 1,
    botMessage: "What type of issue are you facing?",
    type: 'choice',
    options: ["Content Removal", "Dating Reputation", "Search Result Cleanup", "Job Reputation", "Monitoring & Alerts", "Reputation Management", "Reputation Audit", "Industries"],
    key: "category"
  },
  {
    id: 2,
    botMessage: "Got it. How does our team handle this category... What type of content is involved?",
    type: 'choice',
    options: ["Images", "Videos", "Written Content", "Software/App", "Other"],
    key: "contentType"
  },
  {
    id: 3,
    botMessage: "Where is this unauthorized content appearing?",
    type: 'choice',
    options: ["Google Search", "Social Media", "A Specific Website", "File-Sharing/Leak Site", "Not Sure"],
    key: "location"
  },
  {
    id: 4,
    botMessage: "Roughly how many pieces of content need to be removed?",
    type: 'choice',
    options: ["Just 1", "2-5", "6-20", "20+ / Not sure yet"],
    key: "volume"
  },
  {
    id: 5,
    botMessage: "To connect you with the right specialist, I just need a few quick details.\n\nWhat's your full name?",
    type: 'text',
    key: "name"
  },
  {
    id: 6,
    botMessage: "What's the best email address to reach you?",
    type: 'text',
    key: "email"
  },
  {
    id: 7,
    botMessage: "WhatsApp number",
    type: 'phone',
    key: "phone"
  },
  {
    id: 8,
    botMessage: "Please briefly describe the situation and include any relevant links for our team to review.",
    type: 'text',
    key: "description"
  },
  {
    id: 9,
    botMessage: "How quickly do you need this resolved?",
    type: 'choice',
    options: ["Immediately", "Within a week", "Just exploring options"],
    key: "urgency"
  },
  {
    id: 10,
    botMessage: "How would you prefer we reach out?",
    type: 'choice',
    options: ["Email", "Phone Call", "Text"],
    key: "contactPreference"
  },
  {
    id: 11,
    botMessage: "Thanks! Our team will review your case and reach out within a few hours during business hours.\n\nIf this is urgent, you can book a priority consultation below.",
    type: 'end',
    key: "end"
  }
];

type Message = {
  id: string;
  role: 'bot' | 'user';
  text: string;
  stepId?: number;
};

// Send all collected chatbot answers to admin via email
async function sendChatbotLeadEmail(answers: Record<string, string>) {
  try {
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'chatbot_lead',
        ...answers,
      }),
    });
  } catch (err) {
    console.error('[Chatbot] Failed to send lead email:', err);
  }
}

// -----------------------------------------------------------------------------
// COMPONENT
// -----------------------------------------------------------------------------
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // State Machine
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Chat History
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Keep focus on input whenever the step changes to a text/phone step
  useEffect(() => {
    if (!isOpen || isTyping) return;
    const currentStep = CONVERSATION_SCRIPT.find(s => s.id === currentStepId);
    if (currentStep?.type === 'text' || currentStep?.type === 'phone') {
      // Small delay to let the DOM render
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [isOpen, isTyping, currentStepId]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStepId(1);
      setAnswers({});
      setInputValue('');
      const firstStep = CONVERSATION_SCRIPT.find(s => s.id === 1)!;
      setMessages([{ id: `bot-${Date.now()}`, role: 'bot', text: firstStep.botMessage, stepId: 1 }]);
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    };
  }, [isOpen]);

  const currentStep = CONVERSATION_SCRIPT.find(s => s.id === currentStepId);

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits, +, spaces, dashes, parentheses
    const cleaned = e.target.value.replace(/[^\d\s\+\-\(\)]/g, '');
    setInputValue(cleaned);
  };

  const handleUserResponse = useCallback((text: string) => {
    if (!text.trim() || !currentStep || currentStep.type === 'end') return;

    // Add user message
    const userMsg: Message = { id: `user-${Date.now()}`, role: 'user', text, stepId: currentStepId };
    setMessages(prev => [...prev, userMsg]);

    // Save answer
    const updatedAnswers = { ...answers, [currentStep.key]: text };
    setAnswers(updatedAnswers);
    setInputValue('');

    // Advance step
    const nextStepId = currentStepId + 1;
    const nextStep = CONVERSATION_SCRIPT.find(s => s.id === nextStepId);

    if (nextStep) {
      setCurrentStepId(nextStepId);
      setIsTyping(true);

      setTimeout(() => {
        setMessages(prev => [...prev, { id: `bot-${Date.now()}`, role: 'bot', text: nextStep.botMessage, stepId: nextStepId }]);
        setIsTyping(false);

        // When reaching the end step, send the email with all collected data
        if (nextStep.type === 'end') {
          sendChatbotLeadEmail(updatedAnswers);
        }
      }, 1000);
    }
  }, [currentStep, currentStepId, answers]);

  const handleGoBack = () => {
    if (currentStepId <= 1 || isTyping) return;

    const prevStepId = currentStepId - 1;
    const prevStep = CONVERSATION_SCRIPT.find(s => s.id === prevStepId);

    if (prevStep) {
      setMessages(prev => {
        const newHistory = prev.filter(m => {
          if (m.stepId === undefined) return true;
          if (m.stepId < prevStepId) return true;
          if (m.stepId === prevStepId && m.role === 'bot') return true;
          return false;
        });
        return newHistory;
      });

      setCurrentStepId(prevStepId);
    }
  };

  // Helper to render text with newlines and email links
  const renderMessageText = (text: string, isUser: boolean) => {
    const isEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);

    return text.split('\n').map((line, i) => {
      if (isUser && isEmail(line)) {
        return (
          <React.Fragment key={i}>
            <a href={`mailto:${line}`} className="underline text-white hover:text-blue-100">{line}</a>
            {i < text.split('\n').length - 1 && <br />}
          </React.Fragment>
        );
      }
      return (
        <React.Fragment key={i}>
          {line}
          {i < text.split('\n').length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* 1. CLOSED STATE (DO NOT CHANGE) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#0f172a] border-[3px] border-[var(--gold)] shadow-lg transition-transform hover:scale-105 relative z-10"
          aria-label="Open chat support"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-[30px] h-[30px]">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8.01" y2="16"></line>
            <line x1="16" y1="16" x2="16.01" y2="16"></line>
          </svg>
          {/* Notification Bubble */}
          <span className="absolute -top-1 -right-1 w-[22px] h-[22px] rounded-full bg-[#ef4444] text-white text-[13px] font-[800] flex items-center justify-center border-[3px] border-white shadow-sm leading-none pt-[1px]">1</span>
        </button>
      )}

      {/* 2. OPEN STATE - PANEL */}
      {isOpen && (
        <div className="fixed bottom-[26px] right-[26px] z-[1000] w-[360px] md:w-[380px] bg-white rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col border border-gray-200" style={{ maxHeight: '80vh', height: '600px' }}>

          {/* Header */}
          <div className="bg-white border-b border-gray-100 p-4 flex items-center justify-between shrink-0 shadow-sm relative z-10">
            <div className="flex items-center gap-3">
              {/* Back Arrow */}
              <button
                onClick={handleGoBack}
                disabled={currentStepId <= 1 || isTyping}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${currentStepId > 1 && !isTyping ? 'hover:bg-gray-100 text-gray-700 cursor-pointer' : 'text-gray-300 cursor-not-allowed'}`}
                aria-label="Go back"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><polyline points="15 18 9 12 15 6"/></svg>
              </button>

              <div>
                <h3 className="m-0 text-[16px] text-gray-900 font-[800]">Confidential Assessment</h3>
                <div className="text-[12px] text-green-500 flex items-center gap-1.5 mt-0.5 font-[600]">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> Live Support
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>

          {/* Chat Body */}
          <div className="p-5 flex flex-col gap-4 bg-[#f8fafc] overflow-y-auto flex-grow scroll-smooth">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-full`}>
                <div
                  className={`px-4 py-3 text-[14.5px] leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#2b52c9] text-white rounded-[16px] rounded-tr-[4px] font-[600]'
                      : 'bg-white text-gray-800 rounded-[16px] rounded-tl-[4px] border border-gray-100'
                  }`}
                  style={{ maxWidth: '85%', wordBreak: 'break-word' }}
                >
                  <p className="m-0">{renderMessageText(msg.text, msg.role === 'user')}</p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-white border border-gray-100 px-4 py-4 rounded-[16px] rounded-tl-[4px] flex gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            {/* Option Pills */}
            {!isTyping && currentStep?.type === 'choice' && currentStep.options && messages[messages.length-1]?.role === 'bot' && (
              <div className="flex flex-wrap gap-2 mt-2">
                {currentStep.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleUserResponse(opt)}
                    className="bg-white border border-gray-200 text-gray-800 px-4 py-2.5 rounded-full text-[13.5px] font-[600] hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
                    style={{ flex: currentStep.options!.length <= 3 || opt.length > 25 ? '1 1 100%' : '1 1 calc(50% - 4px)' }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* End Step CTA */}
            {!isTyping && currentStep?.type === 'end' && (
              <div className="mt-2 w-full flex justify-center">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-[#d9a52b] hover:bg-[#b8860f] text-black font-[800] px-6 py-3 rounded-xl shadow-md transition-colors w-full text-center"
                >
                  Book Strategy Call
                </Link>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="bg-white border-t border-gray-100 p-3 flex items-center gap-2 shrink-0 relative">
            {/* Input Field */}
            <input
              ref={inputRef}
              type={currentStep?.type === 'phone' ? 'tel' : 'text'}
              inputMode={currentStep?.type === 'phone' ? 'tel' : 'text'}
              value={inputValue}
              onChange={currentStep?.type === 'phone' ? handlePhoneInput : (e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleUserResponse(inputValue)}
              placeholder={
                currentStep?.type === 'choice' ? "Hit the buttons to respond" :
                currentStep?.type === 'end' ? "Chat ended" :
                currentStep?.type === 'phone' ? "Numbers only, e.g. +1 555 123 4567" :
                "Enter your message..."
              }
              disabled={currentStep?.type === 'choice' || currentStep?.type === 'end' || isTyping}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2.5 text-[14px] text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-300 focus:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            />

            {/* Send Button */}
            <button
              onClick={() => handleUserResponse(inputValue)}
              disabled={!inputValue.trim() || currentStep?.type === 'choice' || currentStep?.type === 'end' || isTyping}
              className="w-10 h-10 flex items-center justify-center bg-[#2b52c9] text-white rounded-full hover:bg-[#20409a] transition-colors shrink-0 disabled:opacity-50 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5 ml-0.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
