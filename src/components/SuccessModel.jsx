// SuccessModal.jsx
// Displays a modal overlay after a successful contact form submission.
// Auto-hides after 3 seconds (controlled by parent) or can be closed manually.

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Sparkle } from "lucide-react";

// ✅ renamed from SuccessModel to SuccessModal
const SuccessModal = ({ showSuccess, setShowSuccess, isDarkMode }) => {
    return (
        // AnimatePresence enables exit animations when modal is removed from DOM
        <AnimatePresence>
            {showSuccess && (
                // Backdrop — clicking outside the card closes the modal
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={() => setShowSuccess(false)}
                >
                    {/* Modal Card
                        stopPropagation prevents clicks inside from closing the modal */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className={`relative p-8 rounded-2xl border max-w-sm w-full text-center ${
                            isDarkMode
                                ? "bg-gray-800 border-gray-700"
                                : "bg-white border-gray-200"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button — top right corner */}
                        <button
                            onClick={() => setShowSuccess(false)}
                            className={`absolute top-4 right-4 p-1 rounded-full transition-colors ${
                                isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                        >
                            <X size={18} />
                        </button>

                        {/* Green checkmark circle — springs in with delay */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6"
                        >
                            <CheckCircle size={32} className="text-white" />
                        </motion.div>

                        {/* Success heading — fades up with delay */}
                        <motion.h3
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-2xl font-medium mb-2"
                        >
                            Message Sent!
                        </motion.h3>

                        {/* Success message — fades up slightly after heading */}
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={`${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                            } mb-6`}
                        >
                            Thank you for reaching out! I'll get back to you within 24 hours.
                        </motion.p>

                        {/* Sparkle icon — pops in last for a finishing touch */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-center"
                        >
                            <Sparkle className="text-yellow-500" size={24} />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// ✅ renamed export from SuccessModel to SuccessModal
export default SuccessModal;