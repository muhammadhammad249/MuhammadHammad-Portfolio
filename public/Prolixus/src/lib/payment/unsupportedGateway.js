"use client";

import { HiExclamationCircle } from "react-icons/hi";

// ─── Provider (pass-through) ──────────────────────────────────────────────────
function UnsupportedProvider({ children }) {
    return <>{children}</>;
}

// ─── Checkout UI ──────────────────────────────────────────────────────────────
function UnsupportedCheckoutComponent({ methodName }) {
    return (
        <div className="bg-surface border border-divider rounded-2xl p-6 my-6 text-center">
            <div className="flex flex-col items-center gap-3">
                <HiExclamationCircle className="text-4xl text-amber-500" />
                <p className="text-primary font-bold">
                    {methodName || "This payment method"} is coming soon
                </p>
                <p className="text-sm text-gray-500 font-accent">
                    This gateway is not yet available. Please select a different payment method.
                </p>
            </div>
        </div>
    );
}

// ─── Adapter Export ───────────────────────────────────────────────────────────
const unsupportedGateway = {
    name: "Unsupported",
    ProviderComponent: UnsupportedProvider,
    CheckoutComponent: UnsupportedCheckoutComponent,
};

export default unsupportedGateway;
