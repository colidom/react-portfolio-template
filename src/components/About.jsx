import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useAboutData } from "../hooks/useAboutData";

const renderSkeletonLoader = () => (
    <div className="flex flex-col md:flex-row gap-8 items-start rounded-lg p-6 animate-pulse">
        <div className="flex-shrink-0 w-full md:w-1/3 h-48 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
        <div className="flex-1 w-full md:w-2/3">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-4"></div>
        </div>
    </div>
);

export default function About() {
    const { aboutData, loading, error, hasNoData, renderDescriptionWithHighlights } = useAboutData();

    return (
        <section id="sobre-mi" className="mt-32">
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <FaRegUserCircle className="size-5" />
                </div>
                <h2 className="text-3xl font-bold">Sobre mí</h2>
            </div>
            {loading ? (
                renderSkeletonLoader()
            ) : error ? (
                <p className="text-center text-red-500 dark:text-red-400">Error al cargar la información.</p>
            ) : hasNoData ? (
                <p className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido información.</p>
            ) : (
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <img
                            src={aboutData.profile_image}
                            alt="Foto de perfil"
                            className="w-full h-auto rounded-lg shadow-lg border-2 border-white dark:border-gray-800"
                        />
                    </div>
                    <div className="w-full md:w-2/3">{renderDescriptionWithHighlights(aboutData.description, aboutData.keywords_to_highlight)}</div>
                </div>
            )}
        </section>
    );
}
