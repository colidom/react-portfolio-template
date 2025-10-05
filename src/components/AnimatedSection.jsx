import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * AnimatedSection - Wrapper component for scroll animations
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements to animate
 * @param {Object} props.variants - Framer Motion variants
 * @param {number} props.threshold - Intersection threshold (0-1)
 * @param {boolean} props.triggerOnce - Animate only once
 * @param {number} props.delay - Animation delay in seconds
 */
export default function AnimatedSection({ 
    children, 
    variants,
    threshold = 0.1,
    triggerOnce = true,
    delay = 0,
    className = ""
}) {
    const [ref, inView] = useInView({
        threshold,
        triggerOnce
    });

    const defaultVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay
            }
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants || defaultVariants}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * FadeIn - Simple fade in animation
 */
export function FadeIn({ children, delay = 0, duration = 0.6, className = "" }) {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * SlideIn - Slide in from direction
 */
export function SlideIn({ 
    children, 
    direction = 'up', 
    delay = 0, 
    duration = 0.6,
    className = "" 
}) {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const directions = {
        up: { y: 50 },
        down: { y: -50 },
        left: { x: 50 },
        right: { x: -50 }
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, ...directions[direction] }}
            animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * ScaleIn - Scale in animation
 */
export function ScaleIn({ children, delay = 0, duration = 0.5, className = "" }) {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerContainer - Container for staggered children animations
 */
export function StaggerContainer({ children, staggerDelay = 0.1, className = "" }) {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: 0.1
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * StaggerItem - Item for staggered animations
 */
export function StaggerItem({ children, className = "" }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                        duration: 0.5,
                        ease: "easeOut"
                    }
                }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
