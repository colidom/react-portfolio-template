import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

export default function Hero() {
    return (
        <section id="inicio" className="py-20 text-gray-900 dark:text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Hola, soy <span className="text-blue-500">Carlos Oliva</span>
                <br />
            </h1>
            <p className="mt-4 text-gray-400 text-lg">
                <span className="text-yellow-400 font-bold dark:text-yellow-500">Desarrollador de Software y Administrador de Sistemas</span>. Con
                experiencia en desarrollo web, gestión IT e IoT, he trabajado con tecnologías como PHP, JavaScript y Python, siempre buscando la
                innovación y el aprendizaje continuo.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                {/* Botón de LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/cjod/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 text-blue-500 border-2 border-blue-500 font-bold rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
                >
                    <FaLinkedin className="w-5 h-5" />
                    LinkedIn
                </a>

                {/* Botón de GitHub */}
                <a
                    href="https://github.com/colidom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 text-gray-500 border-2 border-gray-500 font-bold rounded-lg transition-all duration-300 hover:bg-gray-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
                >
                    <FaGithub className="w-5 h-5" />
                    GitHub
                </a>

                {/* Botón para descargar el CV */}
                <a
                    href="/cv.pdf"
                    download
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 text-green-500 border-2 border-green-500 font-bold rounded-lg transition-all duration-300 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
                >
                    <FaDownload className="w-5 h-5" />
                    Descargar CV
                </a>
            </div>
        </section>
    );
}
