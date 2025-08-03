import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
    return (
        <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
            <Header />
            <main className="px-6 md:px-20 max-w-5xl mx-auto space-y-32 pt-20">
                <Hero />
                <Experience />
                <Projects />
                <About />
                <Footer />
                <SpeedInsights />
            </main>
        </div>
    );
}
