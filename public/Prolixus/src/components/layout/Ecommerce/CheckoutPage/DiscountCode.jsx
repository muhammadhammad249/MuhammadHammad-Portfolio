"use client";

import { useState } from "react";

export default function DiscountCode() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleApply = async () => {
        if (!code.trim()) return;

        try {
            setLoading(true);

            // simulate api call
            await new Promise((resolve) => setTimeout(resolve, 1000));

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex gap-3 mb-8 pt-6 border-t border-divider">
            <div className="relative flex-1">
                <input
                    type="text"
                    placeholder="Discount code or gift card"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-12 px-4 bg-white border border-divider rounded-xl focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm font-default transition-all placeholder:text-text/40"
                />
            </div>

            <button
                onClick={handleApply}
                disabled={!code.trim() || loading}
                className="bg-primary/10 hover:bg-primary/20 text-primary/70 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed font-semibold font-default text-sm px-5 h-12 rounded-xl transition-colors active:scale-95"
            >
                {loading ? "..." : "Apply"}
            </button>
        </div>
    );
}
