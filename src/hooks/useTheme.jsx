import { useState, useEffect } from "react";

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

export const useTheme = () => {
    const [theme, setTheme] = useState("system");
    const [menuOpen, setMenuOpen] = useState(false);

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
            // Verificar si el clic fue fuera de los elementos del tema
            const isOutside = !e.target.closest("#theme-toggle-btn") && 
                            !e.target.closest("#theme-toggle-btn-mobile") && 
                            !e.target.closest("#theme-menu") && 
                            !e.target.closest("#theme-menu-mobile") &&
                            !e.target.closest("#theme-toggle-container");
            
            if (isOutside) {
                setMenuOpen(false);
            }
        };
        
        // Usar timeout para evitar que el clic inicial cierre el menú inmediatamente
        const timeout = setTimeout(() => {
            document.addEventListener("click", listener);
        }, 0);
        
        return () => {
            clearTimeout(timeout);
            document.removeEventListener("click", listener);
        };
    }, [menuOpen]);

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

    return { theme, menuOpen, setMenuOpen, handleChange, themeTranslations };
};
