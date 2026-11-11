import React from "react";
import RevealInAnimation from "@/Hooks/RevealInAnimation";
import FaderInAnimation from "@/Hooks/FaderInAnimation";

export default function ShopHero({ title, subtitle }) {
  return (
    <section className="w-full px-6 pt-14 pb-10 lg:px-16">
      <div className="mx-auto max-w-[1400px]">
        <RevealInAnimation direction="left" duration={0.8}>
          <h1 className="font-accent italic text-5xl font-light leading-[1.05] tracking-[-0.02em] text-(--primary-color) lg:text-6xl">
            {title}
          </h1>
        </RevealInAnimation>

        <FaderInAnimation direction="up" duration={0.7}>
          <p className="mt-4 max-w-[620px] font-default text-base leading-relaxed text-(--text-color)/80 lg:text-lg">
            {subtitle}
          </p>
        </FaderInAnimation>
      </div>
    </section>
  );
}
