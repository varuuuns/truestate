import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

const ErrorModal = ({ isOpen, onClose, title, message }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                    >
                        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-red-100 m-4">
                            {/* Header */}
                            <div className="bg-red-50 px-6 py-4 flex items-center justify-between border-b border-red-100">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-100 rounded-full">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900">{title || 'Error'}</h3>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-red-100 rounded-full"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <p className="text-gray-600 leading-relaxed">
                                    {message}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors shadow-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ErrorModal;
