"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function RevealInAnimation({
  children,
  delay = 0,
  duration = 0.8,
  direction = "left", // left | right | top | bottom
}) {
  const clipVariants = {
    left: {
      initial: "inset(0 100% 0 0)",
      animate: "inset(0 0% 0 0)",
    },
    right: {
      initial: "inset(0 0 0 100%)",
      animate: "inset(0 0 0 0)",
    },
    top: {
      initial: "inset(100% 0 0 0)",
      animate: "inset(0 0 0 0)",
    },
    bottom: {
      initial: "inset(0 0 100% 0)",
      animate: "inset(0 0 0 0)",
    },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true, // only trigger the first time it enters view
    margin: "0px 0px -10% 0px", // triggers a bit before fully visible
  });

  const variant = clipVariants[direction] ?? clipVariants.left;

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        initial={{ clipPath: variant.initial }}
        animate={isInView ? { clipPath: variant.animate } : { clipPath: variant.initial }}
        transition={{
          duration,
          delay,
          ease: [0.45, 0, 0.55, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
