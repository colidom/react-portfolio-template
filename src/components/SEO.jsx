import { useEffect } from 'react';

const SEO_DEFAULTS = {
    title: "Portfolio - Desarrollador Full Stack",
    description: "Portfolio profesional de desarrollador full stack. Explora mis proyectos, experiencia y habilidades técnicas.",
    keywords: "desarrollador, full stack, portfolio, react, node, javascript",
    author: "Tu Nombre",
    siteUrl: "https://tu-portfolio.com",
    image: "/og-image.jpg"
};

export default function SEO({ 
    title, 
    description, 
    keywords, 
    image, 
    url,
    type = 'website',
    author 
}) {
    const seoTitle = title ? `${title} | ${SEO_DEFAULTS.title}` : SEO_DEFAULTS.title;
    const seoDescription = description || SEO_DEFAULTS.description;
    const seoKeywords = keywords || SEO_DEFAULTS.keywords;
    const seoImage = image || `${SEO_DEFAULTS.siteUrl}${SEO_DEFAULTS.image}`;
    const seoUrl = url || SEO_DEFAULTS.siteUrl;
    const seoAuthor = author || SEO_DEFAULTS.author;

    useEffect(() => {
        // Update document title
        document.title = seoTitle;

        // Update or create meta tags
        const updateMetaTag = (name, content, property = false) => {
            const attribute = property ? 'property' : 'name';
            let element = document.querySelector(`meta[${attribute}="${name}"]`);
            
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        // Primary Meta Tags
        updateMetaTag('description', seoDescription);
        updateMetaTag('keywords', seoKeywords);
        updateMetaTag('author', seoAuthor);

        // Open Graph / Facebook
        updateMetaTag('og:type', type, true);
        updateMetaTag('og:url', seoUrl, true);
        updateMetaTag('og:title', seoTitle, true);
        updateMetaTag('og:description', seoDescription, true);
        updateMetaTag('og:image', seoImage, true);

        // Twitter
        updateMetaTag('twitter:card', 'summary_large_image');
        updateMetaTag('twitter:url', seoUrl);
        updateMetaTag('twitter:title', seoTitle);
        updateMetaTag('twitter:description', seoDescription);
        updateMetaTag('twitter:image', seoImage);

        // Additional SEO
        updateMetaTag('robots', 'index, follow');
        updateMetaTag('googlebot', 'index, follow');

        // Update canonical link
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', seoUrl);

        // Update theme color
        let themeColor = document.querySelector('meta[name="theme-color"]');
        if (!themeColor) {
            themeColor = document.createElement('meta');
            themeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(themeColor);
        }
        themeColor.setAttribute('content', '#1F2937');

    }, [seoTitle, seoDescription, seoKeywords, seoImage, seoUrl, seoAuthor, type]);

    return null; // Este componente no renderiza nada visual
}
