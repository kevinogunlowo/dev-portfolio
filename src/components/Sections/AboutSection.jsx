// AboutSection.jsx
// Displays personal story, passions, developer journey timeline,
// and a call-to-action button linking to the contact section.

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { JOURNEY_STEPS, PASSIONS } from "../../utils/data";
import SIGNATURE from "../../assets/images/signature.svg";
import { containerVariants, itemVariants } from "../../utils/helper";

const AboutSection = () => {
    const { isDarkMode } = useTheme();

    // Ref for the entire section — used for scroll-based animations
    const sectionRef = useRef(null);

    // Ref for the timeline column — animates separately from the rest
    const timelineRef = useRef(null);

    // Triggers animations when section enters the viewport
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Triggers timeline animations slightly earlier
    const timelineInView = useInView(timelineRef, { once: true, margin: "-50px" });

    // Tracks scroll position within the section for parallax effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Maps scroll progress to a vertical offset for the background blobs
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Animation variants for the timeline container
    // staggers each child step by 0.2s
    const timelineVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    // Animation variants for each individual timeline step
    // slides in from the left
    const stepVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    return (
        <section
            id="about"
            ref={sectionRef}
            className={`py-24 px-6 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            } relative overflow-hidden`}
        >
            {/* Parallax background blobs — move at different speed to page scroll */}
            <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
                <div
                    className={`absolute top-40 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-5 ${
                        isDarkMode ? "bg-blue-500" : "bg-blue-400"
                    }`}
                />
                <div
                    className={`absolute bottom-20 left-1/3 w-96 h-96 rounded-full blur-3xl opacity-5 ${
                        isDarkMode ? "bg-purple-500" : "bg-purple-400"
                    }`}
                />
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header — animates in when scrolled into view */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mb-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className={`text-sm uppercase tracking-widest ${
                            isDarkMode ? "text-gray-500" : "text-gray-600"
                        } mb-4`}
                    >
                        Get to Know Me
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-5xl font-light mb-6"
                    >
                        About
                        <span className="text-blue-500 font-medium"> Me</span>
                    </motion.h2>
                </motion.div>

                {/* Two column grid — personal story left, timeline right */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT COLUMN — Personal Story, Passions, Signature */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                        className="space-y-8"
                    >
                        {/* Bio Card */}
                        <motion.div
                            variants={itemVariants}
                            className={`p-8 rounded-2xl border ${
                                isDarkMode
                                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                    : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                            }`}
                        >
                            <h3 className="text-2xl font-medium mb-6">My Mission</h3>
                            <p className={`text-lg leading-relaxed mb-6 ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}>
                                I'm a software engineer based in Scarborough, Ontario, building
                                cross-platform mobile and web applications. I've worked professionally
                                with Flutter and Dart at WIMTACH and WOCA Tech Solutions — shipping
                                real apps and solving problems that actually matter to users.
                            </p>
                            <p className={`text-base leading-relaxed ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                                My stack spans mobile and web — Flutter and Dart for cross-platform
                                apps, React and TypeScript on the frontend, and Python where AI meets
                                the backend. Five Microsoft certifications back up the theory behind
                                the practice.
                            </p>
                        </motion.div>

                        {/* Passions List — maps over PASSIONS array from data.js */}
                        <motion.div variants={itemVariants} className="space-y-4">
                            <h3 className="text-xl font-medium mb-6">What I Love Building</h3>
                            <div className="grid gap-4">
                                {PASSIONS.map((passion) => (
                                    // key uses title since it's unique per passion
                                    <motion.div
                                        key={passion.title}
                                        variants={itemVariants}
                                        whileHover={{ x: 4 }}
                                        className={`flex items-center space-x-4 p-4 rounded-xl ${
                                            isDarkMode
                                                ? "bg-gray-800/30 hover:bg-gray-800/50"
                                                : "bg-gray-50/50 hover:bg-gray-100/50"
                                        } transition-all duration-300`}
                                    >
                                        {/* Icon container */}
                                        <div className={`p-3 rounded-lg ${
                                            isDarkMode ? "bg-gray-700" : "bg-white"
                                        }`}>
                                            <passion.icon size={20} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">{passion.title}</h4>
                                            <p className={`text-sm ${
                                                isDarkMode ? "text-gray-400" : "text-gray-600"
                                            }`}>
                                                {passion.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Digital Signature */}
                        <motion.div variants={itemVariants} className="text-center py-8">
                            <div className={`text-sm ${
                                isDarkMode ? "text-gray-500" : "text-gray-600"
                            } mb-4`}>
                                Crafted with Passion by
                            </div>
                            <div className="flex justify-center">
                                <img src={SIGNATURE} alt="Kevin Ogunlowo signature" className="w-28" />
                            </div>
                            <div className="text-lg font-medium text-blue-500 mt-2">
                                Ogunlowo Kevin
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN — Developer Journey Timeline */}
                    <motion.div
                        ref={timelineRef}
                        initial="hidden"
                        animate={timelineInView ? "visible" : "hidden"}
                        variants={timelineVariants}
                        className="relative"
                    >
                        <h3 className="text-2xl font-medium mb-8 text-center lg:text-left">
                            My Developer Journey
                        </h3>

                        {/* Vertical line running through the timeline */}
                        <div className={`absolute left-8 top-16 bottom-0 w-px ${
                            isDarkMode ? "bg-gray-700" : "bg-gray-300"
                        }`} />

                        <div className="space-y-8">
                            {/* Maps over JOURNEY_STEPS from data.js */}
                            {JOURNEY_STEPS.map((step, index) => (
                                // ✅ uses index combined with year to avoid duplicate key warnings
                                <motion.div
                                    key={`${step.year}-${index}`}
                                    variants={stepVariants}
                                    whileHover={{ x: 4 }}
                                    className="relative flex items-start space-x-6 group"
                                >
                                    {/* Colored icon circle — color comes from step.color in data.js */}
                                    <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <step.icon size={24} className="text-white" />
                                    </div>

                                    {/* Step content card */}
                                    <div className={`flex-grow p-6 rounded-xl border transition-all duration-300 ${
                                        isDarkMode
                                            ? "bg-gray-800/50 border-gray-700 group-hover:border-gray-600 group-hover:bg-gray-800/70"
                                            : "bg-white/80 border-gray-200 group-hover:border-gray-300 group-hover:bg-white"
                                    } backdrop-blur-sm`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="text-xl font-medium">{step.title}</h4>
                                            {/* Year badge */}
                                            <span className={`text-sm px-3 py-1 rounded-full ${
                                                isDarkMode
                                                    ? "bg-gray-700 text-gray-300"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}>
                                                {step.year}
                                            </span>
                                        </div>
                                        {/* Company name in blue */}
                                        <div className={`text-sm leading-relaxed ${
                                            isDarkMode ? "text-blue-400" : "text-blue-600"
                                        } mb-3`}>
                                            {step.company}
                                        </div>
                                        <p className={`text-sm leading-relaxed ${
                                            isDarkMode ? "text-gray-400" : "text-gray-600"
                                        }`}>
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Call To Action — scrolls to contact section on click */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mt-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col items-center space-y-6"
                    >
                        <p className={`text-lg ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}>
                            Ready to bring your ideas to life?
                        </p>
                        {/* ✅ onClick added to scroll to contact section */}
                        <motion.button
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-sm uppercase tracking-wider font-medium transition-all duration-300"
                        >
                            Let's Work Together
                        </motion.button>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutSection;