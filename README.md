# 🚀 React Portfolio Template

Este repositorio contiene la **plantilla de frontend** para un portafolio personal, construida con **React** y **Tailwind CSS**. 🎨

La plantilla está diseñada para ser **dinámica**, consumiendo todos los datos (proyectos, habilidades, experiencia, etc.) desde una **API de backend separada**. Esto permite una fácil reutilización, ya que el contenido se actualiza simplemente modificando la API, sin tocar el código del frontend.

---

## ✨ Características Clave

-   **Diseño Dinámico y Reutilizable**: Componentes React que se alimentan de una API, facilitando el cambio de contenido y la reutilización del diseño.
-   **Estilo Moderno con Tailwind CSS**: Personaliza fácilmente el diseño, los colores y la tipografía a tu gusto.
-   **Modo Oscuro/Claro**: Alterna entre temas para mejorar la accesibilidad y la experiencia visual del usuario.
-   **Animaciones Fluidas**: Disfruta de transiciones y efectos visuales suaves que dan un toque profesional a la interfaz.
-   **Información Detallada de Experiencia**: Muestra la duración y ubicación de cada experiencia laboral para un CV más completo.

---

## 🛠️ Configuración y Ejecución Local

### Requisitos

-   Node.js (versión **16.x o superior**)
-   npm o yarn

### 1. Clonar el Repositorio

```bash
git clone [https://github.com/colidom/react-portfolio-template.git](https://github.com/colidom/react-portfolio-template.git)
cd react-portfolio-template
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar la API

El frontend necesita conectarse a una API para funcionar. Crea un archivo .env en la raíz del proyecto y añade la URL de tu backend:

```bash
REACT_APP_BACKEND_URL=https://[URL-DE-TU-API-BACKEND]
```

_⚠️ Asegúrate de que la URL de tu API sea accesible._

### 4. Iniciar el Servidor de Desarrollo

```bash
npm run dev
```

El portafolio estará disponible en tu navegador en:
👉 http://localhost:5173

## 🌐 API de Backend Requerida

Tu API debe exponer los siguientes endpoints que devuelvan datos en formato JSON:

### 1. GET /hero

Devuelve los datos de la sección principal.

| Campo           | Tipo               | Descripción                             | Ejemplo                                                                                                                      |
| :-------------- | :----------------- | :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `name`          | `string`           | Nombre                                  | `"Carlos Oliva"`                                                                                                             |
| `title`         | `string`           | Título a resaltar                       | `"Desarrollador de Software y Administrador de Sistemas"`                                                                    |
| `description`   | `string`           | Descripción                             | `"Con experiencia en..."`                                                                                                    |
| `social_links`  | `array of objects` | Lista de enlaces a redes sociales y CV  | `[{"url":"https://...","icon":"FaLinkedin"},{"url":"https://...","icon":"FaGithub"},{"url":"/cv.pdf","icon":"FaDownload"}]`  |

---

### 2. GET /experiences

Devuelve una lista de experiencias laborales.

| Campo           | Tipo               | Descripción                                  | Ejemplo                                                |
| :-------------- | :----------------- | :------------------------------------------- | :----------------------------------------------------- |
| `id`            | `number`           | Identificador único                          | `1`                                                    |
| `job_title`     | `string`           | Puesto de trabajo                            | `"Desarrollador Full-Stack"`                           |
| `company`       | `string`           | Nombre de la empresa                         | `"Empresa S.A."`                                       |
| `start_date`    | `string`           | Fecha de inicio (formato ISO 8601)           | `"2022-05-01"`                                         |
| `end_date`      | `string`           | Fecha de fin (formato ISO 8601) o `null`     | `"2023-11-30"` o `null` para "Actualmente"             |
| `description`   | `string`           | Descripción de las responsabilidades         | `"Desarrollo y mantenimiento de aplicaciones web..."`  |
| `technologies`  | `array of strings` | Tecnologías usadas                           | `["Python", "Spring", "PostgreSQL"]`                   |
| `location`      | `string`           | Ubicación de la empresa                      | `"Madrid, España"`                                     |
| `ubication`     | `string`           | Ubicación de la empresa (campo alternativo)  | `"Remoto"`                                             |

---

### 3. GET /projects

Devuelve una lista de proyectos.

| Campo           | Tipo               | Descripción                    | Ejemplo                                     |
| :-------------- | :----------------- | :----------------------------- | :------------------------------------------ |
| `id`            | `number`           | Identificador único            | `1`                                         |
| `title`         | `string`           | Título del proyecto            | `"Mi Primer Portfolio"`                     |
| `description`   | `string`           | Descripción detallada          | `"Un proyecto de portafolio personal..."`   |
| `technologies`  | `array of strings` | Tecnologías usadas             | `["React", "TailwindCSS", "Vite"]`          |
| `image`         | `string`           | URL de la imagen del proyecto  | `"/priorisen-dashboard.png"`                |
| `code_link`     | `string`           | URL al repositorio (GitHub)    | `"https://github.com/usuario/repositorio"`  |

---

### 4. GET /about

⚠️⚠️⚠️⚠️⚠️️️️️️️*Not Implemented*

---

## 🤝 Contribuciones y Soporte

Este proyecto está abierto a contribuciones.
Si encuentras un problema o tienes una idea para una nueva característica:

Abre un issue en el repositorio.

Envía un pull request con tus mejoras.
