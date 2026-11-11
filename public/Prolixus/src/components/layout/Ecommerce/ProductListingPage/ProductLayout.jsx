"use client";
import React from "react";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function ShopLayout({ sidebar, content, showFilters }) {
  return (
    <section className="w-full px-6 pb-20 lg:px-16">
      <div className="mx-auto max-w-[1400px] border-t border-(--divider-color) pt-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Mobile: toggle visibility via showFilters. Desktop (lg+): always visible */}
          <aside
            className={`w-full shrink-0 lg:w-1/4 lg:sticky lg:bottom-2 lg:self-end lg:!block
              ${showFilters ? "block" : "hidden"}`}
          >
            <FaderInAnimation direction="left" duration={0.7}>
              {sidebar}
            </FaderInAnimation>
          </aside>

          <main className="w-full lg:w-3/4">
              {content}
          </main>
        </div>
      </div>
    </section>
  );
}

