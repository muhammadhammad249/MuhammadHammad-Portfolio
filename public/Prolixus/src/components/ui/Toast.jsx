"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCircleCheck, FaCircleExclamation, FaXmark } from "react-icons/fa6";
import PropTypes from "prop-types";

/**
 * Toast Component
 * 
 * A premium, animated notification popup for success or error messages.
 * Positioned fixed at the bottom-right of the screen.
 * 
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the toast
 * @param {string} props.message - Message to display
 * @param {"success" | "error" | "info"} props.type - Type of toast
 * @param {function} props.onClose - Function to call when toast closes
 * @param {number} props.duration - Duration in ms before auto-closing (default 5000)
 */
const Toast = ({ 
  show, 
  message, 
  type = "success", 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  const icons = {
    success: <FaCircleCheck className="text-accent text-xl" />,
    error: <FaCircleExclamation className="text-error text-xl" />,
    info: <FaCircleExclamation className="text-accent/60 text-xl" />,
  };

  const colors = {
    success: "border-accent/20 bg-white/95", // Using white background for light mode feel with accent border
    error: "border-error/20 bg-white/95",
    info: "border-primary/10 bg-white/95",
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
          className={`
            fixed bottom-6 right-6 z-[9999] flex items-center gap-4 p-5 pr-12
            min-w-[340px] max-w-md rounded-2xl border shadow-[0_20px_50px_rgba(11,16,32,0.12)] 
            backdrop-blur-sm font-default
            ${colors[type] || colors.success}
          `}
        >
          <div className="shrink-0">
            {icons[type] || icons.success}
          </div>
          
          <div className="flex-1">
            <h4 className="text-[15px] font-bold text-[var(--primary-color)] capitalize font-accent leading-none">
              {type === "success" ? "Success!" : type === "error" ? "Something went wrong" : "Notification"}
            </h4>
            <p className="text-sm text-[var(--text-color)]/80 mt-1.5 leading-relaxed font-medium">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-[var(--primary-color)]/30 hover:text-[var(--primary-color)]/80 transition-colors p-1.5 rounded-full hover:bg-[var(--primary-color)]/5"
            aria-label="Close notification"
          >
            <FaXmark size={14} />
          </button>

          {/* Progress bar indication */}
          {duration > 0 && (
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className={`
                absolute bottom-0 left-0 h-1 rounded-full
                ${type === "success" ? "bg-[var(--accent-color)]" : type === "error" ? "bg-[var(--error-color)]" : "bg-[var(--primary-color)]/20"}
              `}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Toast.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Toast;
