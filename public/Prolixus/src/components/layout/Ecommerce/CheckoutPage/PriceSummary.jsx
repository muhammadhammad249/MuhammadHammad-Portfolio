"use client";

import { useCurrency } from "@/context/CurrencyContext";

export default function PriceSummary({ subtotal, tax, total }) {
    const { formatPrice, currency } = useCurrency();
    return (
        <div className="space-y-3 pb-6 border-b border-divider text-sm text-text">
            <div className="flex justify-between">
                <span className="text-text/70 font-accent">Subtotal</span>
                <span className="font-medium text-primary">{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between">
                <span className="text-text/70 font-accent">Shipping</span>
                <span className="text-sm text-accent font-semibold font-accent">Free</span>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-text/70 flex items-center gap-1 font-accent">
                    Estimated taxes
                    <svg className="size-4 opacity-50 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                </span>
                <span className="font-medium text-primary">{formatPrice(tax)}</span>
            </div>

            <div className="flex justify-between items-baseline mt-6 mb-8 pt-4 border-t border-divider">
                <span className="text-primary text-lg font-bold font-default">Total</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-accent text-xs uppercase tracking-wide font-default">{currency}</span>
                    <span className="text-primary text-2xl font-bold tracking-tight">{formatPrice(total)}</span>
                </div>
            </div>
        </div>
    );
}