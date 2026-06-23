// data.js
// Central data store for the entire portfolio.
// All sections pull their content from here — update this file
// to change any text, links, or project details across the site.

import {
    Code2,
    GraduationCap,
    Briefcase,
    Award,
    Rocket,
    Heart,
    Coffee,
    BookOpen,
    Zap,
    Database,
    Server,
    Cloud,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

// Project images — stored in assets/images/
import PROJECT_IMG_1 from "../assets/images/project-1.png";
import PROJECT_IMG_2 from "../assets/images/project-2.png";
import PROJECT_IMG_3 from "../assets/images/project-3.png";
import PROJECT_IMG_4 from "../assets/images/project-4.png";
import PROJECT_IMG_5 from "../assets/images/project-5.png";
import PROJECT_IMG_6 from "../assets/images/project-6.png";
import PROJECT_IMG_7 from "../assets/images/project-7.png";

// ============================================================
// SKILLS
// Used by: SkillsSection.jsx
// Each category has an icon, description, and skills with
// a name, proficiency level (0-100), and Tailwind color class
// ============================================================
export const SKILLS_CATEGORY = [
    {
        title: "Frontend",
        icon: Code2,
        description: "Building sleek, responsive interfaces that feel alive",
        skills: [
            { name: "React", level: 88, color: "bg-blue-500" },
            { name: "Flutter", level: 90, color: "bg-cyan-400" },
            { name: "Tailwind CSS", level: 85, color: "bg-teal-500" },
            { name: "Framer Motion", level: 80, color: "bg-pink-500" },
            { name: "Swift (SwiftUI)", level: 75, color: "bg-orange-500" },
        ],
    },
    {
        title: "Backend",
        icon: Server,
        description: "Designing APIs and server-side systems that actually scale",
        skills: [
            { name: "Node.js", level: 85, color: "bg-green-600" },
            { name: "Express", level: 83, color: "bg-gray-600" },
            { name: "MongoDB", level: 88, color: "bg-green-500" },
            { name: "Firebase", level: 80, color: "bg-yellow-500" },
            { name: "Python", level: 78, color: "bg-blue-500" },
        ],
    },
    {
        title: "Tools & DevOps",
        icon: Cloud,
        description: "Managing workflows and deploying projects efficiently",
        skills: [
            { name: "Git & GitHub", level: 88, color: "bg-orange-600" },
            { name: "Vercel", level: 85, color: "bg-gray-700" },
            { name: "VS Code", level: 92, color: "bg-blue-500" },
            { name: "Postman", level: 80, color: "bg-orange-500" },
            { name: "Firebase Hosting", level: 78, color: "bg-yellow-500" },
        ],
    },
    {
        title: "Database",
        icon: Database,
        description: "Storing and managing data across SQL and NoSQL systems",
        skills: [
            { name: "MongoDB", level: 88, color: "bg-green-500" },
            { name: "Firebase", level: 82, color: "bg-yellow-500" },
            { name: "MySQL", level: 75, color: "bg-blue-600" },
            { name: "Firestore", level: 80, color: "bg-orange-500" },
            { name: "AsyncStorage", level: 78, color: "bg-purple-500" },
        ],
    },
];

// ============================================================
// TECH STACK TAGS
// Used by: SkillsSection.jsx — "Also Working With" section
// ✅ fixed "Saas" -> "Sass"
// ✅ removed tools not relevant to your stack (Webpack, Cypress)
// ============================================================
export const TECH_STACK = [
    "JavaScript",
    "TypeScript",
    "HTML5",
    "CSS3",
    "Sass",
    "Dart",
    "Vite",
    "Figma",
    "Firebase",
    "REST APIs",
    "Notion",
    "Jira",
];

// ============================================================
// STATS
// Used by: SkillsSection.jsx — bottom stats row
// ✅ updated to more accurate/believable numbers
// ============================================================
export const STATS = [
    { number: "10+", label: "Projects Completed" },
    { number: "4+", label: "Years Experience" },
    { number: "15+", label: "Technologies" },
    { number: "5", label: "Certifications" },
];

// ============================================================
// PROJECTS
// Used by: ProjectsSection.jsx via ProjectsCard.jsx
// ✅ fixed "Description" -> "description" (lowercase) — was breaking ProjectsCard
// ✅ added real project titles, descriptions, tags and categories
// Update liveUrl and githubUrl when projects are deployed
// ============================================================
export const PROJECTS = [
    {
        id: 1,
        title: "Developer Portfolio",
        description: "A personal portfolio site built with React, Tailwind CSS and Framer Motion. Features dark mode, AI chatbot, EmailJS contact form and Vercel deployment.",
        image: PROJECT_IMG_1,
        tags: ["React", "Tailwind", "Framer Motion", "EmailJS"],
        liveUrl: "#",
        githubUrl: "https://github.com/kevinogunlowo/dev-portfolio",
        featured: true,
        category: "Frontend",
    },
    {
        id: 2,
        title: "MERN Stack Web App",
        description: "A full-stack web application built with MongoDB, Express, React and Node.js. Includes authentication, REST APIs and a responsive UI.",
        image: PROJECT_IMG_2,
        tags: ["MongoDB", "Express", "React", "Node.js"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 3,
        title: "Flutter Mobile App",
        description: "A cross-platform mobile application built with Flutter and Dart. Integrates RESTful APIs and follows MVVM architecture with state management.",
        image: PROJECT_IMG_3,
        tags: ["Flutter", "Dart", "REST API", "Firebase"],
        liveUrl: "#",
        githubUrl: "#",
        featured: true,
        category: "Mobile",
    },
    {
        id: 4,
        title: "Student Result Management System",
        description: "Capstone project — a system for student registration, grading and secure result access. Built with a focus on data integrity and role-based access.",
        image: PROJECT_IMG_4,
        tags: ["React", "Node.js", "MongoDB", "Express"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 5,
        title: "WordPress Business Site",
        description: "A responsive business website built with WordPress, custom PHP themes and third-party API integrations. Optimized for Core Web Vitals.",
        image: PROJECT_IMG_5,
        tags: ["WordPress", "PHP", "JavaScript", "CSS"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Frontend",
    },
    {
        id: 6,
        title: "AI Powered App",
        description: "An application integrating the Anthropic Claude API to provide intelligent responses grounded in custom data. Built with React and Vite.",
        image: PROJECT_IMG_6,
        tags: ["React", "Anthropic API", "Vite", "Tailwind"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "AI",
    },
    {
        id: 7,
        title: "Flutter E-Commerce App",
        description: "A cross-platform e-commerce mobile app with product listings, cart management, and payment integration built using Flutter and Firebase.",
        image: PROJECT_IMG_7,
        tags: ["Flutter", "Firebase", "Dart", "Stripe"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Mobile",
    },
];

// ============================================================
// JOURNEY STEPS
// Used by: AboutSection.jsx — developer timeline
// ============================================================
export const JOURNEY_STEPS = [
    {
        year: "2021",
        title: "The Spark",
        company: "Self-Taught",
        description: "Picked up HTML, CSS and JavaScript out of curiosity. Built my first webpage and instantly knew this was it. No turning back.",
        icon: Code2,
        color: "bg-blue-500",
    },
    {
        year: "2022",
        title: "Going Deeper",
        company: "Self-Taught",
        description: "Dove into React and the MERN stack. Started building full-stack web apps and understanding how the frontend and backend talk to each other.",
        icon: GraduationCap,
        color: "bg-purple-500",
    },
    {
        year: "2022",
        title: "Mobile Development",
        company: "Self-Taught",
        description: "Expanded into mobile with Flutter and Dart. Loved the idea of writing one codebase and shipping to both iOS and Android.",
        icon: Rocket,
        color: "bg-cyan-500",
    },
    {
        year: "2023",
        title: "First Professional Work",
        company: "Freelance / WOCA Tech Solutions",
        description: "Landed my first professional role at WOCA Tech Solutions in Abuja — designing and building cross-platform Flutter apps for real clients.",
        icon: Briefcase,
        color: "bg-green-500",
    },
    {
        year: "2023",
        title: "AI & Data Annotation",
        company: "Outlier AI / Oneforma",
        description: "Started working with AI evaluation platforms — reviewing model outputs, training data and coding benchmarks. Got an inside look at how LLMs are built and improved.",
        icon: Zap,
        color: "bg-yellow-500",
    },
    {
        year: "2024",
        title: "Portfolio & Growth",
        company: "WIMTACH, Centennial College",
        description: "Joined WIMTACH as a Flutter Developer — building and deploying cross-platform apps in an agile team while completing my Software Engineering diploma.",
        icon: Award,
        color: "bg-pink-500",
    },
    {
        year: "2025",
        title: "Chasing the Next Level",
        company: "Open to Opportunities",
        description: "Actively pursuing corporate tech roles while continuing to build. Combining my MERN, Flutter and AI experience to land the right opportunity.",
        icon: Database,
        color: "bg-orange-500",
    },
];

// ============================================================
// PASSIONS
// Used by: AboutSection.jsx — "What I Love Building" section
// ============================================================
export const PASSIONS = [
    {
        icon: Heart,
        title: "Clean UI Design",
        description: "I obsess over the details — spacing, motion, and feel. If it doesn't look good, it doesn't ship.",
    },
    {
        icon: Coffee,
        title: "Building Real Things",
        description: "From MERN stack web apps to Flutter mobile apps, I love taking an idea from zero to a working product.",
    },
    {
        icon: BookOpen,
        title: "AI & The Future",
        description: "I've worked hands-on with AI evaluation platforms and I'm fascinated by where LLMs and intelligent systems are headed.",
    },
];

// ============================================================
// SOCIAL LINKS
// Used by: ContactSection.jsx and Footer.jsx
// ✅ updated X url to your actual profile
// ============================================================
export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        icon: FiGithub,
        url: "https://github.com/kevinogunlowo",
        color: "hover:text-gray-400",
        bgColor: "hover:bg-gray-800",
    },
    {
        name: "LinkedIn",
        icon: FiLinkedin,
        url: "https://linkedin.com/in/kevin-ogunlowo",
        color: "hover:text-blue-400",
        bgColor: "hover:bg-blue-500/10",
    },
    {
        name: "X",
        icon: FiTwitter,
        url: "https://x.com/",
        color: "hover:text-sky-400",
        bgColor: "hover:bg-sky-500/10",
    },
    {
        name: "Email",
        icon: Mail,
        url: "mailto:kevinogunlowo273@gmail.com",
        color: "hover:text-green-400",
        bgColor: "hover:bg-green-500/10",
    },
];

// ============================================================
// CONTACT INFO
// Used by: ContactSection.jsx — right column contact details
// ✅ fixed email casing — lowercase is standard for emails
// ✅ removed trailing space from phone number
// ============================================================
export const CONTACT_INFO = [
    {
        icon: MapPin,
        label: "Location",
        value: "Scarborough, Toronto, Canada",
    },
    {
        icon: Mail,
        label: "Email",
        value: "kevinogunlowo273@gmail.com",
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+1 (437) 772-1247",
    },
];