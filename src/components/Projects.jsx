// src/components/Projects.jsx
import React from "react";

// Datos de ejemplo para la sección de proyectos
const projectsData = [
    {
        title: "Proyecto 1",
        description:
            "Una descripción breve pero concisa de este proyecto. Explica su propósito, tecnologías principales y lo que se logró. Puedes extender esta descripción a 2-3 líneas para dar más detalles relevantes.",
        image: "https://dummyimage.com/600x400/000/fff", // Dummy image
        github: "https://github.com/tu-usuario/proyecto-1",
        website: "https://www.proyecto1.com",
    },
    {
        title: "Proyecto 2",
        description:
            "Este es el segundo proyecto. Se enfoca en [menciona el área] y utiliza tecnologías como [menciona tecnologías]. Destaca cualquier característica única o desafío superado.",
        image: "https://dummyimage.com/600x400/000/fff", // Dummy image
        github: "https://github.com/tu-usuario/proyecto-2",
        website: "https://www.proyecto2.com",
    },
    {
        title: "Proyecto 3",
        description:
            "El tercer proyecto es una aplicación [tipo de aplicación] que resuelve [problema]. Se construyó con [tecnología principal] y demuestra [habilidad o conocimiento].",
        image: "https://dummyimage.com/600x400/000/fff", // Dummy image
        github: "https://github.com/tu-usuario/proyecto-3",
        website: "https://www.proyecto3.com",
    },
];

export default function Projects() {
    return (
        <section id="proyectos" className="mt-32">
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full bg-white dark:bg-gray-950 flex items-center justify-center">
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

            <div className="space-y-16">
                {projectsData.map((project, index) => (
                    <article key={index} className="flex flex-col md:flex-row items-start gap-8 group">
                        <div className="flex-shrink-0 w-full md:w-1/3">
                            <img
                                src={project.image}
                                alt={`Captura de pantalla de ${project.title}`}
                                className="w-full h-auto rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="flex-1 w-full md:w-2/3">
                            <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

                            <div className="flex items-center space-x-4">
                                {/* Botón para el código de GitHub */}
                                <button
                                    onClick={() => window.open(project.github, "_blank", "noopener noreferrer")}
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

                                {/* Botón para la demo del proyecto */}
                                <button
                                    onClick={() => window.open(project.website, "_blank", "noopener noreferrer")}
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
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
