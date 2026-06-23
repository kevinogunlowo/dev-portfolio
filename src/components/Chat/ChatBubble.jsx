// ChatBubble.jsx
// Floating AI chat assistant grounded in Kevin's resume data.
// Uses Anthropic Claude API directly from the browser.
// Answers questions about Kevin's skills, experience and background.
// Redirects unknown questions to the contact form.

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

// System prompt sent with every API request
// Grounds the AI strictly in Kevin's resume data
// Prevents hallucination by explicitly forbidding made-up information
const KEVIN_CONTEXT = `
You are Kevin Ogunlowo's portfolio assistant. Answer questions conversationally and confidently — like a colleague who knows Kevin well. Keep answers short (2-4 sentences), natural and friendly. No bullet points or headers.

If you don't know something, say: "Great question — reach out to Kevin via the contact form, he'll give you a better answer!"
Never make up information not listed below.

Kevin is a Software Engineer based in Scarborough, Toronto, specializing in Mobile & Frontend Development.
Email: kevinogunlowo273@gmail.com | Phone: +1 (437)-772-1247

STACK: Flutter, Dart, React, TypeScript, JavaScript, Python, Node.js, Firebase, MongoDB, Git, Figma, AWS, Azure

EXPERIENCE:
- Flutter Developer, WIMTACH Centennial College, Toronto (Jan–Aug 2025): Built cross-platform apps, integrated 10+ REST APIs, improved performance by 30%
- Software Engineer, WOCA Tech Solutions, Nigeria (Jun–Dec 2023): Flutter mobile apps, REST API integration
- Frontend Developer, Blue Inc Services, Nigeria (2018): WordPress themes, responsive websites

EDUCATION:
- Software Engineering Technology Diploma — Centennial College, Toronto (2024–2025)
- BSc Computer & Mathematical Sciences — Crawford University, Nigeria (2016–2020)

CERTIFICATIONS: Microsoft AZ-900, AI-900, DP-900, SC-900, PL-900 | Google Africa Developer Scholarship
`;

const ChatBubble = () => {
    const { isDarkMode } = useTheme();

    // Controls chat window visibility
    const [isOpen, setIsOpen] = useState(false);

    // Stores full conversation history
    // Initialized with welcome message from assistant
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hi there! 👋 I'm Kevin's AI assistant. Ask me anything about his skills, experience or projects!",
        },
    ]);

    // Current value of the text input
    const [input, setInput] = useState("");

    // True while waiting for API response — disables input and shows typing dots
    const [isLoading, setIsLoading] = useState(false);

    // Ref for auto-scrolling to latest message
    const messagesEndRef = useRef(null);

    // Auto-scrolls to bottom whenever messages array updates
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        // Prevent empty messages or double submissions
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user", content: input };

        // Add user message to chat immediately for instant feedback
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Direct browser call to Anthropic API
            // anthropic-dangerous-direct-browser-access header is required
            // for browser-based API calls
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "anthropic-dangerous-direct-browser-access": "true",
                },
                body: JSON.stringify({
                    model: "claude-sonnet-4-6",
                    max_tokens: 500,
                    // System prompt sent with every request — grounds AI in Kevin's data
                    system: KEVIN_CONTEXT,
                    // Send full conversation history for context-aware responses
                    // Filters out the initial welcome message to avoid confusing the AI
                    messages: [
                        ...messages.filter(
                            (m) => m.role !== "assistant" || messages.indexOf(m) !== 0
                        ),
                        userMessage,
                    ],
                }),
            });

            const data = await response.json();

            // Extract text response from Anthropic's response format
            const assistantMessage = {
                role: "assistant",
                content: data.content[0].text,
            };
            setMessages((prev) => [...prev, assistantMessage]);

        } catch (error) {
            console.error("ChatBubble API error:", error);
            // Show friendly error message in chat on failure
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I'm having trouble connecting right now. Please try again or use the contact form.",
                },
            ]);
        } finally {
            // Always re-enable input after request completes or fails
            setIsLoading(false);
        }
    };

    // Allows sending message with Enter key (Shift+Enter for new line)
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Chat Bubble Button
                Animates in after 2s delay so it doesn't distract on page load */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-colors duration-300"
            >
                {/* Switches between MessageCircle and X with rotation animation */}
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={22} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MessageCircle size={22} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Chat Window — animates in/out with scale and fade */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl border shadow-2xl overflow-hidden ${
                            isDarkMode
                                ? "bg-gray-900 border-gray-700"
                                : "bg-white border-gray-200"
                        }`}
                    >
                        {/* Header — always blue regardless of theme */}
                        <div className="bg-blue-500 p-4 flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                                KO
                            </div>
                            <div>
                                <p className="text-white font-medium text-sm">Kevin's Assistant</p>
                                <p className="text-blue-100 text-xs">Ask me anything about Kevin</p>
                            </div>
                            {/* Online indicator */}
                            <div className="ml-auto flex items-center space-x-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-blue-100 text-xs">Online</span>
                            </div>
                        </div>

                        {/* Messages Area — scrollable */}
                        <div className={`h-72 p-4 overflow-y-auto flex flex-col space-y-3 ${
                            isDarkMode ? "bg-gray-900" : "bg-gray-50"
                        }`}>
                            {messages.map((msg, index) => (
                                // User messages on right, assistant on left
                                <div
                                    key={index}
                                    className={`flex items-start space-x-2 ${
                                        msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                                    }`}
                                >
                                    {/* KO avatar — only shown for assistant messages */}
                                    {msg.role === "assistant" && (
                                        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                            KO
                                        </div>
                                    )}
                                    <div className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${
                                        msg.role === "user"
                                            ? "bg-blue-500 text-white rounded-tr-none"
                                            : isDarkMode
                                            ? "bg-gray-800 text-gray-200 rounded-tl-none"
                                            : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                                    }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator — three bouncing dots while waiting for response */}
                            {isLoading && (
                                <div className="flex items-start space-x-2">
                                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                        KO
                                    </div>
                                    <div className={`px-4 py-3 rounded-2xl rounded-tl-none ${
                                        isDarkMode ? "bg-gray-800" : "bg-white shadow-sm"
                                    }`}>
                                        <div className="flex space-x-1">
                                            {/* Each dot has a staggered delay for wave effect */}
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Invisible div at bottom — scrolled into view on new messages */}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className={`p-3 border-t flex items-center space-x-2 ${
                            isDarkMode
                                ? "bg-gray-900 border-gray-700"
                                : "bg-white border-gray-200"
                        }`}>
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me something..."
                                className={`flex-1 px-4 py-2 rounded-full text-sm outline-none border transition-all duration-300 ${
                                    isDarkMode
                                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500"
                                }`}
                            />
                            {/* Send button — disabled while loading or input is empty */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={sendMessage}
                                disabled={isLoading || !input.trim()}
                                className="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 flex items-center justify-center text-white transition-colors duration-300"
                            >
                                <Send size={16} />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBubble;