"use client";
import { motion } from "framer-motion";

export default function FaderInAnimation({
  children,
  direction = "left",
  duration = 0.8,
  delay = 0,
  distance = 50,
}) {
  // ✅ sanitize to avoid non-finite values
  const safeDuration = Number.isFinite(Number(duration)) ? Number(duration) : 1;
  const safeDelay = Number.isFinite(Number(delay)) ? Number(delay) : 0;
  const safeDistance = Number.isFinite(Number(distance)) ? Number(distance) : 50;

  const variants = {
    hidden: {
      opacity: 0,
      x:
        direction === "left"
          ? -safeDistance
          : direction === "right"
            ? safeDistance
            : 0,
      y:
        direction === "up"
          ? safeDistance
          : direction === "down"
            ? -safeDistance
            : 0,
    },
    visible: { opacity: 1, x: 0, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: safeDuration, delay: safeDelay }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
