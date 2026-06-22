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


import PROJECT_IMG_1 from "../assets/images/project-1.png";
import PROJECT_IMG_2 from "../assets/images/project-2.png";
import PROJECT_IMG_3 from "../assets/images/project-3.png";
import PROJECT_IMG_4 from "../assets/images/project-4.png";
import PROJECT_IMG_5 from "../assets/images/project-5.png";
import PROJECT_IMG_6 from "../assets/images/project-6.png";
import PROJECT_IMG_7 from "../assets/images/project-7.png";
import PROFILE_PIC from "../assets/images/Kev.jpg";

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


export const TECH_STACK = [
    "JavaScript",
    "HTML5",
    "CSS3",
    "Saas",
    "Webpack",
    "Vite",
    "Jest",
    "Cypress",
    "Figma",
    "Adobe XD",
    "Notion",
    "Slack",
];

export const STATS = [
    { number: "50+", label: "Projects Completed" },
    { number: "8+", label: "Years Experience" },
    { number: "20+", label: "Technologies" },
    { number: "100%", label: "Client Satisfaction" },
];


export const PROJECTS = [
    {
        id: 1,
        title: "E-Commerce Platform",
        Description: "A full-stack solution with advanced filtering, payment integration and real-time inventory management",
        image: PROJECT_IMG_1,
        tags: ["React", "Tailwind", "Framer Motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 2,
        title: "E-Commerce Platform",
        Description: "A full-stack solution with advanced filtering, payment integration and real-time inventory management",
        image: PROJECT_IMG_2,
        tags: ["React", "Tailwind", "Framer Motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 3,
        title: "E-Commerce Platform",
        Description: "A full-stack solution with advanced filtering, payment integration and real-time inventory management",
        image: PROJECT_IMG_3,
        tags: ["React", "Tailwind", "Framer Motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 4,
        title: "E-Commerce Platform",
        Description: "A full-stack solution with advanced filtering, payment integration and real-time inventory management",
        image: PROJECT_IMG_4,
        tags: ["React", "Tailwind", "Framer Motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 5,
        title: "E-Commerce Platform",
        Description: "A full-stack solution with advanced filtering, payment integration and real-time inventory management",
        image: PROJECT_IMG_5,
        tags: ["React", "Tailwind", "Framer Motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 6,
        title: "E-Commerce Platform",
        Description: "A full-stack solution with advanced filtering, payment integration and real-time inventory management",
        image: PROJECT_IMG_6,
        tags: ["React", "Tailwind", "Framer Motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },
    {
        id: 7,
        title: "E-Commerce Platform",
        Description: "A full-stack solution with advanced filtering, payment integration and real-time inventory management",
        image: PROJECT_IMG_7,
        tags: ["React", "Tailwind", "Framer Motion"],
        liveUrl: "#",
        githubUrl: "#",
        featured: false,
        category: "Full Stack",
    },


];

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
        company: "Freelance",
        description: "Landed my first freelance clients building web and mobile apps. Learned how to communicate with clients, meet deadlines and deliver real products.",
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
        company: "Personal Projects",
        description: "Built out a full developer portfolio using React, Tailwind and Framer Motion. Focused on clean UI, smooth animations and shipping projects I'm proud of.",
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

export const SOCIAL_LINKS = [
    {
        name: "Github",
        icon: FiGithub,
        url: "https://github.com/kevinogunlowo",
        color: "hover:text-gray-400",
        bgColor: "hover:bg-gray-800",
    },
    {
        name: "Linkedin",
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
        url: "kevinogunlowo273@gmail.com",
        color: "hover:text-green-400",
        bgColor: "hover:bg-green-500/10",
    },

];

export const CONTACT_INFO = [
    {
        icon: MapPin,
        label: "Location",
        value: "Toronto, Canada"
    },
    {
        icon: Mail,
        label: "Email",
        value: "KevinOgunlowo273@gmail.com"
    },
    {
        icon: Phone,
        label: "Phone",
        value: "+1 (437)-772-1247 "
    },
]