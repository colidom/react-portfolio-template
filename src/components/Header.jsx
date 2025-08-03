import { useEffect, useState } from "react";
import ThemeIcon from "./ThemeIcon"; // Importa el nuevo componente

// Función auxiliar para obtener el tema actual del sistema
const getSystemTheme = () => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    return "light";
};

// Función para aplicar el tema al documento
const applyTheme = (theme) => {
    const isDark = theme === "dark" || (theme === "system" && getSystemTheme() === "dark");
    if (isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
};

export default function Header() {
    const [theme, setTheme] = useState("system"); // Tema por defecto: sistema
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    // Estado para la sección activa
    const [activeSection, setActiveSection] = useState(null);

    // Detección inicial del tema y aplicación
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const initialTheme = storedTheme || "system";
        setTheme(initialTheme);
        applyTheme(initialTheme);
    }, []);

    // Manejo de la preferencia del sistema en tiempo real
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

    // Cerrar el menú si se hace clic fuera
    useEffect(() => {
        const listener = (e) => {
            if (!e.target.closest("#theme-toggle-btn") && !e.target.closest("#theme-menu")) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("click", listener);
        return () => document.removeEventListener("click", listener);
    }, []);

    // Detectar el scroll para cambiar el estilo del header
    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // LÓGICA PARA DETECTAR LA SECCIÓN ACTIVA CON Intersection Observer API
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: 0.5,
            }
        );
        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Manejar el cambio de tema
    const handleChange = (newTheme) => {
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        applyTheme(newTheme);
        setMenuOpen(false);
    };

    // Objeto para traducir las opciones de tema
    const themeTranslations = {
        light: "Claro",
        dark: "Oscuro",
        system: "Sistema",
    };

    return (
        <header
            // CAMBIO: Se reestructura la clase para que el fondo base sea transparente
            // y solo se añadan las clases de scroll cuando `isScrolled` es true.
            className={`fixed top-0 z-10 w-full flex justify-center items-center transition-all duration-300
                ${isScrolled ? "backdrop-blur-md bg-white/80 dark:bg-gray-900/80 shadow-md" : "bg-transparent"}`}
        >
            <nav className="flex items-center px-3 text-sm font-medium rounded-full text-gray-600 dark:text-gray-200">
                <a
                    href="#experiencia"
                    className={`px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500 ${
                        activeSection === "experiencia" ? "text-blue-500 font-semibold" : ""
                    }`}
                >
                    Experiencia
                </a>
                <a
                    href="#proyectos"
                    className={`px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500 ${
                        activeSection === "proyectos" ? "text-blue-500 font-semibold" : ""
                    }`}
                >
                    Proyectos
                </a>
                <a
                    href="#sobre-mi"
                    className={`px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500 ${
                        activeSection === "sobre-mi" ? "text-blue-500 font-semibold" : ""
                    }`}
                >
                    Sobre mí
                </a>
                <a href="mailto:colidom@outlook.com" className="px-2 py-2 transition hover:text-blue-500 dark:hover:text-blue-500">
                    Contacto
                </a>

                {/* Botón tema */}
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
