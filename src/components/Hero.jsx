import React from "react";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { BsQuestionLg } from "react-icons/bs";
import { motion } from "framer-motion";
import { useHeroData } from "../hooks/useHeroData";

const iconMapping = {
    FaLinkedin: FaLinkedin,
    FaGithub: FaGithub,
    FaDownload: FaDownload,
    generic: BsQuestionLg,
};

const renderMessage = (message) => (
    <div className="py-20 text-gray-900 dark:text-white flex items-center justify-center h-full">
        <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">{message}</p>
        </div>
    </div>
);

const renderSkeleton = () => (
    <div className="py-20 text-gray-900 dark:text-white">
        <div className="animate-pulse">
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6"></div>
            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <div className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700">
                    <div className="w-5 h-5 bg-gray-400 dark:bg-gray-600 rounded-full"></div>
                    <div className="h-4 w-24 bg-gray-400 dark:bg-gray-600 rounded"></div>
                </div>
            </div>
        </div>
    </div>
);

export default function Hero() {
    const { heroData, loading, error, hasNoData } = useHeroData();

    if (loading) {
        return <section id="inicio" className="min-h-[80vh]">{renderSkeleton()}</section>;
    }

    if (error) {
        return <section id="inicio" className="min-h-[80vh]">{renderMessage("No se pudo cargar la información. Revisa la conexión con la API.")}</section>;
    }

    if (hasNoData) {
        return <section id="inicio" className="min-h-[80vh]">{renderMessage("Aún no has añadido datos.")}</section>;
    }

    return (
        <section id="inicio" className="relative py-20 min-h-[85vh] flex flex-col justify-center text-gray-900 dark:text-white">
            {/* Content */}
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.h1 
                        className="text-4xl md:text-6xl font-bold leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Hola, soy{" "}
                        <motion.span 
                            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                            animate={{
                                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            style={{
                                backgroundSize: "200% 200%"
                            }}
                        >
                            {heroData.name}
                        </motion.span>
                    </motion.h1>
                </motion.div>

                <motion.p 
                    className="mt-6 text-lg md:text-xl max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <motion.span 
                        className="text-yellow-500 font-bold dark:text-yellow-400"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        {heroData.title}
                    </motion.span>
                    .{" "}
                    <span className="text-gray-700 dark:text-gray-300">
                        {heroData.description}
                    </span>
                </motion.p>

                <motion.div 
                    className="flex flex-col sm:flex-row items-start gap-4 mt-8 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    {heroData.social_links &&
                        heroData.social_links.map((link, index) => {
                            const IconComponent = iconMapping[link.icon] || iconMapping.generic;
                            const downloadAttribute = link.name === "Descargar CV" ? "download" : "";

                            const buttonStyles = {
                                "LinkedIn": "text-blue-500 border-2 border-blue-500 hover:bg-blue-500",
                                "GitHub": "text-gray-500 border-2 border-gray-500 hover:bg-gray-500",
                                "Descargar CV": "text-green-500 border-2 border-green-500 hover:bg-green-500"
                            };

                            return (
                                <motion.a
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    download={downloadAttribute}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`
                                        inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3
                                        font-bold rounded-lg transition-all duration-300 hover:text-white
                                        focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950
                                        shadow-lg hover:shadow-xl
                                        ${buttonStyles[link.name] || buttonStyles["GitHub"]}
                                    `}
                                >
                                    {IconComponent && <IconComponent className="w-5 h-5" />}
                                    {link.name}
                                </motion.a>
                            );
                        })}
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-600"
                >
                    <span className="text-sm font-medium">Desliza</span>
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
