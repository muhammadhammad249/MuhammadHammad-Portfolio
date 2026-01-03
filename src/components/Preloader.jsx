import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ finishLoading }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
            setTimeout(finishLoading, 1000); // Allow exit animation to complete
        }, 3000);
        return () => clearTimeout(timer);
    }, [finishLoading]);

    return (
        <AnimatePresence>
            {!isLoaded && (
                <motion.div
                    className="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    <div className="stars"></div>
                    <div className="preloader-content">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            There's a new Web Dev in town.
                        </motion.h1>
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1, duration: 0.8 }}
                        >
                            Meet <span className="highlight">Muhammad Hammad</span>!
                        </motion.h2>
                        <motion.div
                            className="memoji-container"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                delay: 1.5,
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <span className="memoji-placeholder">👨‍💻</span>
                            {/* Replace with <img src={memojiImg} alt="Memoji" /> when available */}
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
