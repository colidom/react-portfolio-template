import { useState, useEffect } from "react";

const renderDescriptionWithHighlights = (description, keywords) => {
    if (!description || !keywords || keywords.length === 0) return description;

    let content = description;
    keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b(${keyword})\\b`, "gi");
        content = content.replace(regex, `<span class="text-yellow-500 font-bold">${keyword}</span>`);
    });

    return <p className="text-lg text-gray-700 dark:text-gray-300 text-justify" dangerouslySetInnerHTML={{ __html: content }}></p>;
};

export const useAboutData = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasNoData, setHasNoData] = useState(false);

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/about-me/`);

                if (response.status === 404) {
                    setHasNoData(true);
                    setAboutData(null);
                } else if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                } else {
                    const data = await response.json();
                    if (data && data.description) {
                        setAboutData(data);
                        setHasNoData(false);
                    } else {
                        setAboutData(null);
                        setHasNoData(true);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch About Me data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchAboutData();
    }, []);

    return { aboutData, loading, error, hasNoData, renderDescriptionWithHighlights };
};
