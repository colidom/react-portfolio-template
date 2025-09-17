import React from "react";
import { MdHome } from "react-icons/md";
import ThemeIcon from "./ThemeIcon";
import { useTheme } from "../hooks/useTheme";
import { useScrollEffects } from "../hooks/useScrollEffects";

const navItems = [
    { id: "inicio", label: "Inicio", icon: MdHome, type: "internal" },
    { id: "experiencia", label: "Experiencia", type: "internal" },
    { id: "proyectos", label: "Proyectos", type: "internal" },
    { id: "sobre-mi", label: "Sobre mí", type: "internal" },
    { id: "contacto", label: "Contacto", type: "external", href: "mailto:colidom@outlook.com" },
];

export default function Header() {
    const { theme, menuOpen, setMenuOpen, handleChange, themeTranslations } = useTheme();
    const { isScrolled, activeSection, handleNavClick } = useScrollEffects();

    return (
        <header
            className={`fixed top-0 z-10 w-full flex justify-center items-center transition-all duration-300
                ${isScrolled ? "backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md" : "bg-transparent"}`}
        >
            <nav className="flex items-center px-3 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200">
                {navItems.map((item) => {
                    // Si es un enlace interno (para scroll al hacer clic)
                    if (item.type === "internal") {
                        const IconComponent = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={(e) => handleNavClick(e, item.id)}
                                className={`px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500 ${
                                    activeSection === item.id ? "text-blue-500 font-semibold" : ""
                                }`}
                                aria-label={`Ir a la sección de ${item.label}`}
                            >
                                {IconComponent ? <IconComponent className="size-5" /> : item.label}
                            </button>
                        );
                    }
                    // Si es un enlace externo (como el mailto)
                    else if (item.type === "external") {
                        return (
                            <a key={item.id} href={item.href} className="px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500">
                                {item.label}
                            </a>
                        );
                    }
                    return null;
                })}

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
