import React, { useState } from "react";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { SlideIn, FadeIn } from "./AnimatedSection";
import { isValidEmail } from "../utils/helpers";

const contactInfo = [
    {
        icon: MdEmail,
        label: "Email",
        value: "colidom@outlook.com",
        href: "mailto:colidom@outlook.com",
    },
    /* {
        icon: MdPhone,
        label: "Teléfono",
        value: "+34 XXX XXX XXX",
        href: "tel:+34XXXXXXXXX"
    }, */
    {
        icon: MdLocationOn,
        label: "Ubicación",
        value: "Madrid, España",
        href: null,
    },
];

const socialLinks = [
    {
        icon: FaLinkedin,
        label: "LinkedIn",
        href: "https://linkedin.com",
        color: "hover:text-blue-600",
    },
    {
        icon: FaGithub,
        label: "GitHub",
        href: "https://github.com",
        color: "hover:text-gray-600 dark:hover:text-gray-400",
    },
    {
        icon: FaTwitter,
        label: "Twitter",
        href: "https://twitter.com",
        color: "hover:text-blue-400",
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es requerido";
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es requerido";
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = "Email inválido";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "El asunto es requerido";
        }

        if (!formData.message.trim()) {
            newErrors.message = "El mensaje es requerido";
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "El mensaje debe tener al menos 10 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Por favor corrige los errores del formulario");
            return;
        }

        setIsSubmitting(true);

        try {
            // EmailJS configuration
            // Reemplaza estos valores con los tuyos de EmailJS
            const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
            const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
            const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

            // Enviar email usando EmailJS
            await emailjs.send(
                serviceId,
                templateId,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                    to_name: "Tu Nombre", // Tu nombre
                },
                publicKey
            );

            toast.success("¡Mensaje enviado con éxito! Te responderé pronto.");

            // Reset form
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Error al enviar el mensaje. Por favor intenta de nuevo o escríbeme directamente a colidom@outlook.com");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contacto" className="mt-32 mb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center mb-8"
            >
                <div className="mr-4 w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-white dark:bg-gray-800 flex items-center justify-center">
                    <MdEmail className="size-5" />
                </div>
                <h2 className="text-3xl font-bold">Contacto</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <FadeIn delay={0.2}>
                        <h3 className="text-2xl font-semibold mb-6">¿Tienes un proyecto en mente?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Estoy disponible para nuevos proyectos y colaboraciones. No dudes en contactarme a través de cualquiera de estos medios.
                        </p>
                    </FadeIn>

                    {/* Contact Details */}
                    <div className="space-y-4">
                        {contactInfo.map((info, index) => {
                            const IconComponent = info.icon;
                            const CardContent = (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ scale: 1.02, x: 4 }}
                                    className="flex items-center gap-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <IconComponent className="size-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{info.label}</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{info.value}</p>
                                    </div>
                                </motion.div>
                            );

                            return info.href ? (
                                <a key={index} href={info.href} className="block">
                                    {CardContent}
                                </a>
                            ) : (
                                <div key={index}>{CardContent}</div>
                            );
                        })}
                    </div>

                    {/* Social Links */}
                    <FadeIn delay={0.6}>
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Sígueme en redes sociales</p>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => {
                                    const IconComponent = social.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.1, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 hover:shadow-lg`}
                                            aria-label={social.label}
                                        >
                                            <IconComponent className="size-5" />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Contact Form */}
                <SlideIn direction="right" delay={0.3}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all duration-200`}
                                placeholder="Nombre"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Email Input */}
                        <div>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all duration-200`}
                                placeholder="john.doe@example.dev"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        {/* Subject Input */}
                        <div>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.subject ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all duration-200`}
                                placeholder="Motivo del contacto"
                            />
                            {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                        </div>

                        {/* Message Textarea */}
                        <div>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="6"
                                className={`w-full px-4 py-3 rounded-lg border ${
                                    errors.message ? "border-red-500 focus:ring-red-500" : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:outline-none transition-all duration-200 resize-none`}
                                placeholder="Cuéntame sobre tu proyecto..."
                            />
                            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={`w-full px-6 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl"
                            }`}
                        >
                            {isSubmitting ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Enviando...
                                </span>
                            ) : (
                                "Enviar Mensaje"
                            )}
                        </motion.button>
                    </form>
                </SlideIn>
            </div>
        </section>
    );
}
