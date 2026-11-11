import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import './Toast.css';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <AnimatePresence>
      <motion.div
        className={`toast-notification glass-panel ${isSuccess ? 'toast-success' : 'toast-error'}`}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="toast-icon">
          {isSuccess ? <FaCheckCircle /> : <FaExclamationCircle />}
        </div>
        <div className="toast-text">
          <h5 className="toast-title">{toast.title || (isSuccess ? 'Success' : 'Error')}</h5>
          <p className="toast-msg">{toast.message}</p>
        </div>
        <button className="toast-close" onClick={onClose} aria-label="Close notification">
          <FaTimes />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

