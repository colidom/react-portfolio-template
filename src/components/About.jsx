import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export default function About() {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const renderDescriptionWithHighlights = (description, keywords) => {
        if (!description || !keywords || keywords.length === 0) return description;

        let content = description;
        keywords.forEach((keyword) => {
            const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
            content = content.replace(regex, `<span class="text-yellow-500 font-bold">${keyword}</span>`);
        });

        return <p className="text-lg text-gray-700 dark:text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: content }}></p>;
    };

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/about-me`);
                const data = await response.json();

                if (data && data.description) {
                    setAboutData(data);
                } else {
                    setAboutData(null);
                }
            } catch (err) {
                console.error("Failed to fetch About Me data:", err);
                setAboutData(null);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

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
            ) : aboutData ? (
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
            ) : (
                <p className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido información.</p>
            )}
        </section>
    );
}
