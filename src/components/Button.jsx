import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

export function Button({ children, className, variant = 'primary', ...props }) {
    const variants = {
        primary: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50",
        secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md",
        outline: "border-2 border-white/40 text-white hover:bg-white/10"
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={twMerge(
                "px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
