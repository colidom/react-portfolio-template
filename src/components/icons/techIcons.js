import React from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";

// ============================================
// ICONOS PERSONALIZADOS (Prioridad máxima)
// ============================================
// Para tecnologías sin icono específico o que necesitan uno personalizado
const customIcons = {
    // APIs y Protocolos
    "rest": <FaIcons.FaCloud className="size-5 text-blue-500" />,
    "rest api": <FaIcons.FaCloud className="size-5 text-blue-500" />,
    "restful": <FaIcons.FaCloud className="size-5 text-blue-500" />,
    "soap": <MdIcons.MdCloudQueue className="size-5 text-indigo-600" />,
    "soap api": <MdIcons.MdCloudQueue className="size-5 text-indigo-600" />,
    "api": <AiIcons.AiOutlineApi className="size-5 text-purple-500" />,
    
    // Arquitecturas
    "microservices": <BsIcons.BsBoxes className="size-5 text-teal-500" />,
    "microservicios": <BsIcons.BsBoxes className="size-5 text-teal-500" />,
    "monolith": <BsIcons.BsBox className="size-5 text-gray-600" />,
    "serverless": <AiIcons.AiOutlineCloudServer className="size-5 text-yellow-500" />,
    
    // Metodologías
    "agile": <MdIcons.MdSpeed className="size-5 text-green-500" />,
    "scrum": <IoIcons.IoPeople className="size-5 text-blue-500" />,
    "kanban": <BsIcons.BsKanban className="size-5 text-orange-500" />,
    
    // Testing
    "testing": <MdIcons.MdBugReport className="size-5 text-red-500" />,
    "unit testing": <MdIcons.MdCheckCircle className="size-5 text-green-500" />,
    "e2e": <MdIcons.MdRadar className="size-5 text-purple-500" />,
    
    // Servicios
    "emailjs": <MdIcons.MdEmail className="size-5 text-red-500" />,
    
    // Conceptos específicos
    "iot": <IoIcons.IoHardwareChip className="size-5 text-green-600" />,
    "blockchain": <FaIcons.FaCube className="size-5 text-yellow-600" />,
    "machine learning": <AiIcons.AiOutlineRobot className="size-5 text-purple-600" />,
    "ml": <AiIcons.AiOutlineRobot className="size-5 text-purple-600" />,
    "ai": <AiIcons.AiOutlineRobot className="size-5 text-indigo-600" />,
    "web3": <SiIcons.SiWeb3Dotjs className="size-5 text-orange-500" />,
    "innovación en ciencia": <GiIcons.GiChemicalDrop className="size-5 text-green-500" />,
    "formación en ti": <FaIcons.FaGraduationCap className="size-5 text-blue-600" />,
};

// ============================================
// ALIASES para nombres especiales
// ============================================
const techAliases = {
    // Lenguajes
    "javascript": "sijavascript",
    "typescript": "sitypescript",
    "python": "sipython",
    "java": "fajava",
    "c++": "sicplusplus",
    "c": "sic",
    "go": "sigo",
    "golang": "sigo",
    "rust": "sirust",
    "php": "siphp",
    "kotlin": "sikotlin",
    "swift": "siswift",
    "ruby": "siruby",
    "r": "sir",
    
    // Frontend
    "react": "fareact",
    "react native": "fareact",
    "react toastify": "fareact",
    "react router": "sireactrouter",
    "react router dom": "sireactrouter",
    "redux": "siredux",
    "angular": "faangular",
    "vue": "favuejs",
    "vuejs": "favuejs",
    "vue.js": "favuejs",
    "html": "fahtml5",
    "html5": "fahtml5",
    "css": "facss3alt",
    "css3": "facss3alt",
    "tailwind": "sitailwindcss",
    "tailwind css": "sitailwindcss",
    "bootstrap": "fabootstrap",
    "sass": "fasass",
    "scss": "fasass",
    "jquery": "sijquery",
    "vite": "sivite",
    "webpack": "siwebpack",
    "nextjs": "sinextdotjs",
    "next.js": "sinextdotjs",
    "nuxt": "sinuxtdotjs",
    "nuxt.js": "sinuxtdotjs",
    "svelte": "sisvelte",
    "chakra ui": "sichakraui",
    "ant design": "siantdesign",
    
    // Backend
    "nodejs": "fanodejs",
    "node": "fanodejs",
    "node.js": "fanodejs",
    "express": "siexpress",
    "expressjs": "siexpress",
    "nestjs": "sinestjs",
    "django": "sidjango",
    "flask": "siflask",
    "laravel": "falaravel",
    "spring": "sispring",
    "spring boot": "bilogospringboot",
    "springboot": "bilogospringboot",
    "fastapi": "sifastapi",
    "ruby on rails": "sirubyonrails",
    "rails": "sirubyonrails",
    
    // Bases de datos
    "mysql": "simysql",
    "postgresql": "sipostgresql",
    "postgres": "sipostgresql",
    "mongodb": "simongodb",
    "mongo": "simongodb",
    "redis": "siredis",
    "firebase": "sifirebase",
    "supabase": "sisupabase",
    "oracle": "sioracle",
    "sqlite": "sisqlite",
    "mariadb": "simariadb",
    
    // Cloud & DevOps
    "aws": "faaws",
    "amazon web services": "faaws",
    "docker": "fadocker",
    "kubernetes": "sikubernetes",
    "k8s": "sikubernetes",
    "vercel": "sivercel",
    "netlify": "sinetlify",
    "heroku": "siheroku",
    "render": "sirender",
    "gcp": "sigooglecloud",
    "google cloud": "sigooglecloud",
    
    // Tools & Version Control
    "git": "sigit",
    "github": "fagithub",
    "github actions": "sigithubactions",
    "gitlab": "sigitlab",
    "npm": "sinpm",
    "yarn": "siyarn",
    "pnpm": "sipnpm",
    "postman": "sipostman",
    "jira": "sijira",
    "confluence": "siconfluence",
    "trello": "sitrello",
    "jenkins": "sijenkins",
    
    // Otros
    "graphql": "sigraphql",
    "framer motion": "siframer",
    "framer": "siframer",
    "socket.io": "sisocketdotio",
    "socketio": "sisocketdotio",
    "wordpress": "fawordpress",
    "woocommerce": "siwoocommerce",
    "prestashop": "siprestashop",
};

// Normalizar nombre de tecnología
const normalizeTechName = (name) => {
    return name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '')  // Quitar espacios
        .replace(/[.-]/g, ''); // Quitar puntos y guiones
};

// Buscar icono dinámicamente
const findIcon = (techName) => {
    const normalized = normalizeTechName(techName);
    const original = techName.toLowerCase().trim();
    
    // 1. PRIORIDAD MÁXIMA: Buscar en iconos personalizados
    if (customIcons[original]) {
        return customIcons[original];
    }
    
    // 2. Buscar en aliases
    if (techAliases[original]) {
        const aliasKey = techAliases[original];
        const library = aliasKey.substring(0, 2);
        const iconName = aliasKey.substring(2);
        
        const IconComponent = getIconFromLibrary(library, iconName);
        if (IconComponent) {
            return <IconComponent />;
        }
    }
    
    // 3. Buscar automáticamente en todas las librerías
    let IconComponent = getIconFromLibrary('si', normalized);
    if (IconComponent) return <IconComponent />;
    
    IconComponent = getIconFromLibrary('fa', normalized);
    if (IconComponent) return <IconComponent />;
    
    IconComponent = getIconFromLibrary('bi', normalized);
    if (IconComponent) return <IconComponent />;
    
    IconComponent = getIconFromLibrary('io', normalized);
    if (IconComponent) return <IconComponent />;
    
    IconComponent = getIconFromLibrary('md', normalized);
    if (IconComponent) return <IconComponent />;
    
    return null;
};

// Obtener icono de una librería específica
const getIconFromLibrary = (library, iconName) => {
    const libraries = {
        'fa': FaIcons,
        'si': SiIcons,
        'bi': BiIcons,
        'io': IoIcons,
        'bs': BsIcons,
        'md': MdIcons,
        'ai': AiIcons,
        'gi': GiIcons,
    };
    
    const lib = libraries[library];
    if (!lib) return null;
    
    const capitalizedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const prefix = library.charAt(0).toUpperCase() + library.charAt(1);
    const fullIconName = prefix + capitalizedName;
    
    return lib[fullIconName] || null;
};

// Mapa COMPLETO de colores por tecnología
const techColors = {
    // Lenguajes
    "javascript": "text-yellow-400",
    "typescript": "text-blue-500",
    "python": "text-blue-500",
    "java": "text-red-700",
    "php": "text-indigo-500",
    "go": "text-cyan-400",
    "golang": "text-cyan-400",
    "rust": "text-orange-600",
    "c": "text-blue-600",
    "c++": "text-blue-700",
    "kotlin": "text-purple-600",
    "swift": "text-orange-500",
    "ruby": "text-red-600",
    "r": "text-blue-400",
    
    // Frontend
    "react": "text-cyan-400",
    "react native": "text-cyan-400",
    "react toastify": "text-cyan-400",
    "react router": "text-red-500",
    "react router dom": "text-red-500",
    "redux": "text-purple-600",
    "angular": "text-red-600",
    "vue": "text-green-500",
    "vuejs": "text-green-500",
    "vue.js": "text-green-500",
    "html": "text-orange-600",
    "html5": "text-orange-600",
    "css": "text-blue-500",
    "css3": "text-blue-500",
    "tailwind": "text-cyan-400",
    "tailwind css": "text-cyan-400",
    "bootstrap": "text-purple-600",
    "sass": "text-pink-500",
    "scss": "text-pink-500",
    "jquery": "text-blue-600",
    "vite": "text-purple-500",
    "webpack": "text-blue-500",
    "nextjs": "text-gray-900 dark:text-white",
    "next.js": "text-gray-900 dark:text-white",
    "nuxt": "text-green-500",
    "nuxt.js": "text-green-500",
    "svelte": "text-orange-500",
    "chakra ui": "text-teal-400",
    "ant design": "text-blue-500",
    
    // Backend
    "nodejs": "text-green-600",
    "node": "text-green-600",
    "node.js": "text-green-600",
    "express": "text-gray-700 dark:text-gray-300",
    "expressjs": "text-gray-700 dark:text-gray-300",
    "nestjs": "text-red-600",
    "django": "text-green-700",
    "flask": "text-gray-700 dark:text-gray-300",
    "laravel": "text-red-500",
    "spring": "text-green-600",
    "spring boot": "text-green-600",
    "springboot": "text-green-600",
    "fastapi": "text-teal-500",
    "ruby on rails": "text-red-700",
    "rails": "text-red-700",
    
    // Bases de datos
    "mysql": "text-blue-600",
    "postgresql": "text-blue-700",
    "postgres": "text-blue-700",
    "mongodb": "text-green-600",
    "mongo": "text-green-600",
    "redis": "text-red-600",
    "firebase": "text-yellow-500",
    "supabase": "text-green-500",
    "oracle": "text-red-600",
    "sqlite": "text-blue-500",
    "mariadb": "text-blue-700",
    
    // Cloud & DevOps
    "aws": "text-orange-500",
    "amazon web services": "text-orange-500",
    "docker": "text-blue-500",
    "kubernetes": "text-blue-600",
    "k8s": "text-blue-600",
    "vercel": "text-gray-900 dark:text-white",
    "netlify": "text-teal-500",
    "heroku": "text-purple-600",
    "render": "text-purple-500",
    "gcp": "text-blue-500",
    "google cloud": "text-blue-500",
    
    // Tools & Version Control
    "git": "text-orange-600",
    "github": "text-gray-900 dark:text-white",
    "github actions": "text-blue-600",
    "gitlab": "text-orange-600",
    "npm": "text-red-600",
    "yarn": "text-blue-500",
    "pnpm": "text-yellow-500",
    "postman": "text-orange-500",
    "jira": "text-blue-600",
    "confluence": "text-blue-600",
    "trello": "text-blue-500",
    "jenkins": "text-red-600",
    
    // APIs y Protocolos (ya tienen color en customIcons)
    "rest": "text-blue-500",
    "rest api": "text-blue-500",
    "soap": "text-indigo-600",
    "api": "text-purple-500",
    
    // Otros
    "graphql": "text-pink-600",
    "framer motion": "text-pink-500",
    "framer": "text-pink-500",
    "emailjs": "text-red-500",
    "socket.io": "text-gray-900 dark:text-white",
    "socketio": "text-gray-900 dark:text-white",
    "wordpress": "text-blue-600",
    "woocommerce": "text-purple-600",
    "prestashop": "text-pink-600",
    "innovación en ciencia": "text-green-500",
    "formación en ti": "text-blue-600",
    
    // Default
    "default": "text-blue-500",
};

// Obtener color de una tecnología
const getTechColor = (techName) => {
    const normalized = techName.toLowerCase().trim();
    return techColors[normalized] || techColors.default;
};

// Exportar función principal
export const getTechIcon = (techName) => {
    if (!techName) {
        return <BsIcons.BsQuestionLg className="size-5 text-gray-400" />;
    }
    
    const icon = findIcon(techName);
    
    if (icon) {
        // Si el icono ya viene con estilos (customIcons), devolverlo directamente
        if (React.isValidElement(icon) && icon.props.className) {
            return icon;
        }
        
        // Si es un componente sin estilos, aplicar color
        const color = getTechColor(techName);
        return (
            <IconContext.Provider value={{ className: `size-5 ${color}` }}>
                {icon}
            </IconContext.Provider>
        );
    }
    
    // Fallback: icono de interrogación
    return <BsIcons.BsQuestionLg className="size-5 text-gray-400" />;
};

// Exportar también el objeto techIcons por compatibilidad
export const techIcons = {};
