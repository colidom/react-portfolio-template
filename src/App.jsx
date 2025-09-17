import Header from "./components/Header";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import About from "./components/About";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-950 dark:to-gray-800 text-gray-900 dark:text-white min-h-screen">
            <Header />
            <Analytics />
            <SpeedInsights />
            <main className="flex-grow px-6 md:px-20 max-w-5xl mx-auto space-y-32 pt-20">
                <Hero />
                <Experience />
                <Projects />
                <About />
                <Footer />
            </main>
            <ScrollToTopButton />
        </div>
    );
}
