import React, { useState, useRef } from "react";
import { MdWorkOutline } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { getTechIcon } from "./icons/techIcons";
import { useExperiences } from "../hooks/useExperiences";
import { StaggerContainer, StaggerItem } from "./AnimatedSection";

const renderSkeletonLoader = () => (
    <div className="relative">
        {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col md:flex-row mb-10 relative animate-pulse">
                <div className="md:w-1/3 left-8 text-left md:text-right md:pr-12 pl-8">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2 md:ml-auto"></div>
                </div>
                <div className="relative flex flex-col items-center px-4">
                    <div className="absolute top-8 bottom-20 w-px bg-neutral-300 dark:bg-gray-700"></div>
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full border border-white dark:border-gray-950 mt-1.5"></div>
                </div>
                <div className="md:w-2/3 left-8md:pl-0 mt-2 md:mt-0 pl-8">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default function Experience() {
    const { experiences, loading, formatDate, getDuration } = useExperiences();
    const [expandedCompanies, setExpandedCompanies] = useState({});
    const companyRefs = useRef({});

    const handleToggleCompanyExperiences = (companyName, isExpanded) => {
        if (isExpanded) {
            if (companyRefs.current[companyName]) {
                companyRefs.current[companyName].scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setTimeout(() => {
                setExpandedCompanies((prevState) => ({
                    ...prevState,
                    [companyName]: false,
                }));
            }, 300);
        } else {
            setExpandedCompanies((prevState) => ({
                ...prevState,
                [companyName]: true,
            }));
        }
    };

    return (
        <section id="experiencia" className="mt-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center mb-8"
            >
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <MdWorkOutline className="size-5" />
                </div>
                <h2 className="text-3xl font-bold">Experiencia laboral</h2>
            </motion.div>

            {loading ? (
                renderSkeletonLoader()
            ) : experiences.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido experiencias laborales.</div>
            ) : (
                <div className="relative">
                    {experiences.map((companyGroup, index) => {
                        const experiencesInCompanyToShow = expandedCompanies[companyGroup.company]
                            ? companyGroup.projects
                            : companyGroup.projects.slice(0, 2);
                        const showCompanyToggleButton = companyGroup.projects.length > 2;
                        const isCompanyExpanded = !!expandedCompanies[companyGroup.company];

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative mb-12"
                                ref={(el) => {
                                    companyRefs.current[companyGroup.company] = el;
                                }}
                            >
                                <div className="flex flex-col md:flex-row relative h-full">
                                    {/* Company Info */}
                                    <motion.div 
                                        className="md:w-1/3 text-left md:text-right md:pr-12 pl-8"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        <h3 className="text-xl font-semibold mb-1 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                                            {companyGroup.company}
                                        </h3>
                                        {companyGroup.workType && !companyGroup.hasMultipleWorkTypes && (
                                            <p className="text-xs text-gray-400 dark:text-gray-500">{companyGroup.workType}</p>
                                        )}
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{companyGroup.totalDuration}</p>
                                    </motion.div>

                                    <div className="md:w-2/3 md:pl-0 mt-2 md:mt-0 pl-8 relative">
                                        {/* Timeline Line */}
                                        <div className="absolute top-0 bottom-0 md:left-4 left-12 w-0 flex flex-col items-center">
                                            <motion.div 
                                                className="absolute left-1/2 -translate-x-1/2 top-8 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                                                initial={{ height: 0 }}
                                                whileInView={{ height: "calc(100% - 5rem)" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.8, delay: 0.3 }}
                                            />
                                        </div>

                                        <AnimatePresence mode="sync">
                                            {experiencesInCompanyToShow.map((experience, experienceIndex) => (
                                                <motion.div 
                                                    key={experienceIndex} 
                                                    className="mb-6 last:mb-0 relative flex"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.4, delay: experienceIndex * 0.1 }}
                                                >
                                                    {/* Timeline Dot */}
                                                    <div className="relative flex flex-col items-center w-8">
                                                        <motion.div 
                                                            className="w-4 h-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white dark:border-gray-950 mt-1.5 shadow-lg"
                                                            whileHover={{ scale: 1.5, rotate: 90 }}
                                                            transition={{ type: "spring", stiffness: 400 }}
                                                        />
                                                    </div>

                                                    {/* Experience Details */}
                                                    <motion.div 
                                                        className="flex-1 ml-4 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <h4 className="font-semibold text-lg text-gray-900 dark:text-white">
                                                            {experience.job_title}
                                                        </h4>
                                                        {companyGroup.hasMultipleWorkTypes && experience.work_type && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">{experience.work_type}</p>
                                                        )}
                                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                            {formatDate(experience.start_date)} -{" "}
                                                            {experience.end_date ? formatDate(experience.end_date) : "Actualmente"}
                                                            <span className="text-gray-400 dark:text-gray-500">
                                                                {" "}
                                                                ({getDuration(experience.start_date, experience.end_date)})
                                                            </span>
                                                        </p>
                                                        {(experience.location || experience.ubication) && (
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {experience.location && experience.ubication
                                                                    ? `${experience.location} - ${experience.ubication}`
                                                                    : experience.location || experience.ubication}
                                                            </p>
                                                        )}
                                                        <p className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                                                            {experience.description}
                                                        </p>
                                                        {experience.technologies?.length > 0 && (
                                                            <div className="mt-4 flex flex-wrap gap-3">
                                                                {experience.technologies.map((tech, techIndex) => (
                                                                    <motion.div
                                                                        key={techIndex}
                                                                        className="relative flex items-center justify-center group"
                                                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                                                        transition={{ type: "spring", stiffness: 400 }}
                                                                    >
                                                                        {getTechIcon(tech)}
                                                                        <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-gray-900 text-white text-xs rounded-md whitespace-nowrap shadow-lg">
                                                                            {tech}
                                                                        </span>
                                                                    </motion.div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {showCompanyToggleButton && (
                                            <motion.div 
                                                className="mt-4 text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                <motion.button
                                                    onClick={() => handleToggleCompanyExperiences(companyGroup.company, isCompanyExpanded)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="flex items-center justify-center mx-auto text-blue-500 font-semibold px-6 py-2 rounded-full border-2 border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-md hover:shadow-lg"
                                                >
                                                    {isCompanyExpanded ? "Mostrar menos" : "Mostrar más"}
                                                    <motion.span
                                                        animate={{ rotate: isCompanyExpanded ? 180 : 0 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="ml-2"
                                                    >
                                                        &#x25BC;
                                                    </motion.span>
                                                </motion.button>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Separator */}
                                {index < experiences.length - 1 && (
                                    <motion.div 
                                        initial={{ scaleX: 0 }}
                                        whileInView={{ scaleX: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                        className="border-b border-gray-300 dark:border-gray-700 mx-auto my-12 origin-center"
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
