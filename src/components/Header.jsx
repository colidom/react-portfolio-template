// src/components/Header.jsx
import { useEffect, useState, useRef } from "react";
import ThemeIcon from "./ThemeIcon";

const getSystemTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};

const applyTheme = (theme) => {
    const isDark = theme === "dark" || (theme === "system" && getSystemTheme() === "dark");
    if (isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
};

export default function Header() {
    const [theme, setTheme] = useState("system");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState(null);
    const isClickScrolling = useRef(false);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const initialTheme = storedTheme || "system";
        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = () => {
            if (theme === "system") {
                applyTheme("system");
            }
        };
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
    }, [theme]);

    useEffect(() => {
        const listener = (e) => {
            if (!e.target.closest("#theme-toggle-btn") && !e.target.closest("#theme-menu")) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", listener);
        return () => document.removeEventListener("click", listener);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // LÓGICA PARA DETECTAR LA SECCIÓN ACTIVA CON Intersection Observer API
    useEffect(() => {
        // APLICAR UN rootMargin DIFERENTE PARA MÓVILES
        const isMobile = window.innerWidth <= 768; // O el breakpoint que uses para móvil
        const margin = isMobile ? "-20% 0px -20% 0px" : "-40% 0px -40% 0px";

        const observer = new IntersectionObserver(
            (entries) => {
                if (isClickScrolling.current) return;

                let bestMatch = null;
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (!bestMatch) {
                            bestMatch = entry;
                        } else {
                            const bestMatchCenter = bestMatch.boundingClientRect.y + bestMatch.boundingClientRect.height / 2;
                            const entryCenter = entry.boundingClientRect.y + entry.boundingClientRect.height / 2;
                            const viewportCenter = window.innerHeight / 2;

                            if (Math.abs(entryCenter - viewportCenter) < Math.abs(bestMatchCenter - viewportCenter)) {
                                bestMatch = entry;
                            }
                        }
                    }
                });

                if (bestMatch) {
                    setActiveSection(bestMatch.target.id);
                }
            },
            {
                rootMargin: margin,
                threshold: 0.1,
            }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const handleChange = (newTheme) => {
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        applyTheme(newTheme);
        setMenuOpen(false);
    };

    const themeTranslations = {
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema",
    };

    const handleNavClick = (e, sectionId) => {
        e.preventDefault();
        isClickScrolling.current = true;
        setActiveSection(sectionId);
        document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });

        setTimeout(() => {
            isClickScrolling.current = false;
        }, 500);
    };

    return (
        <header
            className={`fixed top-0 z-10 w-full flex justify-center items-center transition-all duration-300
                ${isScrolled ? "backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md" : "bg-transparent"}`}
        >
            <nav className="flex items-center px-3 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200">
                <button
                    onClick={(e) => handleNavClick(e, "inicio")}
                    className={`px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500 ${
                        activeSection === "inicio" ? "text-blue-500 font-semibold" : ""
                    }`}
                    aria-label="Ir a la sección de Inicio"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                        <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                    </svg>
                </button>

                <button
                    onClick={(e) => handleNavClick(e, "experiencia")}
                    className={`px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500 ${
                        activeSection === "experiencia" ? "text-blue-500 font-semibold" : ""
                    }`}
                >
                    Experiencia
                </button>

                <button
                    onClick={(e) => handleNavClick(e, "proyectos")}
                    className={`px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500 ${
                        activeSection === "proyectos" ? "text-blue-500 font-semibold" : ""
                    }`}
                >
                    Proyectos
                </button>

                <button
                    onClick={(e) => handleNavClick(e, "sobre-mi")}
                    className={`px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500 ${
                        activeSection === "sobre-mi" ? "text-blue-500 font-semibold" : ""
                    }`}
                >
                    Sobre mí
                </button>

                <a href="mailto:colidom@outlook.com" className="px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500">
                    Contacto
                </a>

                <div className="relative ml-1 mr-1">
                    <button
                        id="theme-toggle-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="appearance-none flex items-center hover:scale-125 transition"
                        aria-label="Elige el tema"
                    >
                        <ThemeIcon selected={theme} />
                    </button>

                    {menuOpen && (
                        <div
                            id="theme-menu"
                            className="absolute top-8 right-0 text-sm p-1 min-w-[6rem] rounded-md border border-gray-100 bg-white/90 dark:bg-gray-900/90 dark:border-gray-500/20 shadow backdrop-blur-md"
                        >
                            <ul>
                                {["light", "dark", "system"].map((option) => (
                                    <li
                                        key={option}
                                        onClick={() => handleChange(option)}
                                        className={`px-2 py-1.5 cursor-pointer rounded-sm ${
                                            theme === option ? "bg-blue-500 text-white" : "hover:bg-neutral-400/40 dark:hover:bg-gray-500/50"
                                        }`}
                                    >
                                        {themeTranslations[option]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
