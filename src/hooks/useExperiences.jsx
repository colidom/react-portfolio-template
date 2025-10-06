import { useState, useEffect } from "react";

export const getDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    const parts = [];
    if (years) parts.push(`${years} año${years > 1 ? "s" : ""}`);
    if (months) parts.push(`${months} mes${months > 1 ? "es" : ""}`);

    return parts.length ? parts.join(" y ") : "Menos de un mes";
};

export const formatDate = (dateString) => {
    if (!dateString) return "Actualmente";
    const date = new Date(dateString);
    const options = { year: "numeric", month: "short" };

    const formattedDate = date.toLocaleDateString("es-ES", options);
    const [month, year] = formattedDate.split(" ");
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1).replace(/\.$/, "") + ".";

    return `${capitalizedMonth} ${year}`;
};

// El custom hook
export const useExperiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiences/`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                // Ordenar las experiencias
                data.sort((a, b) => {
                    const aIsOngoing = !a.end_date;
                    const bIsOngoing = !b.end_date;

                    if (aIsOngoing && bIsOngoing) {
                        return new Date(b.start_date) - new Date(a.start_date);
                    }
                    if (aIsOngoing) return -1;
                    if (bIsOngoing) return 1;

                    return new Date(b.end_date) - new Date(a.end_date);
                });

                // Agrupar las experiencias ya ordenadas
                const groupedByCompany = data.reduce((acc, experience) => {
                    if (!acc[experience.company]) {
                        acc[experience.company] = {
                            company: experience.company,
                            projects: [],
                            latestEndDate: experience.end_date,
                            latestStartDate: new Date(experience.start_date),
                            hasMultipleWorkTypes: false,
                        };
                    }
                    acc[experience.company].projects.push(experience);
                    return acc;
                }, {});

                // Convertir el objeto a un array y calcular la duración
                const processedExperiences = Object.values(groupedByCompany).map((companyGroup) => {
                    const earliestProject = companyGroup.projects[companyGroup.projects.length - 1];
                    const latestProject = companyGroup.projects[0];
                    const totalDuration = getDuration(earliestProject.start_date, latestProject.end_date);
                    companyGroup.totalDuration = totalDuration;
                    companyGroup.hasMultipleWorkTypes = new Set(companyGroup.projects.map((exp) => exp.work_type)).size > 1;
                    return companyGroup;
                });

                setExperiences(processedExperiences);
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    return { experiences, loading, formatDate, getDuration };
};
