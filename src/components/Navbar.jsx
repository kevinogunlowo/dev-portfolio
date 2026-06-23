// Navbar.jsx
// Fixed navigation bar with logo, desktop nav links, mobile hamburger menu,
// and dark/light mode toggle. Stays visible at top of page at all times.

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    // Controls mobile menu open/close state
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Nav items used in both desktop and mobile menus
    const navItems = ["Home", "Skills", "Work", "About", "Contact"];

    // Smoothly scrolls to section by ID and closes mobile menu if open
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsMenuOpen(false);
        }
    };

    return (
        <motion.nav
            style={{ opacity: 1 }}
            className={`fixed top-0 w-full z-50 px-6 py-4 ${isDarkMode ? "bg-gray-950/80" : "bg-gray-50/80"
                } backdrop-blur-md border-b ${isDarkMode ? "border-gray-800" : "border-gray-200"
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Logo / Brand */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => scrollToSection("home")}
                >
                    <Code2 size={24} className="text-blue-500" />
                    <span className="text-lg ml-1">Kevin Ogunlowo</span>
                </motion.div>

                {/* Desktop Navigation — hidden on mobile */}
                <div className="hidden md:flex items-center space-x-8">
                    {/* ✅ extracted navItems array — only one place to update */}
                    {navItems.map((item) => (
                        <motion.button
                            key={item}
                            whileHover={{ y: -2 }}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className={`text-sm uppercase tracking-wider transition-colors ${isDarkMode
                                    ? "text-gray-400 hover:text-white"
                                    : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {item}
                        </motion.button>
                    ))}

                    {/* Dark/Light mode toggle — desktop */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors ${isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        {/* Shows sun in dark mode (to switch to light), moon in light mode */}
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.button>
                </div>

                {/* Mobile Controls — dark mode toggle + hamburger menu */}
                <div className="md:hidden flex items-center space-x-4">

                    {/* Dark/Light mode toggle — mobile */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-colors ${isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </motion.button>

                    {/* Hamburger / Close toggle button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2 rounded-full transition-colors ${isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-200"
                            }`}
                    >
                        {/* Switches between X and hamburger icon based on menu state */}
                        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </div>

            {/* Mobile Dropdown Menu
                AnimatePresence enables exit animation when menu closes */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`md:hidden mt-4 p-4 rounded-lg border ${isDarkMode
                                ? "bg-gray-900 border-gray-800"
                                : "bg-white border-gray-200"
                            }`}
                    >
                        {navItems.map((item) => (
                            <motion.button
                                key={item}
                                whileHover={{ x: 5 }}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className={`block w-full text-left py-2 text-sm uppercase tracking-wider transition-colors ${isDarkMode
                                        ? "text-gray-400 hover:text-white"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {item}
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;