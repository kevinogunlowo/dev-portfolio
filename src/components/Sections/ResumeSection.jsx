// ResumeSection.jsx
// Displays a full-width CTA section prompting visitors to download
// Kevin's resume. Dark mode shows a gradient background, light mode is plain white.

import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { Download } from "lucide-react";

const ResumeSection = () => {
    const { isDarkMode } = useTheme();

    return (
        <section
            className={`py-32 px-6 ${isDarkMode
                    ? "bg-gray-950 text-white"
                    : "bg-white text-gray-900"
                } relative overflow-hidden`}
        >
            {/* Dark mode only — gradient overlay for depth effect
                Not shown in light mode since background is plain white */}
            {isDarkMode && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-black opacity-90" />
            )}

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-10">

                {/* Section heading — animates up on scroll */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`text-3xl md:text-5xl font-light tracking-widest uppercase ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                >
                    Check Out My{" "}
                    <span className="font-medium">Résumé!</span>
                </motion.h2>

                {/* Download Button
                    motion.div handles animations — plain <a> handles download
                    This prevents Framer Motion from interfering with
                    the browser's native file download behavior */}
                {/* Download Button */}
<motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className="inline-block"
>
    <a
        href="/KevinOgunlowo1.pdf"
        download="KevinOgunlowo1.pdf"
        className={`inline-flex items-center space-x-2 px-10 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-300 border ${
            isDarkMode
                ? "border-gray-600 text-white hover:border-blue-500 hover:text-blue-400"
                : "border-gray-300 text-gray-800 hover:border-blue-500 hover:text-blue-600"
        }`}
    >
        <Download size={16} />
        <span>Grab A Copy</span>
    </a>
</motion.div>
            </div>
        </section>
    );
};

export default ResumeSection;