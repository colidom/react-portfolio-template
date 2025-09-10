import React, { useState, useRef } from "react";
import { MdWorkOutline } from "react-icons/md";
import { getTechIcon } from "./icons/techIcons";
import { useExperiences } from "../hooks/useExperiences";

const renderSkeletonLoader = () => (
    <div className="relative">
        {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col md:flex-row mb-10 relative animate-pulse">
                {/* Izquierda */}
                <div className="md:w-1/3 left-8 text-left md:text-right md:pr-12 pl-8">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2 md:ml-auto"></div>
                </div>
                {/* Centro */}
                <div className="relative flex flex-col items-center px-4">
                    <div className="absolute top-8 bottom-20 w-px bg-neutral-300 dark:bg-gray-700"></div>
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full border border-white dark:border-gray-950 mt-1.5"></div>
                </div>
                {/* Derecha */}
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
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <MdWorkOutline className="size-5" />
                </div>
                <h2 className="text-3xl font-bold">Experiencia laboral</h2>
            </div>
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
                            <div
                                key={index}
                                className="relative mb-12"
                                ref={(el) => {
                                    companyRefs.current[companyGroup.company] = el;
                                }}
                            >
                                <div className="flex flex-col md:flex-row relative h-full">
                                    {/* Columna izquierda: Company Info */}
                                    <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                                        <h3 className="text-xl font-semibold mb-1">{companyGroup.company}</h3>
                                        {companyGroup.workType && !companyGroup.hasMultipleWorkTypes && (
                                            <p className="text-xs text-gray-400 dark:text-gray-500">{companyGroup.workType}</p>
                                        )}
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{companyGroup.totalDuration}</p>
                                    </div>

                                    <div className="md:w-2/3 md:pl-0 mt-2 md:mt-0 pl-8 relative">
                                        {/* Columna de línea y puntos */}
                                        <div className="absolute top-0 bottom-0 md:left-4 left-12 w-0 flex flex-col items-center">
                                            {/* Línea vertical */}
                                            <div className="absolute left-1/2 -translate-x-1/2 top-8 w-px h-[calc(100%-5rem)] bg-gray-700"></div>
                                        </div>

                                        {experiencesInCompanyToShow.map((experience, experienceIndex) => (
                                            <div key={experienceIndex} className="mb-6 last:mb-0 relative flex">
                                                {/* Columna del punto */}
                                                <div className="relative flex flex-col items-center w-8">
                                                    <div className="w-4 h-4 bg-blue-400 rounded-full border border-white dark:border-gray-950 mt-1.5 transition-transform duration-200 hover:scale-125"></div>
                                                </div>

                                                {/* Detalles */}
                                                <div className="flex-1 ml-4">
                                                    <h4 className="font-semibold">{experience.job_title}</h4>
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
                                                    <p className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">{experience.description}</p>
                                                    {experience.technologies?.length > 0 && (
                                                        <div className="mt-4 flex flex-wrap gap-3">
                                                            {experience.technologies.map((tech, techIndex) => (
                                                                <div
                                                                    key={techIndex}
                                                                    className="relative flex items-center justify-center transition-transform duration-200 group hover:scale-125"
                                                                >
                                                                    {getTechIcon(tech)}
                                                                    <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-gray-700 text-white text-xs rounded-md whitespace-nowrap">
                                                                        {tech}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}

                                        {showCompanyToggleButton && (
                                            <div className="mt-4 text-center">
                                                <button
                                                    onClick={() => handleToggleCompanyExperiences(companyGroup.company, isCompanyExpanded)}
                                                    className="flex items-center justify-center mx-auto text-blue-500 font-semibold px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                                                >
                                                    {isCompanyExpanded ? "Mostrar menos" : "Mostrar más"}
                                                    <span
                                                        className={`ml-2 transform transition-transform duration-300 ${
                                                            isCompanyExpanded ? "rotate-180" : ""
                                                        }`}
                                                    >
                                                        &#x25BC;
                                                    </span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Línea separadora entre empresas */}
                                {index < experiences.length - 1 && (
                                    <div className="border-b border-neutral-300 dark:border-gray-700 mx-auto my-12"></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
