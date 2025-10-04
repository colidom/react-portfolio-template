// API Configuration
export const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000/api';

// Animation Variants
export const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: "easeOut"
        }
    }
};

export const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

export const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
};

// SEO Metadata
export const SEO_DEFAULTS = {
    title: "Portfolio - Carlos Oliva | Desarrollador Full Stack",
    description: "Portfolio profesional de Carlos Oliva, desarrollador full stack especializado en React, Django y tecnologías web modernas. Explora mis proyectos, experiencia y habilidades técnicas.",
    keywords: "carlos oliva, colidom, desarrollador full stack, react, django, javascript, python, portfolio, desarrollador web, programador",
    author: "Carlos Oliva",
    siteUrl: "https://colidom.vercel.app",
    image: "/og-image.jpg"
};

// Navigation Items
export const NAV_ITEMS = [
    { name: "Inicio", href: "#inicio" },
    { name: "Experiencia", href: "#experiencia" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Habilidades", href: "#habilidades" },
    { name: "Sobre mí", href: "#sobre-mi" },
    { name: "Contacto", href: "#contacto" }
];

// Social Links Icons Mapping
export const SOCIAL_ICONS = {
    linkedin: "FaLinkedin",
    github: "FaGithub",
    twitter: "FaTwitter",
    email: "FaEnvelope",
    cv: "FaDownload"
};

// Skill Categories
export const SKILL_CATEGORIES = {
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    DATABASE: "Base de Datos",
    TOOLS: "Herramientas",
    OTHER: "Otros"
};

// Colors
export const COLORS = {
    primary: "#3B82F6",
    secondary: "#10B981",
    accent: "#F59E0B",
    error: "#EF4444",
    success: "#10B981",
    warning: "#F59E0B"
};

// Breakpoints (matches Tailwind defaults)
export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
};
