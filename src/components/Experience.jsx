// src/components/Experience.jsx
import React from "react";

// Datos de ejemplo para la sección de experiencia
const experienceData = [
    {
        company: "Nombre de la Empresa",
        title: "Desarrollador Fullstack",
        period: "Mar 2023 - Presente",
        tasks: [
            "Diseño e implementación de APIs RESTful usando FastAPI.",
            "Creación de interfaces de usuario interactivas con React y Tailwind CSS.",
            "Gestión de bases de datos relacionales y optimización de consultas.",
            "Colaboración en metodologías ágiles (Scrum) para el desarrollo del proyecto.",
        ],
    },
    {
        company: "Otra Empresa Tech",
        title: "Desarrollador Frontend",
        period: "Ene 2021 - Feb 2023",
        tasks: [
            "Desarrollo de componentes reutilizables con React.",
            "Integración de diseños de Figma en código funcional.",
            "Mejora del rendimiento y la accesibilidad del sitio web.",
        ],
    },
    {
        company: "Agencia de Diseño Web",
        title: "Desarrollador Junior",
        period: "Jul 2019 - Dic 2020",
        tasks: ["Mantenimiento y actualización de sitios web de clientes.", "Uso de HTML, CSS y JavaScript para proyectos pequeños."],
    },
];

export default function Experience() {
    return (
        <section id="experiencia" className="mt-32">
            {/* Título e ícono de la sección */}
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full bg-white dark:bg-gray-950">
                    <svg
                        class="size-8"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                        <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
                        <path d="M12 12l0 .01"></path>
                        <path d="M3 13a20 20 0 0 0 18 0"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold">Experiencia laboral</h2>
            </div>

            {/* Contenedor principal de la línea de tiempo */}
            <div className="relative">
                {/* Línea vertical. Ahora se posiciona de forma más precisa para móvil y escritorio */}
                <div className="absolute top-[-1.5rem] left-2 w-px h-[calc(100%+1.5rem)] bg-neutral-300 dark:bg-gray-700 md:left-1/3 md:ml-[-0.5px]"></div>

                {/* Mapeo de la experiencia */}
                {experienceData.map((job, index) => (
                    <div key={index} className="flex flex-col md:flex-row mb-10 relative group">
                        {/* Círculo de la línea de tiempo */}
                        <div className="absolute w-4 h-4 bg-blue-400 rounded-full left-0 mt-1.5 border border-white dark:border-gray-950 group-hover:scale-125 transition-transform duration-200 md:left-1/3 md:ml-[-0.5rem]"></div>

                        {/* Columna de las fechas */}
                        <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                            <time className="text-sm text-gray-500 dark:text-gray-400">{job.period}</time>
                        </div>

                        {/* Columna de los detalles */}
                        <div className="md:w-2/3 md:pl-12 mt-2 md:mt-0 pl-8">
                            <h3 className="text-xl font-semibold">{job.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                            <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700 dark:text-gray-300">
                                {job.tasks.map((task, taskIndex) => (
                                    <li key={taskIndex}>{task}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
