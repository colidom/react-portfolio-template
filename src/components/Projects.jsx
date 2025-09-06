import React, { useState, useEffect } from "react";
import { IoCodeWorking } from "react-icons/io5";
import { getTechIcon } from "./icons/techIcons";

export default function Projects() {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const DUMMY_IMAGE_URL = "/img-placeholder.png";

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const sortedProjects = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setProjectsData(sortedProjects);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const renderSkeletonLoader = () => (
        <div className="space-y-16">
            {[...Array(1)].map((_, index) => (
                <article key={index} className="flex flex-col md:flex-row items-start gap-8 rounded-lg p-6 animate-pulse">
                    <div className="flex-shrink-0 w-full md:w-1/3 h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    <div className="flex-1 w-full md:w-2/3">
                        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
                        <div className="mt-4 flex flex-wrap gap-4">
                            <div className="flex flex-col items-center">
                                <div className="size-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-2 w-10 bg-gray-300 dark:bg-gray-700 mt-1 rounded"></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="size-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-2 w-10 bg-gray-300 dark:bg-gray-700 mt-1 rounded"></div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="size-6 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                <div className="h-2 w-10 bg-gray-300 dark:bg-gray-700 mt-1 rounded"></div>
                            </div>
                        </div>
                        <div className="mt-8">
                            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );

    return (
        <section id="proyectos" className="mt-32">
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <IoCodeWorking className="size-5" />
                </div>
                <h2 className="text-3xl font-bold">Proyectos</h2>
            </div>
            {loading ? (
                renderSkeletonLoader()
            ) : projectsData.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido proyectos.</div>
            ) : (
                <div className="space-y-16">
                    {projectsData.map((project, index) => (
                        <article
                            key={project.id || index}
                            className="flex flex-col md:flex-row items-start gap-8 group rounded-lg p-6 transition-all duration-300 transform hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <div className="flex-shrink-0 w-full md:w-1/3 overflow-hidden rounded-lg">
                                <img
                                    src={project.image || DUMMY_IMAGE_URL}
                                    alt={`Captura de pantalla de ${project.title}`}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="flex-1 w-full md:w-2/3">
                                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>
                                {project.created_at && (
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Creado el {formatDate(project.created_at)}</p>
                                )}
                                {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                                    <div className="mt-4 mb-4">
                                        <h4 className="text-base font-medium mb-2">Tecnologías utilizadas:</h4>
                                        <div className="flex flex-wrap gap-4">
                                            {project.technologies.map((tech, techIndex) => {
                                                const IconComponent = getTechIcon(tech);
                                                return IconComponent ? (
                                                    <div
                                                        key={techIndex}
                                                        className="flex flex-col items-center group transition-transform duration-200 hover:scale-125"
                                                    >
                                                        {IconComponent}
                                                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{tech}</span>
                                                    </div>
                                                ) : null;
                                            })}
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center space-x-4">
                                    {project.code_link && (
                                        <a
                                            href={project.code_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 border border-blue-500 px-3 py-1.5 rounded-full flex items-center space-x-1 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="size-5"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"></path>
                                            </svg>
                                            <span>Código</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
