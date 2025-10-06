import { useState, useEffect } from "react";

export const useHeroData = () => {
    const [heroData, setHeroData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasNoData, setHasNoData] = useState(false);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/hero/`);

                if (response.status === 404) {
                    setHasNoData(true);
                    setHeroData(null);
                } else if (!response.ok) {
                    throw new Error(`HTTP status: ${response.status}`);
                } else {
                    const data = await response.json();
                    if (!data || Object.keys(data).length === 0 || !data.name) {
                        setHeroData(null);
                        setHasNoData(true);
                    } else {
                        setHeroData(data);
                        setHasNoData(false);
                        document.title = `${data.name} | Portfolio`;
                    }
                }
            } catch (err) {
                console.error("Failed to fetch hero data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    return { heroData, loading, error, hasNoData };
};
