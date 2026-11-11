"use client";

import { useState } from "react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import Button from "@/components/ui/Button";
import FaderInAnimation from "@/Hooks/FaderInAnimation";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import { useCurrency } from "@/context/CurrencyContext";

export default function ShippingForm({ nextStep, prevStep, goToStep, formData }) {
    const { formatPrice } = useCurrency();
    const [selectedMethod, setSelectedMethod] = useState("standard");

    // SIMPLIFIED SHIPPING: Selectable methods are currently hidden/commented below to focus on a single "Standard Shipping" (free) logic.
    const shippingMethods = [
        { id: "standard", name: "Standard Shipping", time: "3-5 business days", price: 0 },
        { id: "express", name: "Express Shipping", time: "1-2 business days", price: 15.00 },
    ];

    return (
        <div className="flex flex-col gap-8">
            <RevealInAnimation direction="left">
                <nav className="flex items-center gap-3 text-sm font-medium font-default">
                    <span className="text-gray-400 cursor-default">Information</span>
                    <div className="text-gray-400">
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <span className="text-primary font-bold">Shipping</span>
                    <div className="text-gray-400">
                        <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </div>
                    <span className="text-gray-400 cursor-default">Payment</span>
                </nav>
            </RevealInAnimation>

            <div className="space-y-10">
                {/* Summary Box */}
                <FaderInAnimation direction="up" delay={0.1}>
                    <div className="bg-white dark:bg-white/5 border border-divider rounded-2xl overflow-hidden text-sm">
                        <div className="p-5 flex items-baseline justify-between gap-4 border-b border-divider">
                            <div className="flex gap-6">
                                <span className="text-gray-400 font-accent w-12">Contact</span>
                                <span className="text-primary">{formData.email}</span>
                            </div>
                            <button onClick={() => goToStep(0)} className="text-accent text-xs font-bold hover:underline">Change</button>
                        </div>
                        <div className="p-5 flex items-baseline justify-between gap-4">
                            <div className="flex gap-6">
                                <span className="text-gray-400 font-accent w-12">Ship to</span>
                                <span className="text-primary">
                                    {formData.address}, {formData.apartment ? `${formData.apartment}, ` : ''}{formData.city} {formData.zip}
                                </span>
                            </div>
                            <button onClick={() => goToStep(0)} className="text-accent text-xs font-bold hover:underline">Change</button>
                        </div>
                    </div>
                </FaderInAnimation>

                <FaderInAnimation direction="up" delay={0.2}>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold tracking-tight text-primary">Shipping Method</h2>

                        <div className="bg-white dark:bg-white/5 border border-divider rounded-2xl overflow-hidden p-5 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="size-5 rounded-full bg-accent flex items-center justify-center">
                                    <div className="size-2 rounded-full bg-white" />
                                </div>
                                <div>
                                    <div className="text-base font-bold text-primary text-left">Standard Shipping</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 font-accent text-left">3-5 business days</div>
                                </div>
                            </div>
                            <div className="text-base font-bold text-primary">
                                Free
                            </div>
                        </div>

                        {/* Shipping selection disabled to focus on standard free shipping
                        <div className="bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden">
                            {shippingMethods.map((method, index) => (
                                <label
                                    key={method.id}
                                    className={`p-5 flex items-center justify-between gap-4 cursor-pointer transition-all hover:bg-[#f3f0e7]/30 ${index !== shippingMethods.length - 1 ? 'border-b border-gray-100 dark:border-white/10' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="radio"
                                            name="shipping"
                                            checked={selectedMethod === method.id}
                                            onChange={() => setSelectedMethod(method.id)}
                                            className="size-5 text-accent focus:ring-accent border-divider"
                                        />
                                        <div>
                                            <div className="text-base font-bold text-primary">{method.name}</div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 font-serif">{method.time}</div>
                                        </div>
                                    </div>
                                    <div className="text-base font-bold text-primary">
                                        {method.price === 0 ? 'Free' : formatPrice(method.price)}
                                    </div>
                                </label>
                            ))}
                        </div>
                        */}
                    </div>
                </FaderInAnimation>

                {/* Actions */}
                <FaderInAnimation direction="up" delay={0.3}>
                    <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-6 pt-6 border-t border-divider">
                        <button
                            onClick={prevStep}
                            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-accent transition-colors group"
                        >
                            <HiChevronLeft className="text-lg transition-transform group-hover:-translate-x-1" />
                            Return to Information
                        </button>

                        <Button
                            onClick={nextStep}
                            className="w-full sm:w-auto h-14 bg-accent! hover:bg-accent! text-white! font-bold text-lg rounded-full! shadow-lg shadow-accent/10 px-10"
                        >
                            Continue to Payment
                        </Button>
                    </div>
                </FaderInAnimation>
            </div>
        </div>
    );
}
