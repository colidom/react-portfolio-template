// src/components/About.jsx
import React from "react";

export default function About() {
    return (
        <section id="sobre-mi" className="mt-32">
            {/* Título e ícono de la sección */}
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full bg-white dark:bg-gray-950 flex items-center justify-center">
                    <svg
                        className="size-8"
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
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold">Sobre mí</h2>
            </div>

            {/* Contenedor principal de la sección */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Contenedor de la imagen */}
                <div className="w-full md:w-1/3 flex-shrink-0">
                    <img
                        src="https://dummyimage.com/300x300/e0e0e0/000000&text=Foto+de+Perfil"
                        alt="Foto de perfil"
                        className="w-full h-auto rounded-lg shadow-lg rotate-2 border-2 border-white dark:border-gray-800"
                    />
                </div>

                {/* Contenedor de la descripción */}
                <div className="w-full md:w-2/3">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Hola, soy [Tu Nombre], un desarrollador fullstack con experiencia en la creación de aplicaciones web robustas y escalables. Me
                        especializo en el ecosistema de [Tecnología Principal] en el backend y [Tecnología Frontend] para las interfaces de usuario.
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                        Me apasiona resolver problemas complejos y me esfuerzo por escribir código limpio, eficiente y mantenible. He trabajado en
                        proyectos que van desde APIs RESTful hasta interfaces de usuario interactivas, siempre con el objetivo de ofrecer una
                        excelente experiencia de usuario.
                    </p>
                </div>
            </div>
        </section>
    );
}
