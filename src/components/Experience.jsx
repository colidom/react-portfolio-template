import React, { useState, useEffect } from "react";

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/experiences`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();

                const parseDate = (dateString) => {
                    const normalizedDate = dateString.toLowerCase();
                    if (normalizedDate.includes("actualidad") || normalizedDate.includes("actualmente")) {
                        return new Date(2100, 0, 1);
                    }
                    const [monthStr, yearStr] = dateString.split(" ");
                    const months = {
                        enero: 0,
                        febrero: 1,
                        marzo: 2,
                        abril: 3,
                        mayo: 4,
                        junio: 5,
                        julio: 6,
                        agosto: 7,
                        septiembre: 8,
                        octubre: 9,
                        noviembre: 10,
                        diciembre: 11,
                        "ene.": 0,
                        "feb.": 1,
                        "mar.": 2,
                        "abr.": 3,
                        "may.": 4,
                        "jun.": 5,
                        "jul.": 6,
                        "ago.": 7,
                        "sep.": 8,
                        "oct.": 9,
                        "nov.": 10,
                        "dic.": 11,
                    };
                    const monthIndex = months[monthStr.toLowerCase().replace(".", "")];
                    const year = parseInt(yearStr);

                    if (isNaN(monthIndex) || isNaN(year)) {
                        console.error("Failed to parse date:", dateString);
                        return new Date(0);
                    }
                    return new Date(year, monthIndex, 1);
                };

                const sortedData = data.sort((a, b) => {
                    const endA = a.end_date.toLowerCase();
                    const endB = b.end_date.toLowerCase();

                    const isCurrentA = endA.includes("actualidad") || endA.includes("actualmente");
                    const isCurrentB = endB.includes("actualidad") || endB.includes("actualmente");

                    // Si ambos trabajos están en curso, los ordenamos por la fecha de inicio
                    if (isCurrentA && isCurrentB) {
                        const dateA = parseDate(a.start_date);
                        const dateB = parseDate(b.start_date);
                        return dateB - dateA; // ✅ Del más reciente al más antiguo
                    }

                    // Si solo uno está en curso, ese va primero
                    if (isCurrentA) return -1;
                    if (isCurrentB) return 1;

                    // Si ninguno está en curso, los ordenamos por la fecha de finalización
                    const dateA = parseDate(endA);
                    const dateB = parseDate(endB);
                    return dateB - dateA;
                });

                setExperiences(sortedData);
            } catch (error) {
                console.error("Failed to fetch experiences:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    return (
        <section id="experiencia" className="mt-32">
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
                        <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                        <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
                        <path d="M12 12l0 .01"></path>
                        <path d="M3 13a20 20 0 0 0 18 0"></path>
                    </svg>
                </div>
                <h2 className="text-3xl font-bold">Experiencia laboral</h2>
            </div>

            {loading ? (
                <div className="text-center">Cargando experiencias...</div>
            ) : experiences.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido experiencias laborales.</div>
            ) : (
                <div className="relative">
                    {/* Línea vertical */}
                    <div className="absolute top-[-1.5rem] left-2 w-px h-[calc(100%+1.5rem)] bg-neutral-300 dark:bg-gray-700 md:left-1/3 md:ml-[-0.5px]"></div>

                    {/* Mapeo de la experiencia */}
                    {experiences.map((job, index) => (
                        <div key={index} className="flex flex-col md:flex-row mb-10 relative group">
                            {/* Círculo de la línea de tiempo */}
                            <div className="absolute w-4 h-4 bg-blue-400 rounded-full left-0 mt-1.5 border border-white dark:border-gray-950 group-hover:scale-125 transition-transform duration-200 md:left-1/3 md:ml-[-0.5rem]"></div>

                            {/* Columna de las fechas */}
                            <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                                <time className="text-sm text-gray-500 dark:text-gray-400">
                                    {job.start_date} - {job.end_date.toLowerCase() === "actualidad" ? "Actualmente" : job.end_date}
                                </time>
                            </div>

                            {/* Columna de los detalles */}
                            <div className="md:w-2/3 md:pl-12 mt-2 md:mt-0 pl-8">
                                <h3 className="text-xl font-semibold">{job.job_title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                                <p className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">{job.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
