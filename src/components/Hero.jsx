export default function Hero() {
    return (
        <section className="py-20 text-gray-900 dark:text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Hola, soy <span className="text-blue-500">Carlos Oliva</span>
                <br />
            </h1>
            <p className="mt-4 text-gray-400 text-lg">
                <span className="text-yellow-500 font-bold dark:text-yellow-200">Desarrollador de Software y Administrador de Sistemas</span>. Con
                experiencia en desarrollo web, gestión IT e IoT, he trabajado con tecnologías como PHP, JavaScript y Python, siempre buscando la
                innovación y el aprendizaje continuo.
            </p>

            <a
                href="https://www.linkedin.com/in/cjod/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-4 py-2 text-blue-500 border-2 border-blue-500 font-bold rounded-lg transition-all duration-300 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                    <path d="M8 11l0 5"></path>
                    <path d="M8 8l0 .01"></path>
                    <path d="M12 16l0 -5"></path>
                    <path d="M16 16v-5"></path>
                    <path d="M16 11l0 5"></path>
                    <path d="M16 11a2 2 0 0 0 -2 -2a2 2 0 0 0 -2 2"></path>
                </svg>
                Ver perfil en LinkedIn
            </a>
        </section>
    );
}
