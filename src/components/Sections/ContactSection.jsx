// ContactSection.jsx
// Displays a contact form connected to EmailJS, contact info,
// social links, availability status, and a call CTA.

import { useState, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { CONTACT_INFO, SOCIAL_LINKS } from "../../utils/data";
import { containerVariants, itemVariants } from "../../utils/helper";
import TextInput from "../Input/TextInput"; // ✅ fixed double 't' typo
import SuccessModel from "../SuccessModel"; // ✅ fixed 'Model' -> 'Modal'
import emailjs from "@emailjs/browser";

const ContactSection = () => {
    const { isDarkMode } = useTheme();

    // Form state — tracks name, email and message fields
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    // Controls success modal visibility after form submission
    const [showSuccess, setShowSuccess] = useState(false);

    // Controls button loading state while EmailJS request is in flight
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Ref for scroll-based animations
    const sectionRef = useRef(null);

    // Triggers animations when section enters viewport
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    // Tracks scroll progress for parallax background effect
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    // Maps scroll progress to vertical offset for background blobs
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    // Updates a single field in formData by key
    // e.g. handleInputChange("name", "Kevin")
    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    };

    // Handles form submission via EmailJS
    // Sends form data to kevinogunlowo273@gmail.com
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.send(
                "service_jnaj8ii",    // EmailJS service ID
                "template_dyxj9ps",   // EmailJS template ID
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                "0AvuRLFaPt_XsHC73"  // EmailJS public key
            );

            setIsSubmitting(false);
            setShowSuccess(true);
            // Reset form fields after successful submission
            setFormData({ name: "", email: "", message: "" });
            // Auto-hide success modal after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000);

        } catch (error) {
            console.error("Failed to send:", error);
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className={`py-24 px-6 ${
                isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            } relative overflow-hidden`}
        >
            {/* Parallax background blobs */}
            <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
                <div className={`absolute top-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 ${
                    isDarkMode ? "bg-blue-500" : "bg-blue-400"
                }`} />
                <div className={`absolute bottom-40 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 ${
                    isDarkMode ? "bg-purple-500" : "bg-purple-400"
                }`} />
            </motion.div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Section Header */}
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
                        Let's Connect
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-5xl font-light mb-6"
                    >
                        Get In
                        <span className="text-blue-500 font-medium"> Touch</span>
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className={`text-xl max-w-2xl mx-auto ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                    >
                        Ready to start your next project? Let's discuss how we can bring
                        your ideas to life.
                    </motion.p>
                </motion.div>

                {/* Two column grid — form left, contact info right */}
                <div className="grid lg:grid-cols-2 gap-16 items-start">

                    {/* LEFT COLUMN — Contact Form */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                    >
                        <motion.div
                            variants={itemVariants}
                            className={`p-8 rounded-2xl border ${
                                isDarkMode
                                    ? "bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                                    : "bg-gray-50/80 border-gray-200 backdrop-blur-sm"
                            }`}
                        >
                            <h3 className="text-2xl font-medium mb-8">Send me a message</h3>
                            <div className="space-y-6">

                                {/* Name and Email side by side on medium+ screens */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <TextInput
                                        isDarkMode={isDarkMode}
                                        value={formData.name}
                                        handleInputChange={(text) =>
                                            handleInputChange("name", text)
                                        }
                                        label="Your Name"
                                    />
                                    <TextInput
                                        isDarkMode={isDarkMode}
                                        label="Email Address"
                                        value={formData.email}
                                        handleInputChange={(text) =>
                                            handleInputChange("email", text)
                                        }
                                    />
                                </div>

                                {/* Message textarea */}
                                <TextInput
                                    isDarkMode={isDarkMode}
                                    label="Your Message"
                                    value={formData.message}
                                    textarea
                                    handleInputChange={(text) =>
                                        handleInputChange("message", text)
                                    }
                                />

                                {/* Submit button — shows spinner while sending */}
                                <motion.button
                                    disabled={isSubmitting}
                                    whileHover={{ y: -2, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white py-4 rounded-xl text-sm uppercase tracking-wider font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting ? (
                                        <>
                                            {/* Spinning loader animation */}
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN — Contact Info, Social Links, Availability */}
                    <motion.div
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        variants={containerVariants}
                    >
                        {/* Contact Info — maps over CONTACT_INFO from data.js */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl font-medium mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                {CONTACT_INFO.map((info) => (
                                    // ✅ removed unused index parameter
                                    <motion.div
                                        key={info.label}
                                        variants={itemVariants}
                                        whileHover={{ x: 4 }}
                                        className={`flex items-center space-x-4 p-4 rounded-xl ${
                                            isDarkMode
                                                ? "bg-gray-800/30 hover:bg-gray-800/50"
                                                : "bg-gray-50/50 hover:bg-gray-100/50"
                                        } transition-all duration-300`}
                                    >
                                        {/* Icon */}
                                        <div className={`p-3 rounded-lg ${
                                            isDarkMode ? "bg-gray-700" : "bg-white"
                                        }`}>
                                            <info.icon size={20} className="text-blue-500" />
                                        </div>
                                        <div>
                                            <div className={`text-sm ${
                                                isDarkMode ? "text-gray-500" : "text-gray-600"
                                            }`}>
                                                {info.label}
                                            </div>
                                            <div className="font-medium">{info.value}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Social Links — maps over SOCIAL_LINKS from data.js */}
                        <motion.div variants={itemVariants} className="mt-8">
                            <h3 className="text-xl font-medium mb-6">Follow Me</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {SOCIAL_LINKS.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        // ✅ fixed hover:border-gray-60 -> hover:border-gray-600
                                        className={`flex items-center space-x-3 p-4 rounded-xl border transition-all duration-300 ${
                                            isDarkMode
                                                ? "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                                                : "bg-white/80 border-gray-200 hover:border-gray-300"
                                        } ${social.bgColor} ${social.color}`}
                                    >
                                        <social.icon size={20} />
                                        <span className="font-medium">{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>

                        {/* Availability Status Badge */}
                        <motion.div
                            variants={itemVariants}
                            className={`p-6 rounded-xl border mt-6 ${
                                isDarkMode
                                    ? "bg-green-500/10 border-green-500/20"
                                    : "bg-green-50 border-green-200"
                            }`}
                        >
                            <div className="flex items-center space-x-3 mb-2">
                                {/* Pulsing green dot */}
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                <span className="font-medium text-green-500">
                                    Available for work
                                </span>
                            </div>
                            <p className={`text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}>
                                {/* ✅ fixed typo 'opportunites' -> 'opportunities' */}
                                I'm currently available for freelance projects and full-time opportunities
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom CTA — phone call link */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="text-center mt-20"
                >
                    <motion.div
                        variants={itemVariants}
                        className={`max-w-2xl mx-auto p-8 rounded-2xl border ${
                            isDarkMode
                                ? "bg-gray-800/30 border-gray-700"
                                : "bg-gray-50/50 border-gray-200"
                        }`}
                    >
                        <h3 className="text-xl font-medium mb-4">Prefer a quick call?</h3>
                        <p className={`${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                        } mb-6`}>
                            Sometimes a conversation is worth a thousand messages. Feel free
                            to schedule a call to discuss your project.
                        </p>

                        {/* motion.div wraps plain <a> to avoid Framer Motion
                            interfering with native tel: link behavior */}
                        <motion.div
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-block"
                        >
                            <a
                                href="tel:+14377721247"
                                className={`px-6 py-3 rounded-full border font-medium transition-all duration-300 inline-block ${
                                    isDarkMode
                                        ? "border-gray-600 hover:border-blue-500 hover:text-blue-400"
                                        : "border-gray-300 hover:border-blue-500 hover:text-blue-600"
                                }`}
                            >
                                Schedule a Call
                            </a>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Success Modal — appears after form is submitted successfully */}
            <SuccessModel
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
                isDarkMode={isDarkMode}
            />
        </section>
    );
};

export default ContactSection;