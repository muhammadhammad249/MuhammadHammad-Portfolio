"use client";

import React from "react";

/**
 * ProductCardSkeleton Component
 * 
 * A pulsing placeholder for the ProductCard component.
 * Matches the exact dimensions and layout (rounded-[18px], aspect-square).
 */
export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[18px] border border-(--divider-color) bg-(--white-color) shadow-sm animate-pulse">
      {/* Image Placeholder */}
      <div className="aspect-square bg-gray-200"></div>

      {/* Content Placeholder */}
      <div className="flex grow flex-col p-4 gap-3">
        {/* Title Lines */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="h-4 w-1/2 rounded bg-gray-200"></div>
        </div>

        {/* Rating Line */}
        <div className="h-3 w-20 rounded bg-gray-100 mt-1"></div>

        {/* Description Lines */}
        <div className="space-y-2 mt-1">
          <div className="h-3 w-full rounded bg-gray-100"></div>
          <div className="h-3 w-5/6 rounded bg-gray-100"></div>
        </div>

        {/* Footer: Price and Button */}
        <div className="mt-auto pt-3 flex items-center justify-between gap-3">
          <div className="h-6 w-16 rounded bg-gray-200"></div>
          <div className="h-9 w-24 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
