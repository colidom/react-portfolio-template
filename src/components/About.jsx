import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

export default function About() {
    return (
        <section id="sobre-mi" className="mt-32">
            {/* Título e ícono de la sección */}
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <FaRegUserCircle className="size-5" />
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
                        className="w-full h-auto rounded-lg shadow-lg border-2 border-white dark:border-gray-800"
                    />
                </div>

                {/* Contenedor de la descripción */}
                <div className="w-full md:w-2/3">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 text-justify">
                        Desarrollador de software y administrador de sistemas con experiencia en desarrollo web, gestión de IT, Internet de las Cosas
                        (IoT) y análisis y soporte funcional de aplicaciones. He trabajado en proyectos de alto impacto utilizando tecnologías como{" "}
                        <span className="text-yellow-500 font-bold">PHP, JavaScript, Python</span>, y frameworks como{" "}
                        <span className="text-yellow-500 font-bold">Laravel, FastAPI</span> y{" "}
                        <span className="text-yellow-500 font-bold">Django</span>. También cuento con experiencia en soluciones de e-commerce con{" "}
                        <span className="text-yellow-500 font-bold">Prestashop</span> y <span className="text-yellow-500 font-bold">WooCommerce</span>
                        .
                    </p>
                    <p className="text-lg text-gray-700 dark:text-gray-300 text-justify">
                        En mi rol más reciente, me he centrado en el análisis y soporte funcional de aplicaciones, trabajando para que las soluciones
                        implementadas se ajusten a las necesidades del cliente. Combino conocimientos técnicos con una comunicación clara para
                        resolver incidencias y colaborar eficazmente en entornos dinámicos.
                    </p>
                </div>
            </div>
        </section>
    );
}
