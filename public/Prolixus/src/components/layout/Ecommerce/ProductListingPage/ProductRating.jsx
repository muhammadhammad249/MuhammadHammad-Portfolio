import React from "react";

function Star({ filled }) {
  return (
    <span
      aria-hidden="true"
      className={`text-[14px] ${
        filled ? "text-(--accent-color)" : "text-(--accent-color)/25"
      }`}
    >
      ★
    </span>
  );
}

export default function Rating({ value = 0, count = 0 }) {
  const v = Math.max(0, Math.min(5, value));
  return (
    <div className="mt-1 flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} filled={i < v} />
        ))}
      </div>
      <span className="ml-1 text-xs text-(--text-color)/50">
        ({count})
      </span>
    </div>
  );
}
