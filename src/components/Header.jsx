import React, { useState, useEffect } from "react";
import { MdHome, MdMenu, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import ThemeIcon from "./ThemeIcon";
import { useTheme } from "../hooks/useTheme";
import { useScrollEffects } from "../hooks/useScrollEffects";

const navItems = [
    { id: "inicio", label: "Inicio", icon: MdHome, type: "internal" },
    { id: "experiencia", label: "Experiencia", type: "internal" },
    { id: "proyectos", label: "Proyectos", type: "internal" },
    { id: "habilidades", label: "Habilidades", type: "internal" },
    { id: "sobre-mi", label: "Sobre mí", type: "internal" },
    { id: "contacto", label: "Contacto", type: "internal" },
];

export default function Header() {
    const { theme, menuOpen, setMenuOpen, handleChange, themeTranslations } = useTheme();
    const { isScrolled, activeSection, handleNavClick } = useScrollEffects();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const handleMobileNavClick = (e, id) => {
        handleNavClick(e, id);
        setMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`fixed top-0 z-50 w-full transition-all duration-300
                    ${isScrolled 
                        ? "backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 shadow-lg border-b border-gray-200/50 dark:border-gray-700/50" 
                        : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Name */}
                        <motion.div 
                            className="flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <button
                                onClick={(e) => handleNavClick(e, "inicio")}
                                className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                            >
                                Portfolio
                            </button>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navItems.map((item) => {
                                const IconComponent = item.icon;
                                const isActive = activeSection === item.id;
                                
                                return (
                                    <motion.button
                                        key={item.id}
                                        onClick={(e) => handleNavClick(e, item.id)}
                                        className={`relative px-4 py-2 rounded-lg transition-all duration-200
                                            ${isActive 
                                                ? "text-blue-500 font-semibold" 
                                                : "text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        aria-label={`Ir a la sección de ${item.label}`}
                                    >
                                        <span className="flex items-center gap-2">
                                            {IconComponent && <IconComponent className="size-4" />}
                                            {item.label}
                                        </span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeSection"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                                                initial={false}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </motion.button>
                                );
                            })}
                            
                            {/* Theme Toggle Desktop */}
                            <div className="relative ml-2" id="theme-toggle-container">
                                <motion.button
                                    id="theme-toggle-btn"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Cambiar tema"
                                >
                                    <ThemeIcon selected={theme} />
                                </motion.button>
                                
                                <AnimatePresence>
                                    {menuOpen && (
                                        <motion.div
                                            id="theme-menu"
                                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-12 right-0 w-36 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl backdrop-blur-lg overflow-hidden"
                                        >
                                            <ul className="py-1">
                                                {["light", "dark", "system"].map((option) => (
                                                    <motion.li
                                                        key={option}
                                                        onClick={() => handleChange(option)}
                                                        className={`px-4 py-2 cursor-pointer transition-colors flex items-center justify-between
                                                            ${theme === option 
                                                                ? "bg-blue-500 text-white" 
                                                                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                                            }`}
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <span>{themeTranslations[option]}</span>
                                                        <ThemeIcon selected={option} isInMenu={true} isActive={theme === option} currentTheme={theme} />
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </nav>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center gap-2">
                            {/* Theme Toggle Mobile */}
                            <motion.button
                                id="theme-toggle-btn-mobile"
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Cambiar tema"
                            >
                                <ThemeIcon selected={theme} />
                            </motion.button>

                            {/* Hamburger Menu */}
                            <motion.button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                aria-label="Abrir menú"
                            >
                                {mobileMenuOpen ? (
                                    <MdClose className="size-6 text-gray-600 dark:text-gray-300" />
                                ) : (
                                    <MdMenu className="size-6 text-gray-600 dark:text-gray-300" />
                                )}
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Theme Menu Mobile (outside header) */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            id="theme-menu-mobile"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden absolute top-16 right-4 w-36 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl backdrop-blur-lg overflow-hidden"
                        >
                            <ul className="py-1">
                                {["light", "dark", "system"].map((option) => (
                                    <motion.li
                                        key={option}
                                        onClick={() => handleChange(option)}
                                        className={`px-4 py-2 cursor-pointer transition-colors flex items-center justify-between
                                            ${theme === option 
                                                ? "bg-blue-500 text-white" 
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                            }`}
                                        whileHover={{ x: 4 }}
                                    >
                                        <span>{themeTranslations[option]}</span>
                                        <ThemeIcon selected={option} isInMenu={true} isActive={theme === option} currentTheme={theme} />
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-16 right-0 bottom-0 z-40 w-64 bg-white dark:bg-gray-900 shadow-2xl md:hidden overflow-y-auto"
                        >
                            <nav className="px-4 py-6">
                                <ul className="space-y-2">
                                    {navItems.map((item, index) => {
                                        const IconComponent = item.icon;
                                        const isActive = activeSection === item.id;
                                        
                                        return (
                                            <motion.li
                                                key={item.id}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <button
                                                    onClick={(e) => handleMobileNavClick(e, item.id)}
                                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                                                        ${isActive 
                                                            ? "bg-blue-500 text-white shadow-lg" 
                                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                        }`}
                                                >
                                                    {IconComponent && <IconComponent className="size-5" />}
                                                    <span className="font-medium">{item.label}</span>
                                                </button>
                                            </motion.li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
