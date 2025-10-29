
# 🦸‍♂️ PCPro Heroes & Utilities Suite

Bienvenido a un ecosistema completo de aplicaciones frontend y backend pensado para demostrar buenas prácticas modernas con React, NestJS y herramientas de productividad para entornos empresariales.

## 📌 Descripción del Proyecto
- **¿Qué hace?** Centraliza un frontend de exploración de superhéroes, un backend NestJS con API REST dedicada y laboratorios adicionales (Tailwind Hooks App, Gift Finder y módulos de refuerzo TypeScript).
- **Utilidad profesional:** Sirve como base demostrativa para propuestas comerciales, portfolios técnicos y puntos de partida para proyectos SaaS orientados a gestión de catálogos, analítica y paneles administrativos.
- **Usuarios objetivo:** Agencias, startups y clientes corporativos que buscan una arquitectura modular JavaScript/TypeScript mantenible, reusable y lista para personalizar.

## ✨ Características Destacadas
- 🛠️ **Frontend modular:** React 19, React Router 7 y TanStack Query para experiencias SPA rápidas.
- 📊 **Panel de estadísticas:** HeroStats muestra métricas en tiempo real consumiendo el backend.
- 📦 **API REST escalable:** Backend NestJS con controladores, DTOs y validaciones globales.
- 🔒 **Buenas prácticas:** Validación de datos con `class-validator`, CORS habilitado, prefijos globales y sanitización de entradas.
- ⚙️ **Experiencia DX optimizada:** Configuración Vite + Tailwind 4 y React Compiler para iteraciones ágiles.
- 💾 **Persistencia ligera:** Almacenamiento local de favoritos para experiencias personalizadas sin backend adicional.
- 🧪 **Testing listo:** Scripts de Vitest/Jest preconfigurados para cobertura y pruebas UI.
- 🧰 **Playgrounds complementarios:** Proyectos paralelos para experimentación con hooks y UI.

## ⚙️ Funcionalidades
- **Explorador de héroes:** Listado paginado, filtros por categorías (héroes, villanos), favoritos y fichas detalladas.
- **Dashboard visual:** Resumen de héroes más fuertes/inteligentes, totales y distribución por rol.
- **Buscador avanzado:** Endpoint `/heroes/search` con filtros por nombre, universo, estado, equipo o fuerza mínima.
- **Administración (en progreso):** Ruta `/admin` preparada para módulos de gestión.
- **API REST NestJS:** CRUD completo (`POST`, `GET`, `PATCH`, `DELETE`) sobre recursos de héroes y endpoint `/heroes/summary`.
- **Data mocking profesional:** Fuente `heroes.data.ts` con más de 20 personajes listos para demos.
- **Contexto de favoritos:** Persistencia en `localStorage` y sincronización con la UI en tiempo real.

## 🔧 Tecnologías Utilizadas
- ⚛️ **React 19** + 🧩 **TypeScript 5.9**
- ⚡ **Vite 7** + 🎨 **Tailwind CSS 4** + 🧬 **Radix UI**
- 🔁 **TanStack Query 5** + 🔍 **React Router 7**
- 🔗 **Axios** para llamadas HTTP tipadas
- 🛡️ **NestJS 11** + 🧱 **Serve Static** para distribución de assets
- 🧪 **Vitest 3 / Jest 29** para pruebas unitarias y cobertura
- 🧹 **ESLint 9**, Prettier y React Compiler para code quality

## 📁 Estructura del Proyecto
```
│
├── README.md                # Este documento
├── gift/
│   └── pcpro-giftApp/       # Laboratorio React + Vitest para catálogos tipo "regalos"
├── react/
│   ├── 05-heroes-app/       # Frontend principal (React + Tailwind + React Query)
│   ├── 06-nest-heroes-backend/ # Backend NestJS con API /api/heroes
│   ├── hooks-app/           # Playground de hooks, Tailwind y utilidades UI
│   └── primer-proyecto/     # Boilerplate reactivo base
└── typescript/01-reforzamiento/ # Ejercicios de refuerzo con TypeScript puro
```

## 🚀 Instrucciones de Uso
1. **Clonar repositorio**
   ```bash
   git clone https://github.com/franHR11/pcpro-React-full-2025-FH.git
   cd pcpro-React-full-2025-FH
   ```
2. **Configurar variables de entorno**
   - Duplicar los archivos `.env.template` disponibles y renombrarlos a `.env`.
   - Establecer valores acorde a tu despliegue:
     ```env
     # Frontend (react/05-heroes-app/.env)
     VITE_API_URL=${API_BASE_URL}

     # Backend (react/06-nest-heroes-backend/.env)
     PORT=3000
     ```
3. **Instalar dependencias**
   ```bash
   npm install --prefix react/05-heroes-app
   npm install --prefix react/06-nest-heroes-backend
   ```
4. **Levantar backend**
   ```bash
   npm run start:dev --prefix react/06-nest-heroes-backend
   ```
5. **Levantar frontend**
   ```bash
   npm run dev --prefix react/05-heroes-app
   ```
6. **Build y pruebas**
   ```bash
   npm run build --prefix react/05-heroes-app
   npm run test --prefix react/06-nest-heroes-backend
   npm run coverage --prefix gift/pcpro-giftApp
   ```

> 💡 Usa manejadores de procesos (`npm-run-all`, `turbo`, `pm2`) para orquestar múltiples apps en despliegues profesionales.

## 🧪 Ejemplos de Uso
- **Consumir resumen de héroes**
  ```bash
  curl -X GET "${API_BASE_URL}/api/heroes/summary"
  ```
- **Crear nuevo héroe (payload abreviado)**
  ```bash
  curl -X POST "${API_BASE_URL}/api/heroes" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Natasha Romanoff",
      "alias": "Black Widow",
      "category": "Hero",
      "team": "Avengers",
      "strength": 7,
      "intelligence": 9
    }'
  ```

## 📞 Soporte y Contacto
- 📅 **Año:** 2025  
- 📨 **Autor:** Francisco José Herreros (franHR)  
- 📧 **Email:** [desarrollo@pcprogramacion.es](mailto:desarrollo@pcprogramacion.es)  
- 🌐 **Web:** [https://www.pcprogramacion.es](https://www.pcprogramacion.es)  
- 💼 **LinkedIn:** [Francisco José Herreros](https://www.linkedin.com/in/francisco-jose-herreros)  
- 🖥️ **Portfolio:** [https://franhr.pcprogramacion.es/](https://franhr.pcprogramacion.es/)

## 🖼️ Imágenes del Proyecto
Incluye capturas de pantalla destacando el dashboard, listado de héroes y vista de detalle en `/docs/assets`. Actualiza esta sección con rutas relativas cuando estén disponibles.

## 🛡️ Licencia

### Español
Copyright (c) 2025 Francisco José Herreros (franHR) / PCProgramación

Todos los derechos reservados.

Este software es propiedad de Francisco José Herreros (franHR), desarrollador de PCProgramación (https://www.pcprogramacion.es). No está permitido copiar, modificar, distribuir o utilizar este código, ni total ni parcialmente, sin una autorización expresa y por escrito del autor.

El acceso a este repositorio tiene únicamente fines de revisión, auditoría o demostración, y no implica la cesión de ningún derecho de uso o explotación.

Para solicitar una licencia o permiso de uso, contacta con: desarrollo@pcprogramacion.es

### English
Copyright (c) 2025 Francisco José Herreros (franHR) / PCProgramación

All rights reserved.

This software is the property of Francisco José Herreros (franHR), developer of PCProgramación (https://www.pcprogramacion.es). It is not allowed to copy, modify, distribute or use this code, either totally or partially, without express and written authorization from the author.

Access to this repository has only review, audit or demonstration purposes, and does not imply the transfer of any right of use or exploitation.

To request a license or permission to use, contact: desarrollo@pcprogramacion.es

## 🔝 Hashtags Recomendados para LinkedIn
`#ReactJS #NestJS #TypeScript #FullStackDevelopment #PCProgramacion #FrontendDevelopment #BackendDevelopment #WebPerformance`

