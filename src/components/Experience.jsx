import React, { useState, useEffect } from "react";
import {
    SiReact,
    SiTailwindcss,
    SiPython,
    SiPostgresql,
    SiVercel,
    SiRender,
    SiGit,
    SiGithub,
    SiDocker,
    SiHtml5,
    SiCss3,
    SiJavascript,
    SiFastapi,
    SiSqlalchemy,
    SiJsonwebtokens,
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
import { FaCode, FaCloud, FaJava, FaGraduationCap } from "react-icons/fa";
import { IoHardwareChip, IoFlask } from "react-icons/io5";
import { BsQuestionLg } from "react-icons/bs";
import { MdWork } from "react-icons/md";
import { IbmMq, FlowData, MessageQueue } from "@carbon/icons-react";

const techIcons = {
    React: <SiReact className="size-5" />,
    TailwindCSS: <SiTailwindcss className="size-5" />,
    Python: <SiPython className="size-5" />,
    PostgreSQL: <SiPostgresql className="size-5" />,
    Vercel: <SiVercel className="size-5" />,
    Render: <SiRender className="size-5" />,
    Git: <SiGit className="size-5" />,
    GitHub: <SiGithub className="size-5" />,
    Docker: <SiDocker className="size-5" />,
    HTML5: <SiHtml5 className="size-5" />,
    CSS3: <SiCss3 className="size-5" />,
    JavaScript: <SiJavascript className="size-5" />,
    FastAPI: <SiFastapi className="size-5" />,
    SQLAlchemy: <SiSqlalchemy className="size-5" />,
    JWT: <SiJsonwebtokens className="size-5" />,
    Spring: <SiSpring className="size-5" />,
    JSP: <FaJava className="size-5" />,
    Java: <FaJava className="size-5" />,
    Hibernate: <SiHibernate className="size-5" />,
    MQTT: <SiMqtt className="size-5" />,
    Scripting: <FaCode className="size-5" />,
    PHP: <SiPhp className="size-5" />,
    WooCommerce: <SiWoocommerce className="size-5" />,
    MySQL: <SiMysql className="size-5" />,
    SiPostgresql: <SiPostgresql className="size-5" />,
    jQuery: <SiJquery className="size-5" />,
    Bootstrap: <SiBootstrap className="size-5" />,
    PrestaShop: <SiPrestashop className="size-5" />,
    REST: <FaCloud className="size-5" />,
    SOAP: <FaCloud className="size-5" />,
    IoT: <IoHardwareChip className="size-5" />,
    SOA: <FlowData size={20} />,
    "IBM Integration Bus": <IbmMq size={20} />,
    "WebSphere Message Broker": <MessageQueue size={20} />,
    "Formación en TI": <FaGraduationCap className="size-5" />,
    "Innovación en Ciencia": <IoFlask className="size-5" />,
};

const getTechIcon = (techName) => {
    return techIcons[techName] || <BsQuestionLg className="size-5 text-gray-400" />;
};

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

    return (
        <section id="experiencia" className="mt-32">
            {" "}
            <div className="flex items-center mb-8">
                {" "}
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <MdWork className="size-5" />{" "}
                </div>
                <h2 className="text-3xl font-bold">Experiencia laboral</h2>{" "}
            </div>{" "}
            {loading ? (
                <div className="text-center">Cargando experiencias...</div>
            ) : experiences.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400">Aún no has añadido experiencias laborales.</div>
            ) : (
                <div className="relative">
                    {" "}
                    <div className="absolute top-[-1.5rem] left-2 w-px h-[calc(100%+1.5rem)] bg-neutral-300 dark:bg-gray-700 md:left-1/3 md:ml-[-0.5px]"></div>{" "}
                    {experiences.map((job, index) => (
                        <div key={index} className="flex flex-col md:flex-row mb-10 relative">
                            {" "}
                            <div className="absolute w-4 h-4 bg-blue-400 rounded-full left-0 mt-1.5 border border-white dark:border-gray-950 transition-transform duration-200 md:left-1/3 md:ml-[-0.5rem]"></div>{" "}
                            <div className="md:w-1/3 text-left md:text-right md:pr-12 pl-8">
                                {" "}
                                <time className="text-sm text-gray-500 dark:text-gray-400">
                                    {job.start_date} - {job.end_date.toLowerCase().includes("actual") ? "Actualmente" : job.end_date}{" "}
                                </time>{" "}
                            </div>{" "}
                            <div className="md:w-2/3 md:pl-12 mt-2 md:mt-0 pl-8">
                                <h3 className="text-xl font-semibold">{job.job_title}</h3>
                                <p className="text-gray-600 dark:text-gray-400">{job.company}</p>{" "}
                                <p className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">{job.description}</p>{" "}
                                {job.technologies && Array.isArray(job.technologies) && job.technologies.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-3">
                                        {" "}
                                        {job.technologies.map((tech, techIndex) => {
                                            const IconComponent = getTechIcon(tech);
                                            return IconComponent ? (
                                                <div
                                                    key={techIndex}
                                                    className="relative flex items-center justify-center transition-colors duration-200 group"
                                                >
                                                    {" "}
                                                    {React.cloneElement(IconComponent, {
                                                        className: `${IconComponent.props.className} hover:text-blue-500`,
                                                    })}{" "}
                                                    <span className="absolute bottom-full mb-2 hidden group-hover:block px-2 py-1 bg-gray-700 text-white text-xs rounded-md whitespace-nowrap">
                                                        {tech}{" "}
                                                    </span>{" "}
                                                </div>
                                            ) : null;
                                        })}{" "}
                                    </div>
                                )}{" "}
                            </div>{" "}
                        </div>
                    ))}{" "}
                </div>
            )}{" "}
        </section>
    );
}
