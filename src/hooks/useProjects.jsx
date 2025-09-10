import { useState, useEffect } from "react";

export const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

export const useProjects = () => {
    const [projectsData, setProjectsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/projects`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const sortedProjects = data.sort((a, b) => b.id - a.id);

                setProjectsData(sortedProjects);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return { projectsData, loading, error, formatDate };
};
