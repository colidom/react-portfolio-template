import { useEffect } from "react";

const SEO_DEFAULTS = {
    title: "Colidom - Desarrollador Full Stack | Portfolio Profesional",
    description:
        "Portfolio profesional de Colidom, desarrollador full stack especializado en React, Node.js y tecnologías modernas. Explora mis proyectos, experiencia y habilidades técnicas.",
    keywords:
        "Colidom, desarrollador full stack, portfolio, react, node.js, javascript, typescript, desarrollo web, programador, diseño web, frontend, backend",
    author: "Colidom",
    siteUrl: "https://colidom.vercel.app",
    image: "/avatar.png",
    type: "website",
    locale: "es_ES",
};

export default function SEO({ title, description, keywords, image, url, type, author }) {
    const seoTitle = title ? `${title} | ${SEO_DEFAULTS.title}` : SEO_DEFAULTS.title;
    const seoDescription = description || SEO_DEFAULTS.description;
    const seoKeywords = keywords || SEO_DEFAULTS.keywords;
    const seoImage = image || `${SEO_DEFAULTS.siteUrl}${SEO_DEFAULTS.image}`;
    const seoUrl = url || SEO_DEFAULTS.siteUrl;
    const seoAuthor = author || SEO_DEFAULTS.author;
    const seoType = type || SEO_DEFAULTS.type;

    useEffect(() => {
        // Update document title
        document.title = seoTitle;

        // Update or create meta tags
        const updateMetaTag = (name, content, property = false) => {
            const attribute = property ? "property" : "name";
            let element = document.querySelector(`meta[${attribute}="${name}"]`);

            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        };

        // Primary Meta Tags
        updateMetaTag("description", seoDescription);
        updateMetaTag("keywords", seoKeywords);
        updateMetaTag("author", seoAuthor);
        updateMetaTag("robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");
        updateMetaTag("googlebot", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

        // Open Graph / Facebook
        updateMetaTag("og:type", seoType, true);
        updateMetaTag("og:url", seoUrl, true);
        updateMetaTag("og:title", seoTitle, true);
        updateMetaTag("og:description", seoDescription, true);
        updateMetaTag("og:image", seoImage, true);
        updateMetaTag("og:locale", SEO_DEFAULTS.locale, true);
        updateMetaTag("og:site_name", "Portfolio Colidom", true);

        // Twitter
        updateMetaTag("twitter:card", "summary_large_image");
        updateMetaTag("twitter:url", seoUrl);
        updateMetaTag("twitter:title", seoTitle);
        updateMetaTag("twitter:description", seoDescription);
        updateMetaTag("twitter:image", seoImage);
        updateMetaTag("twitter:creator", "@colidom");

        // Update canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.setAttribute("rel", "canonical");
            document.head.appendChild(canonical);
        }
        canonical.setAttribute("href", seoUrl);

        // Update theme color
        let themeColor = document.querySelector('meta[name="theme-color"]');
        if (!themeColor) {
            themeColor = document.createElement("meta");
            themeColor.setAttribute("name", "theme-color");
            document.head.appendChild(themeColor);
        }
        themeColor.setAttribute("content", "#1F2937");

        // Structured Data (JSON-LD)
        const structuredData = {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Colidom",
            jobTitle: "Desarrollador Full Stack",
            url: seoUrl,
            image: seoImage,
            description: seoDescription,
            sameAs: ["https://github.com/colidom", "https://linkedin.com/in/cjod"],
            knowsAbout: ["React", "Node.js", "JavaScript", "TypeScript", "Desarrollo Web", "Full Stack Development"],
        };

        // Add or update JSON-LD script
        let script = document.querySelector('script[type="application/ld+json"]');
        if (!script) {
            script = document.createElement("script");
            script.setAttribute("type", "application/ld+json");
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(structuredData);
    }, [seoTitle, seoDescription, seoKeywords, seoImage, seoUrl, seoAuthor, seoType]);

    return null; // Este componente no renderiza nada visual
}
