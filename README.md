# 🚀 Portfolio Full Stack - Carlos Oliva

Portfolio profesional desarrollado con React y Django, con diseño moderno, animaciones fluidas y formulario de contacto funcional.

🌐 **[Ver Portfolio en Vivo](https://colidom.vercel.app)**

![Portfolio Preview](./preview.png)

> ⭐ **Nota:** Este es mi portfolio personal en producción. Si quieres usar esta plantilla para tu propio portfolio, consulta la guía de personalización en [PERSONALIZACION.md](./PERSONALIZACION.md)

## ✨ Características

### 🎨 Diseño y UI/UX
- **Diseño Moderno**: Gradientes animados, glassmorphism y efectos visuales avanzados
- **Animaciones Fluidas**: Implementadas con Framer Motion para transiciones suaves
- **Modo Oscuro/Claro**: Sistema de temas con persistencia en localStorage
- **100% Responsive**: Adaptado a todos los dispositivos (móvil, tablet, desktop)
- **Accesibilidad**: Navegación por teclado, ARIA labels y contraste optimizado

### 📱 Secciones

#### 🏠 Hero
- Presentación animada con gradientes dinámicos
- Links a redes sociales (LinkedIn, GitHub)
- Botón de descarga de CV
- Indicador de scroll animado

#### 💼 Experiencia Laboral
- Timeline visual con gradientes de color
- Agrupación por empresa
- Expandir/colapsar experiencias
- Iconos de tecnologías con tooltips
- Animaciones de entrada por scroll

#### 🚀 Proyectos
- Vista en grid o lista (toggle)
- Cards con efectos hover avanzados
- Overlay animado con links a código y demo
- Imágenes con zoom en hover

#### 💪 Habilidades Técnicas
- Cards animadas por categoría
- Filtros: Frontend, Backend, Database, Tools
- Barras de progreso animadas
- Iconos de tecnologías reconocibles

#### 👤 Sobre Mí
- Foto de perfil con efecto glow
- Stats cards animadas
- Keywords destacadas en texto

#### 📧 Contacto
- **Formulario funcional** con EmailJS (100% GRATIS)
- Validación en tiempo real
- Notificaciones toast para feedback
- Información de contacto con iconos animados

## 🛠️ Stack Tecnológico

### Frontend
```json
{
  "framework": "React 19.1.1",
  "styling": "Tailwind CSS 3.4.17",
  "animations": "Framer Motion 11.0.0",
  "icons": "React Icons 5.5.0",
  "forms": "EmailJS Browser 4.3.3",
  "notifications": "React Toastify 10.0.5",
  "analytics": "Vercel Analytics & Speed Insights"
}
```

### Backend
```json
{
  "framework": "Django",
  "database": "PostgreSQL",
  "api": "Django REST Framework"
}
```

### Deploy
- **Frontend**: Vercel → [colidom.vercel.app](https://colidom.vercel.app)
- **Backend**: Render → [backend-7roq.onrender.com](https://backend-7roq.onrender.com)
- **Email**: EmailJS (200 emails/mes gratis)

## 📦 Instalación Local

### Requisitos Previos
- Node.js 16+ y npm
- Python 3.8+
- Git

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/colidom/portfolio-app.git
cd portfolio-app
```

### 2️⃣ Configurar Frontend

```bash
cd frontend
npm install
```

**Crear archivo `.env.development`:**

```env
REACT_APP_BACKEND_URL=http://127.0.0.1:8000/api

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=service_ykrijxy
REACT_APP_EMAILJS_TEMPLATE_ID=template_2tr6o78
REACT_APP_EMAILJS_PUBLIC_KEY=9BzrHvvsVN75GSudC
```

**Iniciar servidor:**

```bash
npm start
```

### 3️⃣ Configurar Backend

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## 🎨 Características Destacadas

### Animaciones con Framer Motion
- Scroll animations en todas las secciones
- Hover effects suaves y profesionales
- Stagger animations para listas
- Timeline animado con gradientes

### Header Sticky Mejorado
- Efecto glassmorphism al hacer scroll
- Indicador de sección activa animado
- Menú móvil con transiciones
- Navegación fluida entre secciones

### Sistema de Notificaciones
- Toast notifications con react-toastify
- Estados de carga visuales
- Validación de formularios en tiempo real
- Feedback inmediato al usuario

### SEO Optimizado
- Meta tags completos (Open Graph, Twitter Cards)
- Sitemap.xml configurado
- Robots.txt optimizado
- Performance score 90+ en Lighthouse

## 📁 Estructura del Proyecto

```
portfolio-app/
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes React
│   │   ├── hooks/            # Custom hooks
│   │   ├── constants/        # Configuración global
│   │   ├── utils/            # Funciones útiles
│   │   └── App.jsx
│   ├── public/
│   │   ├── sitemap.xml
│   │   └── robots.txt
│   └── package.json
│
├── backend/                  # Django API
│   ├── api/
│   └── manage.py
│
├── EMAILJS_SETUP.md         # Guía EmailJS
├── MEJORAS.md               # Documentación mejoras
├── PERSONALIZACION.md       # Guía para usar como plantilla
└── README.md
```

## 🚀 Deploy en Producción

### Variables de Entorno (Vercel)

```env
REACT_APP_BACKEND_URL=https://backend-7roq.onrender.com/api
REACT_APP_EMAILJS_SERVICE_ID=service_ykrijxy
REACT_APP_EMAILJS_TEMPLATE_ID=template_2tr6o78
REACT_APP_EMAILJS_PUBLIC_KEY=9BzrHvvsVN75GSudC
```

### Comandos de Deploy

```bash
# Frontend (Vercel)
npm run build
vercel deploy --prod

# Backend (Render)
git push origin main  # Deploy automático
```

## 📊 Performance

**Métricas Lighthouse:**
- ✅ Performance: 92
- ✅ Accessibility: 98
- ✅ Best Practices: 96
- ✅ SEO: 100

## 🤝 Uso como Plantilla

¿Te gusta este portfolio y quieres usarlo como plantilla?

1. Haz fork del repositorio
2. Lee la guía completa en [PERSONALIZACION.md](./PERSONALIZACION.md)
3. Configura tus propios datos en:
   - `src/constants/index.js` (SEO, colores)
   - `.env.development` (API, EmailJS)
   - `public/sitemap.xml` (tu dominio)
   - `public/robots.txt` (tu dominio)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para proyectos personales o comerciales.

## 📧 Contacto

**Carlos Oliva**
- 🌐 Portfolio: [colidom.vercel.app](https://colidom.vercel.app)
- 📧 Email: colidom@outlook.com
- 💼 LinkedIn: [linkedin.com/in/colidom](https://linkedin.com/in/colidom)
- 🐙 GitHub: [@colidom](https://github.com/colidom)

## 🙏 Agradecimientos

- [React](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [EmailJS](https://www.emailjs.com/)
- [Vercel](https://vercel.com/)

---

⭐ **Si te gustó este proyecto, dale una estrella en GitHub**

**Desarrollado con ❤️ por Carlos Oliva**
