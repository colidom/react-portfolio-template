import React from "react";

const projects = [
    {
        title: "Gestor de tareas con FastAPI + React",
        description: "App para organizar tareas con matriz Eisenhower en front‑end React.",
        url: "#",
    },
    {
        title: "Bot de Telegram para rifas",
        description: "Bot en Python que gestiona jugadas y participantes.",
        url: "#",
    },
    {
        title: "Panel domótico en Home Assistant",
        description: "Automatización con sensores y horarios.",
        url: "#",
    },
];

export default function ProjectList() {
    return (
        <section>
            <h2 className="text-3xl font-semibold mb-8 text-text">Proyectos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((p, i) => (
                    <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                        <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                        <p className="text-text/80 mb-4">{p.description}</p>
                        <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-accent font-medium hover:underline">
                            Ver proyecto →
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
