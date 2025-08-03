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
                        src="/avatar.jpg"
                        alt="Foto de perfil"
                        className="w-full h-auto rounded-lg shadow-lg rotate-2 border-2 border-white dark:border-gray-800"
                    />
                </div>

                {/* Contenedor de la descripción */}
                <div class="w-full md:w-2/3">
                    <p class="text-lg text-gray-700 dark:text-gray-300 mb-4 text-justify">
                        Soy <strong>Carlos Oliva</strong>, un desarrollador de software y administrador de sistemas con experiencia en desarrollo web,
                        gestión de IT e Internet de las Cosas (IoT). He trabajado en proyectos de alto impacto utilizando tecnologías como{" "}
                        <span class="text-yellow-500 font-bold">PHP, JavaScript, Python</span>, y frameworks como{" "}
                        <span class="text-yellow-500 font-bold">Laravel, FastAPI</span>, y <span class="text-yellow-500 font-bold">Django</span>.
                        También tengo experiencia con soluciones de e-commerce en{" "}
                        <span class="text-yellow-500 font-bold">Prestashop y WooCommerce</span>.
                    </p>
                    <p class="text-lg text-gray-700 dark:text-gray-300 text-justify">
                        Mi rol más reciente se ha enfocado en el soporte funcional y el análisis de aplicaciones, con el objetivo de asegurar que las
                        soluciones entregadas superen las expectativas del cliente. Combino mis habilidades técnicas con una comunicación efectiva
                        para resolver problemas y aportar valor en entornos dinámicos y desafiantes.
                    </p>
                </div>
            </div>
        </section>
    );
}
