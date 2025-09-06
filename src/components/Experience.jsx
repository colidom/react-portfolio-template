import React, { useState, useEffect, useRef } from "react";
import { MdWorkOutline } from "react-icons/md";
import { getTechIcon } from "./icons/techIcons"; // Importa la función centralizada

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
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const headingRef = useRef(null);
    const firstHiddenRef = useRef(null);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiences`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                const sortedData = data.sort((a, b) => {
                    if (!a.end_date && !b.end_date) {
                        return new Date(b.start_date) - new Date(a.start_date);
                    }

                    const endDateA = a.end_date ? new Date(a.end_date) : new Date(2100, 0, 1);
                    const endDateB = b.end_date ? new Date(b.end_date) : new Date(2100, 0, 1);
                    return endDateB - endDateA;
                });
                setExperiences(sortedData);
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    const handleToggleExperiences = () => {
        if (showAllExperiences) {
            if (headingRef.current) {
                headingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            setTimeout(() => {
                setShowAllExperiences(false);
            }, 300);
        } else {
            setShowAllExperiences(true);
            setTimeout(() => {
                if (firstHiddenRef.current) {
                    firstHiddenRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 300);
        }
    };

    const renderSkeletonLoader = () => (
        <div className="relative">
            <div className="absolute top-[-1.5rem] left-2 w-px h-[calc(100%+1.5rem)] bg-neutral-300 dark:bg-gray-700 md:left-1/3 md:ml-[-0.5px]"></div>
            {[...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col md:flex-row mb-10 relative animate-pulse">
                    <div className="absolute w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full left-0 mt-1.5 border border-white dark:border-gray-950 md:left-1/3 md:ml-[-0.5rem]"></div>
                    <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2 md:ml-auto"></div>
                    </div>
                    <div className="md:w-2/3 md:pl-12 mt-2 md:mt-0 pl-8">
                        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const experiencesToShow = showAllExperiences ? experiences : experiences.slice(0, 3);
    const showToggleButton = experiences.length > 3;

    return (
        <section id="experiencia" className="mt-32">
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <MdWorkOutline className="size-5" />
                </div>
                <h2 ref={headingRef} className="text-3xl font-bold">
                    Experiencia laboral
                </h2>
            </div>
            {loading ? (
                renderSkeletonLoader()
            ) : experiences.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido experiencias laborales.</div>
            ) : (
                <div className="relative">
                    <div className="absolute top-[-1.5rem] left-2 w-px h-[calc(100%+1.5rem)] bg-neutral-300 dark:bg-gray-700 md:left-1/3 md:ml-[-0.5px]"></div>
                    {experiencesToShow.map((job, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row mb-10 relative"
                            ref={(el) => {
                                if (index === 3) {
                                    firstHiddenRef.current = el;
                                }
                            }}
                        >
                            <div className="absolute w-4 h-4 bg-blue-400 rounded-full left-0 mt-1.5 border border-white dark:border-gray-950 transition-transform duration-200 hover:scale-125 md:left-1/3 md:ml-[-0.5rem]"></div>
                            <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                                <time className="text-sm text-gray-500 dark:text-gray-400">
                                    {formatDate(job.start_date)} - {job.end_date ? formatDate(job.end_date) : "Actualmente"}
                                </time>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{getDuration(job.start_date, job.end_date)}</p>
                            </div>
                            <div className="md:w-2/3 md:pl-12 mt-2 md:mt-0 pl-8">
                                <h3 className="text-xl font-semibold">{job.job_title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                                {(job.location || job.ubication) && (
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                        {job.location}
                                        {job.location && job.ubication && " · "}
                                        {job.ubication}
                                    </p>
                                )}
                                <p className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">{job.description}</p>
                                {job.technologies && Array.isArray(job.technologies) && job.technologies.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {job.technologies.map((tech, techIndex) => (
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
                </div>
            )}
            {showToggleButton && (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleToggleExperiences}
                        className="flex items-center justify-center mx-auto text-blue-500 font-semibold px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    >
                        {showAllExperiences ? "Mostrar menos" : "Mostrar más"}
                        <span className={`ml-2 transform transition-transform duration-300 ${showAllExperiences ? "rotate-180" : ""}`}>&#x25BC;</span>
                    </button>
                </div>
            )}
        </section>
    );
}
