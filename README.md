# 🦸‍♂️ Heroes App - Full Stack Application

<div align="center">

![Heroes App Banner](https://img.shields.io/badge/Heroes-App-blue?style=for-the-badge&logo=react&logoColor=white)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-11.0.1-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

*Una aplicación full-stack moderna para gestionar y explorar superhéroes y villanos*

</div>

## 📋 Descripción del Proyecto

**Heroes App** es una aplicación web completa que permite a los usuarios explorar, buscar y gestionar una extensa base de datos de superhéroes y villanos. La aplicación cuenta con un frontend moderno desarrollado en React con TypeScript y un backend robusto construido con NestJS.

### ✨ Características Destacadas

- 🎨 **Interfaz Moderna**: Diseño responsive con Tailwind CSS y componentes de Shadcn/UI
- 🔍 **Búsqueda Avanzada**: Filtros por categoría, universo, equipo y estadísticas
- 📊 **Dashboard Interactivo**: Estadísticas en tiempo real y visualización de datos
- ❤️ **Sistema de Favoritos**: Gestión de héroes favoritos con contexto React
- 📱 **Responsive Design**: Optimizado para dispositivos móviles y desktop
- 🚀 **Performance Optimizada**: Lazy loading, paginación y cache inteligente
- 🎯 **Gestión de Estado**: TanStack Query para manejo eficiente de datos
- 🔐 **Validación Robusta**: Validación tanto en frontend como backend

## 🛠️ Tecnologías Utilizadas

### Frontend (React + TypeScript)
- **React 19.1.1** - Biblioteca principal de UI
- **TypeScript 5.9.3** - Tipado estático
- **Vite 7.1.7** - Build tool y dev server
- **React Router 7.9.4** - Enrutamiento SPA
- **TanStack Query 5.90.5** - Gestión de estado del servidor
- **Tailwind CSS 4.1.14** - Framework de CSS utility-first
- **Shadcn/UI** - Componentes de UI modernos
- **Radix UI** - Componentes primitivos accesibles
- **Lucide React** - Iconografía moderna
- **Axios 1.12.2** - Cliente HTTP

### Backend (NestJS + TypeScript)
- **NestJS 11.0.1** - Framework de Node.js
- **TypeScript 5.7.3** - Tipado estático
- **Class Validator 0.14.2** - Validación de DTOs
- **Class Transformer 0.5.1** - Transformación de objetos
- **UUID 11.1.0** - Generación de identificadores únicos
- **Express** - Servidor HTTP subyacente

## 🏗️ Estructura del Proyecto

```
pcpro-React-full-2025-FH/
├── react/
│   ├── 05-heroes-app/                 # Frontend React
│   │   ├── src/
│   │   │   ├── components/            # Componentes reutilizables
│   │   │   │   ├── ui/               # Componentes de Shadcn/UI
│   │   │   │   └── custom/           # Componentes personalizados
│   │   │   ├── heroes/               # Módulo de héroes
│   │   │   │   ├── actions/          # Acciones de API
│   │   │   │   ├── api/              # Cliente HTTP
│   │   │   │   ├── components/       # Componentes específicos
│   │   │   │   ├── context/          # Contextos React
│   │   │   │   ├── hooks/            # Hooks personalizados
│   │   │   │   ├── layouts/          # Layouts de páginas
│   │   │   │   ├── pages/            # Páginas principales
│   │   │   │   └── types/            # Interfaces TypeScript
│   │   │   ├── admin/                # Módulo de administración
│   │   │   └── router/               # Configuración de rutas
│   │   ├── package.json
│   │   └── vite.config.ts
│   └── 06-nest-heroes-backend/       # Backend NestJS
│       ├── src/
│       │   ├── heroes/               # Módulo de héroes
│       │   │   ├── dto/              # Data Transfer Objects
│       │   │   ├── entities/         # Entidades del dominio
│       │   │   ├── heroes.controller.ts
│       │   │   ├── heroes.service.ts
│       │   │   └── heroes.module.ts
│       │   ├── common/               # Utilidades compartidas
│       │   ├── data/                 # Datos de prueba
│       │   ├── app.module.ts
│       │   └── main.ts
│       └── package.json
└── README.md
```

## 🚀 Funcionalidades Principales

### 🏠 Página Principal
- **Dashboard de Estadísticas**: Resumen de héroes, villanos y estadísticas generales
- **Grid de Héroes**: Visualización en tarjetas con información clave
- **Sistema de Pestañas**: Navegación entre héroes, villanos y favoritos
- **Paginación Inteligente**: Navegación eficiente entre páginas

### 🔍 Búsqueda y Filtrado
- **Búsqueda por Nombre**: Búsqueda en tiempo real
- **Filtros Avanzados**: Por categoría, universo, equipo y estadísticas
- **Resultados Dinámicos**: Actualización automática de resultados

### 👤 Perfil de Héroe
- **Información Detallada**: Biografía, poderes y estadísticas
- **Visualización de Stats**: Gráficos de fuerza, inteligencia, velocidad y resistencia
- **Galería de Imágenes**: Imágenes de alta calidad
- **Navegación Contextual**: Enlaces relacionados

### ⚙️ Panel de Administración
- **Gestión de Héroes**: CRUD completo de superhéroes
- **Validación de Datos**: Formularios con validación robusta
- **Interfaz Intuitiva**: Diseño optimizado para administradores

## 📡 API Endpoints

### Héroes
- `GET /api/heroes` - Obtener lista paginada de héroes
- `GET /api/heroes/:id` - Obtener héroe por ID o slug
- `POST /api/heroes` - Crear nuevo héroe
- `PATCH /api/heroes/:id` - Actualizar héroe
- `DELETE /api/heroes/:id` - Eliminar héroe
- `GET /api/heroes/summary` - Obtener estadísticas del dashboard
- `GET /api/heroes/search` - Búsqueda avanzada con filtros

### Parámetros de Consulta
- `limit`: Número de elementos por página (default: 6)
- `offset`: Desplazamiento para paginación
- `category`: Filtro por categoría (Hero/Villain/all)
- `name`: Búsqueda por nombre
- `team`: Filtro por equipo
- `universe`: Filtro por universo (Marvel/DC)
- `status`: Filtro por estado (Active/Inactive)

## 🔧 Instalación y Configuración

### Prerrequisitos
- **Node.js** >= 18.0.0
- **npm** >= 8.0.0

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd pcpro-React-full-2025-FH
```

### 2. Configurar Variables de Entorno

#### Frontend (.env)
```bash
cd react/05-heroes-app
cp .env.template .env
```

Editar `.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

#### Backend (.env) - Opcional
```bash
cd react/06-nest-heroes-backend
```

Crear `.env`:
```env
PORT=3000
```

### 3. Instalar Dependencias

#### Backend
```bash
cd react/06-nest-heroes-backend
npm install
```

#### Frontend
```bash
cd react/05-heroes-app
npm install
```

## 🚀 Ejecución del Proyecto

### 1. Iniciar el Backend
```bash
cd react/06-nest-heroes-backend
npm run start:dev
```
El servidor estará disponible en `http://localhost:3000`

### 2. Iniciar el Frontend
```bash
cd react/05-heroes-app
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## 📦 Scripts Disponibles

### Frontend
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting del código

### Backend
- `npm run start:dev` - Servidor de desarrollo con watch
- `npm run start:prod` - Servidor de producción
- `npm run build` - Compilar TypeScript
- `npm run test` - Ejecutar tests
- `npm run test:e2e` - Tests end-to-end

## 🎨 Capturas de Pantalla

### Dashboard Principal
*Interfaz principal con estadísticas y grid de héroes*

### Perfil de Héroe
*Vista detallada con información completa del superhéroe*

### Panel de Administración
*Interfaz de gestión para administradores*

### Búsqueda Avanzada
*Sistema de filtros y búsqueda en tiempo real*

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte y Contacto

Para soporte técnico o consultas sobre el proyecto:

- **Email**: [tu-email@ejemplo.com]
- **LinkedIn**: [Tu Perfil de LinkedIn]
- **GitHub**: [Tu Usuario de GitHub]
- **Portfolio**: [Tu Sitio Web]

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

<div align="center">

**Desarrollado con ❤️ usando React, NestJS y TypeScript**

![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/Powered%20by-TypeScript-blue?style=for-the-badge&logo=typescript)

</div>