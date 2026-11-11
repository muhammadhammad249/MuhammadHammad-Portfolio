"use client";

import React, { useState } from "react";

/**
 * QuantitySelector Component
 * 
 * Quantity input with increment/decrement buttons.
 * Premium styling with smooth transitions.
 */
export default function QuantitySelector({
    initialQuantity = 1,
    min = 1,
    max = 99,
    onChange,
}) {
    const [quantity, setQuantity] = useState(initialQuantity);

    const updateQuantity = (newValue) => {
        const clampedValue = Math.max(min, Math.min(max, newValue));
        setQuantity(clampedValue);
        onChange?.(clampedValue);
    };

    const decrement = () => updateQuantity(quantity - 1);
    const increment = () => updateQuantity(quantity + 1);

    return (
        <div className="inline-flex items-center rounded-lg border border-(--divider-color) bg-(--white-color)">
            {/* Decrement Button */}
            <button
                type="button"
                onClick={decrement}
                disabled={quantity <= min}
                className="
          flex h-11 w-11 items-center justify-center
          text-lg font-medium text-(--primary-color)
          transition-colors duration-200
          hover:bg-(--secondary-color)
          disabled:cursor-not-allowed disabled:opacity-40
        "
                aria-label="Decrease quantity"
            >
                −
            </button>

            {/* Quantity Display */}
            <span
                className="
          flex h-11 min-w-[3rem] items-center justify-center
          border-x border-(--divider-color)
          text-base font-semibold text-(--primary-color)
        "
                aria-live="polite"
                aria-atomic="true"
            >
                {quantity}
            </span>

            {/* Increment Button */}
            <button
                type="button"
                onClick={increment}
                disabled={quantity >= max}
                className="
          flex h-11 w-11 items-center justify-center
          text-lg font-medium text-(--primary-color)
          transition-colors duration-200
          hover:bg-(--secondary-color)
          disabled:cursor-not-allowed disabled:opacity-40
        "
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
}
