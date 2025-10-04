import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAboutData } from "../hooks/useAboutData";
import { FadeIn, SlideIn } from "./AnimatedSection";

const renderSkeletonLoader = () => (
    <div className="flex flex-col md:flex-row gap-8 items-start rounded-lg p-6 animate-pulse">
        <div className="flex-shrink-0 w-full md:w-1/3 h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1 w-full md:w-2/3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
        </div>
    </div>
);

export default function About() {
    const { aboutData, loading, error, hasNoData, renderDescriptionWithHighlights } = useAboutData();

    return (
        <section id="sobre-mi" className="mt-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center mb-8"
            >
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <FaRegUserCircle className="size-5" />
                </div>
                <h2 className="text-3xl font-bold">Sobre mí</h2>
            </motion.div>

            {loading ? (
                renderSkeletonLoader()
            ) : error ? (
                <p className="text-center text-red-500 dark:text-red-400">Error al cargar la información.</p>
            ) : hasNoData ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido información.</p>
            ) : (
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Profile Image */}
                    <SlideIn direction="left" delay={0.2} className="w-full md:w-1/3 flex-shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.05, rotate: 2 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <img
                                src={aboutData.profile_image}
                                alt="Foto de perfil"
                                className="relative w-full h-auto rounded-lg shadow-xl border-4 border-white dark:border-gray-800 transition-transform duration-300"
                            />
                        </motion.div>
                    </SlideIn>

                    {/* Description */}
                    <SlideIn direction="right" delay={0.4} className="w-full md:w-2/3">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {renderDescriptionWithHighlights(aboutData.description, aboutData.keywords_to_highlight)}
                        </div>

                        {/* Stats or Additional Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4"
                        >
                            {[
                                { label: "Proyectos", value: "10+", icon: "🚀" },
                                { label: "Experiencia", value: "3+ años", icon: "💼" },
                                { label: "Tecnologías", value: "15+", icon: "⚡" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600 text-center"
                                >
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </SlideIn>
                </div>
            )}
        </section>
    );
}
