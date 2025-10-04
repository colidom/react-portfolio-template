import React, { useState } from "react";
import { IoCodeWorking } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { getTechIcon } from "./icons/techIcons";
import { useProjects } from "../hooks/useProjects";
import { StaggerContainer, StaggerItem } from "./AnimatedSection";

const DUMMY_IMAGE_URL = "/img-placeholder.png";

const renderSkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[...Array(4)].map((_, index) => (
            <div key={index} className="rounded-xl bg-gray-200 dark:bg-gray-800 overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
                <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                    <div className="flex gap-3 mt-4">
                        <div className="size-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="size-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="size-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

const ProjectCard = ({ project, index }) => {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <StaggerItem>
            <motion.article
                whileHover={{ y: -8 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="group relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-900">
                    <motion.img
                        src={imageError ? DUMMY_IMAGE_URL : (project.image || DUMMY_IMAGE_URL)}
                        alt={`Captura de pantalla de ${project.title}`}
                        onError={() => setImageError(true)}
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay on hover */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-6"
                    >
                        <div className="flex gap-4">
                            {project.code_link && (
                                <motion.a
                                    href={project.code_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-900 font-semibold text-sm hover:bg-white transition-colors duration-200 flex items-center gap-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <svg className="size-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                                        <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0c-2.4-1.6-3.5-1.3-3.5-1.3a4.2 4.2 0 0 0-.1 3.2a4.6 4.6 0 0 0-1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2v3.5" />
                                    </svg>
                                    Código
                                </motion.a>
                            )}

                            {project.demo_link && (
                                <motion.a
                                    href={project.demo_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 bg-blue-500 backdrop-blur-sm rounded-lg text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <svg className="size-4" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
                                        <path d="M11 7h-5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M10 14l10-10M15 4l5 0l0 5" />
                                    </svg>
                                    Demo
                                </motion.a>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                        {project.description}
                    </p>

                    {project.created_at && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                            {new Date(project.created_at).toLocaleDateString('es-ES', { 
                                year: 'numeric', 
                                month: 'long' 
                            })}
                        </p>
                    )}

                    {/* Technologies */}
                    {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                            {project.technologies.slice(0, 6).map((tech, techIndex) => {
                                const IconComponent = getTechIcon(tech);
                                return IconComponent ? (
                                    <motion.div
                                        key={techIndex}
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        className="relative group/tech"
                                    >
                                        <div className="text-2xl transition-transform duration-200">
                                            {IconComponent}
                                        </div>
                                        <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover/tech:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg">
                                            {tech}
                                        </span>
                                    </motion.div>
                                ) : null;
                            })}
                            {project.technologies.length > 6 && (
                                <span className="text-sm text-gray-500 dark:text-gray-400 self-center">
                                    +{project.technologies.length - 6}
                                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 pointer-events-none" />
            </motion.article>
        </StaggerItem>
    );
};

export default function Projects() {
    const { projectsData, loading, error, formatDate } = useProjects();
    const [viewMode, setViewMode] = useState('grid');

    return (
        <section id="proyectos" className="mt-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-8"
            >
                <div className="flex items-center">
                    <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                        <IoCodeWorking className="size-5" />
                    </div>
                    <h2 className="text-3xl font-bold">Proyectos</h2>
                </div>

                {/* View Mode Toggle */}
                {!loading && !error && projectsData.length > 0 && (
                    <div className="flex gap-2 bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-md transition-all duration-200 ${
                                viewMode === 'grid' 
                                    ? 'bg-white dark:bg-gray-700 shadow-md' 
                                    : 'hover:bg-gray-300 dark:hover:bg-gray-700'
                            }`}
                            aria-label="Vista de cuadrícula"
                        >
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-md transition-all duration-200 ${
                                viewMode === 'list' 
                                    ? 'bg-white dark:bg-gray-700 shadow-md' 
                                    : 'hover:bg-gray-300 dark:hover:bg-gray-700'
                            }`}
                            aria-label="Vista de lista"
                        >
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                        </motion.button>
                    </div>
                )}
            </motion.div>

            {loading ? (
                renderSkeletonLoader()
            ) : error ? (
                <div className="text-center text-red-500 dark:text-red-400">Error al cargar los proyectos.</div>
            ) : projectsData.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido proyectos.</div>
            ) : (
                <AnimatePresence mode="wait">
                    {viewMode === 'grid' ? (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {projectsData.map((project, index) => (
                                    <ProjectCard 
                                        key={project.id || index} 
                                        project={project} 
                                        index={index} 
                                    />
                                ))}
                            </StaggerContainer>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="list"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                        >
                            {projectsData.map((project, index) => (
                                <ProjectCard 
                                    key={project.id || index} 
                                    project={project} 
                                    index={index} 
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </section>
    );
}
