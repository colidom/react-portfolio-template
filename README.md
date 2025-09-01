# 🚀 React Portfolio Template

Este repositorio contiene la **plantilla de frontend** para un portafolio personal, construida con **React** y **Tailwind CSS**.  
La plantilla está diseñada para ser totalmente **dinámica**, consumiendo todos los datos (proyectos, habilidades, experiencia) desde una **API de backend separada**, lo que permite una fácil reutilización para cualquier desarrollador.

---

## ✨ Características Clave

-   **Diseño modulable y reutilizable**: Creado con componentes React que se alimentan de una API, lo que facilita el cambio de contenido sin modificar la estructura.
-   **Estilo personalizable**: Utiliza Tailwind CSS, permitiendo personalización rápida de diseño, colores y tipografía.
-   **Modo oscuro/claro**: Sistema de alternancia de temas para mejorar la accesibilidad y la experiencia del usuario.
-   **Animaciones suaves**: Transiciones fluidas y efectos visuales para una interfaz moderna y atractiva.

---

## 🛠️ Configuración y Ejecución Local

### Requisitos

-   Node.js (versión **16.x o superior**)
-   npm o yarn

### 1. Clonar el Repositorio

```bash
git clone https://github.com/colidom/react-portfolio-template.git
cd react-portfolio-template
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar la API

El frontend depende de una API de backend para obtener los datos.
Crea un archivo `.env` en la raíz del proyecto con la siguiente variable de entorno:

```bash
REACT_APP_BACKEND_URL=https://[URL-DE-TU-API-BACKEND]
```

⚠️ Asegúrate de que la URL de tu API sea accesible.

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El portafolio estará disponible en tu navegador en:
👉 http://localhost:5173

## 🌐 API de Backend Requerida

Tu API debe exponer al menos 3 endpoints que devuelvan datos en JSON:

### 1. GET /projects

Devuelve una lista de proyectos.

| Campo        | Tipo             | Descripción                   | Ejemplo                                                                            |
| ------------ | ---------------- | ----------------------------- | ---------------------------------------------------------------------------------- |
| id           | number           | Identificador único           | 1                                                                                  |
| title        | string           | Título del proyecto           | "Mi Primer Portfolio"                                                              |
| description  | string           | Descripción detallada         | "Un proyecto de portafolio personal..."                                            |
| technologies | array of strings | Tecnologías usadas            | \["React", "TailwindCSS", "Vite"]                                                  |
| image        | string           | URL de la imagen del proyecto | "[/priorisen-dashboard.png](/prioreisen-dashboard.png)"                            |
| code_link    | string           | URL al repositorio (GitHub)   | "[https://github.com/usuario/repositorio](https://github.com/usuario/repositorio)" |

### 2. GET /about

⚠️⚠️⚠️⚠️⚠️️️️️️️*Not Implemented*

Devuelve tu información personal.
| Campo | Tipo | Descripción | Ejemplo |
| ------------- | ---------------- | ------------------ | --------------------------------- |
| name | string | Tu nombre completo | "Carlos Oliva" |
| role | string | Rol o profesión | "Desarrollador Full Stack" |
| bio | string | Breve biografía | "Apasionado por el desarrollo..." |
| social_links | array of objects | Redes sociales | Ver estructura abajo |

Estructura de social_links:
| Campo | Tipo | Descripción | Ejemplo |
| -------- | ------ | ----------------------- | ---------------------------------------------------------- |
| platform | string | Nombre de la red social | "GitHub" |
| url | string | URL del perfil | "[https://github.com/colidom](https://github.com/colidom)" |

### 3. GET /Hero

| Campo        | Tipo   | Descripción       | Ejemplo                                                                                                                                                                                                                 |
| ------------ | ------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name         | string | Nombre            | "Carlos Oliva"                                                                                                                                                                                                          |
| title        | string | Título a resaltar | \"Desarrollador de Software y Administrador de Sistemas"                                                                                                                                                                |
| description  | string | Descripción       | \"Con experiencia en ..."                                                                                                                                                                                               |
| social_links | jsonb  | Lista de enlaces  | \[{"url":"https://www.linkedin.com/in/cjod/","icon":"FaLinkedin","name":"LinkedIn"},{"url":"https://github.com/colidom","icon":"FaGithub","name":"GitHub"},{"url":"/cv.pdf","icon":"FaDownload","name":"Descargar CV"}] |

## 🤝 Contribuciones y Soporte

Este proyecto está abierto a contribuciones.
Si encuentras un problema o tienes una idea para una nueva característica:

Abre un issue en el repositorio.

Envía un pull request con tus mejoras.
