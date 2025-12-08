import React from 'react';
import { motion } from 'framer-motion';

export const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans selection:bg-sky-500/30">
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black z-0 pointer-events-none" />

            {/* Decorative Orbs */}
            <div className="fixed top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl z-0 animate-pulse" />
            <div className="fixed bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl z-0" />

            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-7xl mx-auto"
            >
                {children}
            </motion.main>
        </div>
    );
};
