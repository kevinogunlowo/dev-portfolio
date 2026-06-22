import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const KEVIN_CONTEXT = `
You are Kevin Ogunlowo's portfolio assistant. You only answer questions based on the following information about Kevin.
If a question cannot be answered from this information, respond with:
"That's a great question! For more details, I'd recommend reaching out to Kevin directly via the contact form."

Never make up or assume any information not provided below.

ABOUT KEVIN:
- Full name: Ogunlowo Kevin
- Based in Toronto, Ontario, Canada
- Software Engineer specializing in Mobile & Frontend Development
- Email: kevinogunlowo273@gmail.com
- Phone: +1 (437)-772-1247

SKILLS:
- Languages: Dart, Java, Kotlin, Swift (basic), JavaScript, TypeScript, Python, SQL
- Frameworks: Flutter, React, Bootstrap, WordPress, Angular
- Tools: Android Studio, VS Code, Xcode, Firebase, AWS, Azure, Git/GitHub, MongoDB, SQLite, Postman, Figma
- Core: OOP, API Integration, Cross-Platform Deployment, State Management, Agile, TDD

EXPERIENCE:
1. Flutter Developer at WIMTACH, Centennial College — Toronto, ON (January 2025 – August 2025)
   - Built cross-platform mobile apps using Flutter and Dart
   - Collaborated in a 4-person agile team integrating 10+ RESTful APIs
   - Improved app performance by 30% and reduced usability issues by 35%

2. Software Engineer (Flutter Frontend) at WOCA Tech Solutions — Abuja, Nigeria (June 2023 – December 2023)
   - Designed and developed cross-platform mobile apps using Flutter
   - Integrated third-party RESTful APIs for backend communication

3. Front-End Web Developer at Blue Inc Services — Abuja, Nigeria (March 2018 – December 2018)
   - Built custom WordPress themes and plugins
   - Built responsive mobile-first websites

EDUCATION:
- Advanced Diploma in Software Engineering Technology — Centennial College, Toronto (April 2024 – December 2025)
- BSc in Computer and Mathematical Sciences — Crawford University, Nigeria (August 2016 – November 2020)

CERTIFICATIONS:
- Microsoft Certified: AZ-900, AI-900, DP-900, SC-900, PL-900
- Google Africa Developer Scholarship – Android Development (Andela)
- Aptech Java Programming 2
- WIMTACH / Blue Salt Hackathon – Certificate of Participation

ACHIEVEMENTS:
- Improved cross-platform app responsiveness by 30% at WIMTACH
- Developed a student result management system as capstone project
- Recognized by Loblaws management for display quality and customer service
`;

const ChatBubble = () => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! 👋 I'm Kevin's AI assistant. Ask me anything about his skills, experience or projects!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
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
          system: KEVIN_CONTEXT,
          messages: [
            ...messages.filter((m) => m.role !== "assistant" || messages.indexOf(m) !== 0),
            userMessage,
          ],
        }),
      });

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.content[0].text,
      };
      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again or use the contact form.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
    console.log("KEY EXISTS:", !!import.meta.env.VITE_ANTHROPIC_API_KEY);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg flex items-center justify-center transition-colors duration-300"
      >
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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={`fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-2xl border shadow-2xl overflow-hidden ${isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
              }`}
          >
            {/* Header */}
            <div className="bg-blue-500 p-4 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                KO
              </div>
              <div>
                <p className="text-white font-medium text-sm">Kevin's Assistant</p>
                <p className="text-blue-100 text-xs">Ask me anything about Kevin</p>
              </div>
              <div className="ml-auto flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-blue-100 text-xs">Online</span>
              </div>
            </div>

            {/* Messages Area */}
            <div className={`h-72 p-4 overflow-y-auto flex flex-col space-y-3 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"
              }`}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      KO
                    </div>
                  )}
                  <div
                    className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${msg.role === "user"
                        ? "bg-blue-500 text-white rounded-tr-none"
                        : isDarkMode
                          ? "bg-gray-800 text-gray-200 rounded-tl-none"
                          : "bg-white text-gray-800 rounded-tl-none shadow-sm"
                      }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start space-x-2">
                  <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    KO
                  </div>
                  <div className={`px-4 py-3 rounded-2xl rounded-tl-none ${isDarkMode ? "bg-gray-800" : "bg-white shadow-sm"
                    }`}>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={`p-3 border-t flex items-center space-x-2 ${isDarkMode
                ? "bg-gray-900 border-gray-700"
                : "bg-white border-gray-200"
              }`}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me something..."
                className={`flex-1 px-4 py-2 rounded-full text-sm outline-none border transition-all duration-300 ${isDarkMode
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500"
                    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500"
                  }`}
              />
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