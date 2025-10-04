import React, { useState, useMemo } from "react";
import { FaCode, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { StaggerContainer, StaggerItem } from "./AnimatedSection";
import { getTechIcon } from "./icons/techIcons";
import { useSkills } from "../hooks/useSkills";

const ITEMS_PER_PAGE = 8;

const SkillCard = ({ skill, index }) => {
    const IconComponent = getTechIcon(skill.name);
    
    return (
        <StaggerItem>
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="group relative p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
                        {skill.category}
                    </span>
                </div>
                {/* Skill Icon */}
                <div className="flex items-center justify-center mb-4">
                    {IconComponent ? (
                        <div className="text-5xl">{IconComponent}</div>
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                                {skill.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    )}
                </div>

                {/* Skill Name */}
                <h4 className="text-center font-semibold text-gray-900 dark:text-white mb-3">
                    {skill.name}
                </h4>

                {/* Progress Bar */}
                {skill.level && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>Nivel</span>
                            <span>{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                            />
                        </div>
                    </div>
                )}

                {/* Years of Experience */}
                {skill.years && (
                    <p className="mt-3 text-center text-sm text-gray-500 dark:text-gray-400">
                        {skill.years} {skill.years === 1 ? 'año' : 'años'} de experiencia
                    </p>
                )}

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300 pointer-events-none" />
            </motion.div>
        </StaggerItem>
    );
};

const SkillsGrid = ({ skills, filter, currentPage, setCurrentPage }) => {
    const filteredSkills = filter === 'all' 
        ? skills 
        : skills.filter(skill => skill.category === filter);

    // Calculate pagination
    const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentSkills = filteredSkills.slice(startIndex, endIndex);

    // Reset to page 1 when filter changes
    useMemo(() => {
        setCurrentPage(1);
    }, [filter, setCurrentPage]);

    if (filteredSkills.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No hay habilidades en esta categoría
            </div>
        );
    }

    return (
        <>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentSkills.map((skill, index) => (
                    <SkillCard key={skill.id || index} skill={skill} index={index} />
                ))}
            </StaggerContainer>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 flex items-center justify-center gap-2"
                >
                    {/* Previous Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-colors ${
                            currentPage === 1
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                        aria-label="Página anterior"
                    >
                        <FaChevronLeft className="w-4 h-4" />
                    </motion.button>

                    {/* Page Numbers */}
                    <div className="flex gap-2">
                        {[...Array(totalPages)].map((_, index) => {
                            const pageNumber = index + 1;
                            // Show first page, last page, current page, and pages around current
                            const showPage = 
                                pageNumber === 1 ||
                                pageNumber === totalPages ||
                                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                            if (!showPage) {
                                // Show ellipsis
                                if (pageNumber === currentPage - 2 || pageNumber === currentPage + 2) {
                                    return (
                                        <span
                                            key={pageNumber}
                                            className="px-3 py-2 text-gray-500 dark:text-gray-400"
                                        >
                                            ...
                                        </span>
                                    );
                                }
                                return null;
                            }

                            return (
                                <motion.button
                                    key={pageNumber}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setCurrentPage(pageNumber)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                        currentPage === pageNumber
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }`}
                                >
                                    {pageNumber}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Next Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-colors ${
                            currentPage === totalPages
                                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                        }`}
                        aria-label="Página siguiente"
                    >
                        <FaChevronRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            )}

            {/* Page Info */}
            {totalPages > 1 && (
                <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    Mostrando {startIndex + 1}-{Math.min(endIndex, filteredSkills.length)} de {filteredSkills.length} habilidades
                </div>
            )}
        </>
    );
};

const renderSkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse">
                <div className="flex items-center justify-center mb-4">
                    <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto mb-3"></div>
                <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
            </div>
        ))}
    </div>
);

export default function Skills() {
    const { skills, categories, loading, error, stats } = useSkills();
    const [activeFilter, setActiveFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <section id="habilidades" className="mt-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center mb-8"
            >
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <FaCode className="size-5" />
                </div>
                <h2 className="text-3xl font-bold">Habilidades Técnicas</h2>
            </motion.div>

            {/* Filter Buttons */}
            {!loading && !error && skills.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap gap-3 mb-8"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                        setActiveFilter('all');
                        setCurrentPage(1);
                    }}
                        className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                            ${activeFilter === 'all'
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                            }`}
                    >
                        Todas
                    </motion.button>
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                            setActiveFilter(category);
                            setCurrentPage(1);
                        }}
                            className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                                ${activeFilter === category
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                                }`}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {/* Skills Grid */}
            {loading ? (
                renderSkeletonLoader()
            ) : error ? (
                <div className="text-center text-red-500 dark:text-red-400 py-12">
                    Error al cargar las habilidades
                </div>
            ) : skills.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                    Aún no has añadido habilidades
                </div>
            ) : (
                <>
                    <SkillsGrid skills={skills} filter={activeFilter} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    
                    {/* Statistics Summary */}
                    {skills.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
                        >
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
                                <div className="text-3xl font-bold text-blue-500">{stats.total}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Habilidades</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
                                <div className="text-3xl font-bold text-green-500">{stats.categoriesCount}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Categorías</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
                                <div className="text-3xl font-bold text-purple-500">{stats.averageLevel}%</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Nivel Promedio</div>
                            </div>
                            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700 shadow-lg">
                                <div className="text-3xl font-bold text-orange-500">{stats.maxYears}</div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Años Máximos</div>
                            </div>
                        </motion.div>
                    )}
                </>
            )}
        </section>
    );
}
