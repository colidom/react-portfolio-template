import React, { useState, useEffect, useRef } from "react";
import { MdWorkOutline } from "react-icons/md";
import { getTechIcon } from "./icons/techIcons";

const getDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (endDate.getDate() >= 15) {
        months++;
    }

    if (months >= 12) {
        years++;
        months -= 12;
    }

    let durationString = "";
    if (years > 0) {
        durationString += `${years} año${years > 1 ? "s" : ""}`;
    }
    if (months > 0) {
        if (durationString.length > 0) {
            durationString += " y ";
        }
        durationString += `${months} mes${months > 1 ? "es" : ""}`;
    }

    if (durationString.length === 0) {
        return "Menos de un mes";
    }

    return durationString;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short" };
    const formattedDate = date.toLocaleDateString("es-ES", options);

    if (!formattedDate.endsWith(".")) {
        return formattedDate.replace(/\s(\d{4})/, ". $1");
    }
    return formattedDate;
};

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCompanies, setExpandedCompanies] = useState({});
    const companyRefs = useRef({});

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiences`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                const groupedByCompany = data.reduce((acc, experience) => {
                    if (!acc[experience.company]) {
                        acc[experience.company] = [];
                    }
                    acc[experience.company].push(experience);
                    return acc;
                }, {});

                const sortedGroupedExperiences = Object.values(groupedByCompany)
                    .map((companyExperiences) => {
                        const sortedProjects = companyExperiences.sort((a, b) => {
                            const endDateA = a.end_date ? new Date(a.end_date) : new Date(2100, 0, 1);
                            const endDateB = b.end_date ? new Date(b.end_date) : new Date(2100, 0, 1);
                            return endDateB - endDateA;
                        });

                        const startDate = new Date(sortedProjects[sortedProjects.length - 1].start_date);
                        const endDate = sortedProjects[0].end_date ? new Date(sortedProjects[0].end_date) : new Date();
                        const totalDuration = getDuration(startDate, endDate);

                        return {
                            company: sortedProjects[0].company,
                            location: sortedProjects[0].location,
                            totalDuration,
                            projects: sortedProjects,
                        };
                    })
                    .sort((a, b) => {
                        const latestProjectA = a.projects[0];
                        const latestProjectB = b.projects[0];
                        const endDateA = latestProjectA.end_date ? new Date(latestProjectA.end_date) : new Date(2100, 0, 1);
                        const endDateB = latestProjectB.end_date ? new Date(latestProjectB.end_date) : new Date(2100, 0, 1);
                        return endDateB - endDateA;
                    });

                setExperiences(sortedGroupedExperiences);
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

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
                                <div className="flex flex-col md:flex-row relative">
                                    {/* Columna izquierda: Company Info */}
                                    <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                                        <h3 className="text-xl font-semibold mb-1">{companyGroup.company}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{companyGroup.location}</p>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{companyGroup.totalDuration}</p>
                                    </div>

                                    {/* Columna central: Línea y Puntos */}
                                    <div className="relative flex flex-col items-center px-4">
                                        <div className="absolute top-8 bottom-20 w-px bg-neutral-300 dark:bg-gray-700"></div>
                                    </div>

                                    {/* Columna derecha: Detalles de experiencias */}
                                    <div className="md:w-2/3 md:pl-0 mt-2 md:mt-0 pl-8">
                                        {experiencesInCompanyToShow.map((experience, experienceIndex) => (
                                            <div key={experienceIndex} className="mb-6 last:mb-0 relative flex">
                                                {/* Punto alineado a la izquierda */}
                                                <div className="relative flex flex-col items-center">
                                                    <div className="w-4 h-4 bg-blue-400 rounded-full border border-white dark:border-gray-950 mt-1.5 -ml-8 transition-transform duration-200 hover:scale-125"></div>
                                                </div>

                                                <div className="flex-1 ml-4">
                                                    <h4 className="font-semibold">{experience.job_title}</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {formatDate(experience.start_date)} -{" "}
                                                        {experience.end_date ? formatDate(experience.end_date) : "Actualmente"}
                                                        <span className="text-gray-400 dark:text-gray-500">
                                                            ({getDuration(experience.start_date, experience.end_date)})
                                                        </span>
                                                    </p>
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
