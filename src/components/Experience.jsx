import React, { useState, useEffect, useRef } from "react";
import {
    SiPython,
    SiGit,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiSpring,
    SiHibernate,
    SiMqtt,
    SiPhp,
    SiWoocommerce,
    SiPrestashop,
    SiMysql,
    SiJquery,
    SiBootstrap,
} from "react-icons/si";
import { MdWorkOutline } from "react-icons/md";
import { BsQuestionLg } from "react-icons/bs";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaCloud, FaJava, FaGraduationCap } from "react-icons/fa";
import { IbmMq, FlowData, MessageQueue } from "@carbon/icons-react";
import { IoHardwareChip, IoFlask, IoTerminalSharp } from "react-icons/io5";

const techIcons = {
    Python: <SiPython className="size-4 text-blue-500" />,
    PostgreSQL: <BiLogoPostgresql className="size-6 text-blue-700" />,
    Git: <SiGit className="size-5 text-orange-600" />,
    HTML5: <SiHtml5 className="size-5 text-orange-600" />,
    CSS3: <SiCss3 className="size-5 text-blue-600" />,
    JavaScript: <SiJavascript className="size-4 text-yellow-400" />,
    Spring: <SiSpring className="size-5 text-green-500" />,
    JSP: <FaJava className="size-5 text-orange-400" />,
    Java: <FaJava className="size-5 text-red-700" />,
    Hibernate: <SiHibernate className="size-5 text-gray-700 dark:text-gray-300" />,
    MQTT: <SiMqtt className="size-4 text-purple-600" />,
    Scripting: <IoTerminalSharp className="size-5 text-gray-600 dark:text-gray-400" />,
    PHP: <SiPhp className="size-5 text-purple-600" />,
    WooCommerce: <SiWoocommerce className="size-10 text-purple-600" />,
    MySQL: <SiMysql className="size-5 text-blue-600" />,
    jQuery: <SiJquery className="size-5 text-blue-700" />,
    Bootstrap: <SiBootstrap className="size-5 text-purple-500" />,
    PrestaShop: <SiPrestashop className="size-5 text-red-600" />,
    REST: <FaCloud className="size-5 text-blue-500" />,
    SOAP: <FaCloud className="size-5 text-indigo-500" />,
    IoT: <IoHardwareChip className="size-5 text-green-700 dark:text-green-700" />,
    SOA: <FlowData size={20} className="text-gray-600 dark:text-gray-400" />,
    "IBM Integration Bus": <IbmMq size={20} className="text-blue-700" />,
    "WebSphere Message Broker": <MessageQueue size={20} className="text-blue-700" />,
    "Formación en TI": <FaGraduationCap className="size-5 text-yellow-500" />,
    "Innovación en Ciencia": <IoFlask className="size-5 text-lime-500" />,
};

const getTechIcon = (techName) => {
    return techIcons[techName] || <BsQuestionLg className="size-5 text-gray-400" />;
};

export default function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAllExperiences, setShowAllExperiences] = useState(false);
    const headingRef = useRef(null);
    const firstHiddenRef = useRef(null);

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
                    const dateA = parseDate(a.end_date);
                    const dateB = parseDate(b.end_date);
                    if (dateA - dateB !== 0) return dateB - dateA;
                    return parseDate(b.start_date) - parseDate(a.start_date);
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

    const handleToggleExperiences = () => {
        if (showAllExperiences) {
            // Si vamos a "Mostrar menos", primero hacemos scroll al encabezado
            if (headingRef.current) {
                headingRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            // Y luego, después de un retraso, ocultamos las experiencias adicionales
            setTimeout(() => {
                setShowAllExperiences(false);
            }, 300);
        } else {
            // Si vamos a "Mostrar más", mostramos las experiencias y luego hacemos scroll
            setShowAllExperiences(true);
            setTimeout(() => {
                if (firstHiddenRef.current) {
                    firstHiddenRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 300);
        }
    };

    const renderSkeletonLoader = () => (
        <div className="relative">
            <div className="absolute top-[-1.5rem] left-2 w-px h-[calc(100%+1.5rem)] bg-neutral-300 dark:bg-gray-700 md:left-1/3 md:ml-[-0.5px]"></div>
            {[...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col md:flex-row mb-10 relative animate-pulse">
                    <div className="absolute w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full left-0 mt-1.5 border border-white dark:border-gray-950 md:left-1/3 md:ml-[-0.5rem]"></div>
                    <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-2 md:ml-auto"></div>
                    </div>
                    <div className="md:w-2/3 md:pl-12 mt-2 md:mt-0 pl-8">
                        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                            <div className="h-6 w-10 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    const experiencesToShow = showAllExperiences ? experiences : experiences.slice(0, 3);
    const showToggleButton = experiences.length > 3;

    return (
        <section id="experiencia" className="mt-32">
            <div className="flex items-center mb-8">
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <MdWorkOutline className="size-5" />
                </div>
                <h2 ref={headingRef} className="text-3xl font-bold">
                    Experiencia laboral
                </h2>
            </div>
            {loading ? (
                renderSkeletonLoader()
            ) : experiences.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido experiencias laborales.</div>
            ) : (
                <div className="relative">
                    <div className="absolute top-[-1.5rem] left-2 w-px h-[calc(100%+1.5rem)] bg-neutral-300 dark:bg-gray-700 md:left-1/3 md:ml-[-0.5px]"></div>
                    {experiencesToShow.map((job, index) => (
                        <div
                            key={index}
                            className="flex flex-col md:flex-row mb-10 relative"
                            ref={(el) => {
                                if (index === 3) {
                                    firstHiddenRef.current = el;
                                }
                            }}
                        >
                            <div className="absolute w-4 h-4 bg-blue-400 rounded-full left-0 mt-1.5 border border-white dark:border-gray-950 transition-transform duration-200 hover:scale-125 md:left-1/3 md:ml-[-0.5rem]"></div>
                            <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                                <time className="text-sm text-gray-500 dark:text-gray-400">
                                    {job.start_date} - {job.end_date.toLowerCase().includes("actual") ? "Actualmente" : job.end_date}
                                </time>
                            </div>
                            <div className="md:w-2/3 md:pl-12 mt-2 md:mt-0 pl-8">
                                <h3 className="text-xl font-semibold">{job.job_title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                                <p className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">{job.description}</p>
                                {job.technologies && Array.isArray(job.technologies) && job.technologies.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {job.technologies.map((tech, techIndex) => {
                                            const IconComponent = getTechIcon(tech);
                                            return IconComponent ? (
                                                <div
                                                    key={techIndex}
                                                    className="relative flex items-center justify-center transition-transform duration-200 group hover:scale-125"
                                                >
                                                    {React.cloneElement(IconComponent, {
                                                        className: IconComponent.props.className || "",
                                                    })}
                                                    <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-gray-700 text-white text-xs rounded-md whitespace-nowrap">
                                                        {tech}
                                                    </span>
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showToggleButton && (
                <div className="mt-8 text-center">
                    <button
                        onClick={handleToggleExperiences}
                        className="flex items-center justify-center mx-auto text-blue-500 font-semibold px-4 py-2 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                    >
                        {showAllExperiences ? "Mostrar menos" : "Mostrar más"}
                        <span className={`ml-2 transform transition-transform duration-300 ${showAllExperiences ? "rotate-180" : ""}`}>&#x25BC;</span>
                    </button>
                </div>
            )}
        </section>
    );
}
