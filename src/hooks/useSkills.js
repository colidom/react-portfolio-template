import { useState, useEffect } from 'react';
import skillsData from '../data/skills.json';

export const useSkills = () => {
    const [skills, setSkills] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSkills = () => {
            try {
                setLoading(true);
                
                // Simular un pequeño delay para mostrar el loading
                setTimeout(() => {
                    if (skillsData && Array.isArray(skillsData)) {
                        setSkills(skillsData);
                        
                        // Extract unique categories
                        const uniqueCategories = [...new Set(
                            skillsData
                                .map(skill => skill.category)
                                .filter(Boolean)
                        )];
                        setCategories(uniqueCategories);
                    } else {
                        setSkills([]);
                        setCategories([]);
                    }
                    
                    setError(null);
                    setLoading(false);
                }, 300);
            } catch (err) {
                console.error('Error loading skills:', err);
                setError(err.message);
                setSkills([]);
                setCategories([]);
                setLoading(false);
            }
        };

        loadSkills();
    }, []);

    // Calculate statistics
    const stats = {
        total: skills.length,
        categoriesCount: categories.length,
        averageLevel: skills.length > 0 
            ? Math.round(skills.reduce((acc, s) => acc + s.level, 0) / skills.length)
            : 0,
        maxYears: skills.length > 0 
            ? Math.max(...skills.map(s => s.years))
            : 0
    };

    return { skills, categories, loading, error, stats };
};
