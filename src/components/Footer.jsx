import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaLinkedin, href: "https://www.linkedin.com/in/cjod/", label: "LinkedIn" },
        { icon: FaGithub, href: "https://github.com/colidom", label: "GitHub" },
        /* { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" } */
    ];

    const navLinks = [
        { name: "Inicio", href: "#inicio" },
        { name: "Experiencia", href: "#experiencia" },
        { name: "Proyectos", href: "#proyectos" },
        /* { name: "Habilidades", href: "#habilidades" }, */
        { name: "Sobre mí", href: "#sobre-mi" },
        { name: "Contacto", href: "#contacto" }
    ];

    return (
        <footer className="relative mt-32 py-12 border-t border-gray-200 dark:border-gray-800">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-100 to-transparent dark:from-gray-900 dark:to-transparent opacity-50 pointer-events-none"></div>

            <div className="relative container mx-auto px-4">
                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center gap-6 mb-8"
                >
                    {socialLinks.map((social, index) => {
                        const IconComponent = social.icon;
                        return (
                            <motion.a
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.2, y: -3 }}
                                whileTap={{ scale: 0.9 }}
                                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                                aria-label={social.label}
                            >
                                <IconComponent className="size-5" />
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* Navigation Links */}
                <motion.nav
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-6 mb-8 text-sm"
                >
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.href}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </motion.nav>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="w-48 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mx-auto mb-8"
                />

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-center"
                >
                    <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center justify-center gap-2">
                        <span>&copy; {currentYear}</span>
                        <span>Hecho con</span>
                        <motion.span
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <FaHeart className="text-red-500 inline" />
                        </motion.span>
                        <span>por</span>
                        <span className="font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                            colidom
                        </span>
                    </p>
                    <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
                        Algunos derechos reservados, otros en desarrollo
                    </p>
                </motion.div>

                {/* Back to top indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-8 flex justify-center"
                >
                    <motion.a
                        href="#inicio"
                        whileHover={{ y: -3 }}
                        className="text-xs text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        Volver arriba
                    </motion.a>
                </motion.div>
            </div>
        </footer>
    );
}
