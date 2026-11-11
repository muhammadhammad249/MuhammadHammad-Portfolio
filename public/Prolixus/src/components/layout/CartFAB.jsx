"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";

const CartFAB = () => {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [shouldPulse, setShouldPulse] = React.useState(false);
  const prevCount = React.useRef(itemCount);

  React.useEffect(() => {
    if (itemCount > prevCount.current) {
      setShouldPulse(true);
      const timer = setTimeout(() => setShouldPulse(false), 1000);
      return () => clearTimeout(timer);
    }
    prevCount.current = itemCount;
  }, [itemCount]);

  // Hide FAB on cart and checkout pages
  const hiddenPages = ["/cart", "/checkout"];
  if (hiddenPages.includes(pathname)) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[100]"
      >
        <Link 
          href="/cart" 
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl border border-white/20 group"
        >
          <FaCartShopping className="text-xl transition-transform duration-300 group-hover:rotate-12" />
          
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={itemCount}
              className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-bold text-primary shadow-sm border border-accent"
            >
              {itemCount > 99 ? "99+" : itemCount}
            </motion.span>
          )}

          {/* Controlled pulse animation when item is added */}
          {shouldPulse && (
            <motion.div
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 rounded-full bg-accent pointer-events-none"
            />
          )}
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartFAB;
