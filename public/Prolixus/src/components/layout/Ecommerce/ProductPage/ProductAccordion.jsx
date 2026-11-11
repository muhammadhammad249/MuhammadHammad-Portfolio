"use client";

import React, { useState } from "react";

/**
 * ChevronIcon Component
 */
function ChevronIcon({ isOpen }) {
    return (
        <svg
            className={`h-5 w-5 text-(--primary-color) transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

/**
 * AccordionItem Component
 */
function AccordionItem({ title, content, isOpen, onToggle }) {
    return (
        <div className="border-b border-(--divider-color) last:border-b-0">
            <button
                type="button"
                onClick={onToggle}
                className="
          flex w-full items-center justify-between py-4
          text-left font-medium text-(--primary-color)
          transition-colors duration-200
          hover:text-(--accent-color)
        "
                aria-expanded={isOpen}
            >
                <span className="text-base">{title}</span>
                <ChevronIcon isOpen={isOpen} />
            </button>

            <div
                className={`
          transition-all duration-300 ease-in-out custom-scrollbar
          ${isOpen ? "max-h-60 opacity-100 pb-4 overflow-y-auto" : "max-h-0 opacity-0 overflow-hidden"}
        `}
            >
                <div className="text-sm leading-relaxed text-(--text-color)">
                    {typeof content === "string" ? (
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    ) : (
                        content
                    )}
                </div>
            </div>
        </div>
    );
}

/**
 * ProductAccordion Component
 * 
 * Collapsible sections for product details like ingredients,
 * how to use, and shipping information.
 */
export default function ProductAccordion({ items = [] }) {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleItem = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    // Default items if none provided
    const defaultItems = [
        {
            title: "Ingredients",
            content: "Our carefully curated blend of natural ingredients provides optimal benefits for your skin."
        },
        {
            title: "How to Use",
            content: "Apply a few drops to clean, damp skin. Gently massage in upward circular motions until fully absorbed. Use morning and evening for best results."
        },
        /*
                {
                    title: "Shipping & Returns",
                    content: "Free shipping on orders over $50. Returns accepted within 30 days of purchase. Please contact our customer service for return authorization."
                }
                */
    ];

    const displayItems = items.length > 0 ? items : defaultItems;

    return (
        <div className="border-t border-(--divider-color)">
            {displayItems.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onToggle={() => toggleItem(index)}
                />
            ))}
        </div>
    );
}
