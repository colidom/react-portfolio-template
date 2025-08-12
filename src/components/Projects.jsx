import React, { useState, useEffect } from "react";

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

                // Ordenar los proyectos por la fecha de creación de forma descendente
                const sortedProjects = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

                setProjectsData(sortedProjects);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
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

    return (
        <section id="proyectos" className="mt-32">
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <svg
                        className="size-8 text-gray-800 dark:text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M7 8l-4 4l4 4"></path>
                        <path d="M17 8l4 4l-4 4"></path>
                        <path d="M14 4l-4 16"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold">Proyectos</h2>
            </div>

            {loading ? (
                <div className="text-center">Cargando proyectos...</div>
            ) : projectsData.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido proyectos.</div>
            ) : (
                <div className="space-y-16">
                    {projectsData.map((project, index) => (
                        <article key={project.id || index} className="flex flex-col md:flex-row items-start gap-8 group">
                            <div className="flex-shrink-0 w-full md:w-1/3">
                                <img
                                    src={project.image || DUMMY_IMAGE_URL}
                                    alt={`Captura de pantalla de ${project.title}`}
                                    className="w-full h-auto rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="flex-1 w-full md:w-2/3">
                                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-2">{project.description}</p>

                                {project.created_at && (
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">Creado el {formatDate(project.created_at)}</p>
                                )}

                                {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center space-x-4">
                                    {project.code_link && (
                                        <button
                                            onClick={() => window.open(project.code_link, "_blank", "noopener noreferrer")}
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
                                        </button>
                                    )}
                                    {project.demo_link && (
                                        <button
                                            onClick={() => window.open(project.demo_link, "_blank", "noopener noreferrer")}
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
                                                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                                <path d="M3.6 9h16.8"></path>
                                                <path d="M3.6 15h16.8"></path>
                                                <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                                                <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                                            </svg>
                                            <span>Ver Demo</span>
                                        </button>
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
