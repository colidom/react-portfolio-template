import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";
import { BsQuestionLg } from "react-icons/bs";

const iconMapping = {
    FaLinkedin: FaLinkedin,
    FaGithub: FaGithub,
    FaDownload: FaDownload,
    generic: BsQuestionLg,
};

export default function Hero() {
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasNoData, setHasNoData] = useState(false);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/hero`);

                if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                }

                const data = await response.json();

                if (!data || Object.keys(data).length === 0 || !data.name) {
                    setHeroData(null);
                    setHasNoData(true);
                } else {
                    setHeroData(data);
                    setHasNoData(false);
                }
            } catch (err) {
                console.error("Failed to fetch hero data:", err);
                setError(err);
                setHasNoData(false);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    const renderSkeleton = (message) => (
        <div className="py-20 text-gray-900 dark:text-white">
            <div className="animate-pulse">
                {/* Skeleton para el texto principal */}
                <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-6"></div>

                {/* Skeleton para un solo botón */}
                <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                    <div className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700">
                        <div className="w-5 h-5 bg-gray-400 dark:bg-gray-600 rounded-full"></div> {/* Icono placeholder */}
                        <div className="h-4 w-24 bg-gray-400 dark:bg-gray-600 rounded"></div> {/* Texto placeholder */}
                    </div>
                </div>
            </div>
            {message && <div className="mt-4 text-center text-gray-500 dark:text-gray-400">{message}</div>}
        </div>
    );

    if (loading) {
        return <section id="inicio">{renderSkeleton()}</section>;
    }

    if (error || hasNoData) {
        return <section id="inicio">{renderSkeleton("No se pudo cargar la información. Revisa la conexión con la API.")}</section>;
    }

    return (
        <section id="inicio" className="py-20 text-gray-900 dark:text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Hola, soy <span className="text-blue-500">{heroData.name}</span>
                <br />
            </h1>
            <p className="mt-4 text-gray-400 text-lg">
                <span className="text-yellow-400 font-bold dark:text-yellow-500">{heroData.title}</span>. {heroData.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                {heroData.social_links &&
                    heroData.social_links.map((link, index) => {
                        const IconComponent = iconMapping[link.icon] || iconMapping.generic;
                        const downloadAttribute = link.name === "Descargar CV" ? "download" : "";

                        return (
                            <a
                                key={index}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                download={downloadAttribute}
                                className={`
                                inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2
                                font-bold rounded-lg transition-all duration-300 hover:text-white
                                focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-950
                                ${
                                    link.name === "LinkedIn"
                                        ? "text-blue-500 border-2 border-blue-500 hover:bg-blue-500 focus:ring-blue-500"
                                        : link.name === "GitHub"
                                        ? "text-gray-500 border-2 border-gray-500 hover:bg-gray-500 focus:ring-gray-500"
                                        : "text-green-500 border-2 border-green-500 hover:bg-green-500 focus:ring-green-500"
                                }
                                `}
                            >
                                {IconComponent && <IconComponent className="w-5 h-5" />}
                                {link.name}
                            </a>
                        );
                    })}
            </div>
        </section>
    );
}
