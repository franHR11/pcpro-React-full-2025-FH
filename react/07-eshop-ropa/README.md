# 🛍️ Pcpro Eshop Ropa 2025

Ecosistema completo de **tienda online de ropa** compuesto por:

- **Frontend**: SPA moderna con **React 19 + Vite + TypeScript + TailwindCSS**, consumo de API, autenticación JWT, panel de administración y experiencia de usuario optimizada.
- **Backend**: API RESTful en **NestJS + PostgreSQL + TypeORM**, con autenticación, gestión de productos, subida de imágenes y WebSockets.

Pensado como proyecto **realista de portfolio profesional**, válido para:

- **Ecommerce / retail de moda** que necesita una base técnica sólida.
- **Empresas** que buscan ver código de calidad en React + NestJS.
- **Recruiters y clientes** que quieren evaluar arquitectura, buenas prácticas y trabajo fullstack.

---

## 📌 Descripción del proyecto

Pcpro Eshop Ropa es una solución **fullstack** que cubre el flujo típico de un ecommerce de ropa:

- Catálogo navegable por categorías/género.
- Detalle de producto con imágenes y precio.
- Sistema de autenticación de usuarios con JWT.
- Panel de administración para gestionar productos.
- Backend robusto con API documentada (OpenAPI/Swagger) y base de datos **PostgreSQL**.

El enfoque es **educativo y profesional**: código limpio, arquitectura clara y stack moderno alineado con lo que se usa en empresas en 2025.

---

## ✨ Características destacadas

- 🛒 **Frontend ecommerce moderno**
  - Páginas de **Home**, listado por género, detalle de producto.
  - Componentes reutilizables (cards, tablas, filtros, paginación, formularios).
  - Diseño responsive con Tailwind y componentes tipo UI kit.

- 🔐 **Autenticación y seguridad**
  - Registro y login de usuarios (`/auth/register`, `/auth/login`).
  - Tokens **JWT** y protección de rutas privadas en el frontend.
  - Middleware de validación y DTOs en el backend.

- 🧑‍💼 **Panel de administración**
  - Dashboard con métricas y tarjetas resumen.
  - Gestión de productos (crear, actualizar, listar, paginar).
  - Formularios avanzados con `react-hook-form`.

- 🗄️ **Backend escalable y tipado**
  - Arquitectura modular NestJS (`Auth`, `Products`, `Files`, `Seed`, `MessagesWs`, `Common`).
  - Base de datos **PostgreSQL** con **TypeORM** y entidades tipadas.
  - Seed de datos para poblar el catálogo rápidamente.

- 📦 **Gestión de productos e imágenes**
  - CRUD de productos vía endpoints REST.
  - Subida y gestión de imágenes de productos (`/files`), almacenamiento estático.

- 📊 **Observabilidad y DX**
  - Documentación de la API con **Swagger/OpenAPI** (`/api`).
  - Validación global (`ValidationPipe`) y DTOs con `class-validator`.
  - Scripts de test, lint y build en backend y frontend.

- 🔌 **Comunicación en tiempo real (WebSockets)**
  - Módulo `messages-ws` preparado para funcionalidades en tiempo real (chat/notificaciones).

---

## ⚙️ Funcionalidades

### 🛍️ Frontend (React + Vite)

- **Ruteo** con `react-router`:
  - `HomePage`: vista principal del catálogo.
  - `GenderPage`: filtro por género/categoría.
  - `ProductPage`: detalle individual de producto.
  - Rutas de autenticación: `LoginPage`, `RegisterPage`.
  - Rutas protegidas mediante `ProtectedRoutes` (solo usuarios autenticados).

- **Layouts y componentes clave**
  - `ShopLayout`: estructura general de la tienda (header, footer, contenido).
  - `CustomHeader`, `CustomFooter`, `CustomJumbotron`.
  - `ProductsGrid`, `ProductsCard`, `FilterSidebar`.
  - `CustomPagination`, `CustomLogo`, `CustomFullScreenLoading`.

- **Gestión de estado y datos**
  - `@tanstack/react-query` para fetching, caché y sincronización con la API.
  - `axios` centralizado en `pcproshopApi.ts` con `VITE_API_URL` como base.
  - `zustand` para la **store de autenticación** (`auth.store.ts`).

- **Autenticación en frontend**
  - Acciones en `auth/actions`:
    - `login.actions.ts`
    - `register.actions.ts`
    - `check-auth.actions.ts`
  - Manejo de tokens, persistencia y verificación de sesión.

- **Panel de administración** (`/admin`)
  - `DashboardPage` con estadísticas, gráficas y último movimiento.
  - `AdminProductsPage`: listado de productos para administración.
  - `AdminProductPage` + `ProductForm`: creación/edición de productos.
  - Hooks específicos: `useAdminProducts`, `useProduct`.

---

### 🧩 Backend (NestJS + PostgreSQL)

- **Módulos principales**
  - `AuthModule`: registro, login, comprobación de estado JWT, roles.
  - `ProductsModule`: CRUD de productos, paginación, búsqueda.
  - `FilesModule`: subida y entrega de archivos (imágenes de producto).
  - `SeedModule`: seed de base de datos para entorno de desarrollo.
  - `MessagesWsModule`: gateway WebSocket para mensajes en tiempo real.
  - `CommonModule`: DTOs comunes (como `pagination.dto.ts`).

- **Configuración de infraestructura**
  - `ConfigModule.forRoot()` leyendo de `.env`.
  - `TypeOrmModule.forRoot()` con conexión PostgreSQL:
    - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`.
    - `autoLoadEntities: true` y `synchronize: true` (ideal para desarrollo).
  - Servido de archivos estáticos con `ServeStaticModule`.

- **Autenticación y seguridad**
  - `AuthController`, `AuthService`, `JwtStrategy`.
  - Decoradores personalizados: `@Auth()`, `@GetUser()`, `@RoleProtected()`.
  - Soporte de roles (`valid-roles.ts`) y guard de roles (`user-role.guard.ts`).

- **Productos**
  - Entidades: `Product` y `ProductImage` (relación 1-N).
  - DTOs: `CreateProductDto`, `UpdateProductDto`.
  - Endpoints REST para listar, crear, actualizar y eliminar productos.

- **Subida de archivos**
  - `FilesController`, `FilesService`.
  - Helpers: `fileFilter.helper.ts`, `fileNamer.helper.ts`.
  - Integración con `multer`/NestJS para subida y almacenamiento de imágenes.

- **WebSockets**
  - `MessagesWsGateway` y `MessagesWsService` para gestionar eventos en tiempo real.

- **Documentación de API**
  - `openapi.yaml` describiendo endpoints de **Auth**, **Products** y **Files**.
  - `SwaggerModule` montado en `/api` para exploración interactiva.

---

## 🔧 Tecnologías utilizadas

- ⚛️ **Frontend**
  - ⚛️ React 19
  - 🧩 TypeScript
  - ⚡ Vite
  - 🎨 TailwindCSS 4
  - 🧠 Zustand (gestión de estado)
  - 🔁 @tanstack/react-query
  - 📡 axios
  - 🧱 Radix UI + componentes UI personalizados

- 🐘 **Backend**
  - 🧱 NestJS 10
  - 🐘 PostgreSQL
  - 🧮 TypeORM
  - 🔑 JWT (JSON Web Tokens)
  - 🧪 Jest (tests)
  - 📜 Swagger / OpenAPI

- 🛠️ **Herramientas y ecosistema**
  - 📦 npm
  - 🧹 ESLint, Prettier
  - 🐳 Docker (archivo `docker-compose.yaml` para base de datos/postgres)

---

## 📁 Estructura del proyecto

```text
07-eshop-ropa/
├── Pcpro-Eshop/              # Frontend React + Vite
│   ├── src/
│   │   ├── admin/            # Panel de administración (páginas, hooks, componentes)
│   │   ├── auth/             # Páginas y lógica de autenticación
│   │   ├── shop/             # Páginas y componentes de la tienda pública
│   │   ├── components/       # UI genérica, rutas protegidas, layout
│   │   ├── api/              # Cliente axios (`pcproshopApi.ts`)
│   │   ├── interfaces/       # Tipos/contratos de datos
│   │   ├── lib/              # Utilidades (formatos, helpers)
│   │   └── TesloShopApp.tsx  # Componente raíz de la SPA
│   ├── public/               # Recursos estáticos frontend
│   ├── vite.config.ts        # Configuración Vite + Tailwind + alias `@`
│   └── package.json          # Dependencias frontend
│
└── backend-teslo-shop/       # Backend NestJS (Teslo API)
    ├── src/
    │   ├── auth/             # Autenticación, usuarios, JWT, roles
    │   ├── products/         # Lógica y endpoints de productos
    │   ├── files/            # Gestión de archivos/imágenes
    │   ├── seed/             # Seed de datos
    │   ├── common/           # DTOs y utilidades comunes
    │   ├── messages-ws/      # WebSockets
    │   ├── app.module.ts     # Módulo raíz
    │   └── main.ts           # Bootstrap de la app NestJS
    ├── static/               # Archivos estáticos (imágenes productos, uploads)
    ├── postgres/             # Configuración de base/postgres para docker
    ├── openapi.yaml          # Especificación OpenAPI de la API
    ├── docker-compose.yaml   # Servicios (p.ej. PostgreSQL)
    └── package.json          # Dependencias backend
```

---

## 🚀 Instrucciones de uso

### 1️⃣ Requisitos previos

- Node.js ≥ 18.x
- npm
- PostgreSQL en ejecución
- Puertos libres:
  - **3000** para el backend
  - **5173** para el frontend (por defecto Vite)

Opcional pero recomendado:

- Docker / Docker Compose (para levantar PostgreSQL desde `docker-compose.yaml`).

---

### 2️⃣ Backend: instalación y configuración

Ir a la carpeta del backend:

```bash
cd backend-teslo-shop
npm install
```

Crear el archivo `.env` a partir del `.env.template` (o editar el existente):

```env
STAGE=dev

DB_PASSWORD=yourSecurePassword
DB_NAME=TesloDB
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres

PORT=3000
HOST_API=http://localhost:3000/api

JWT_SECRET=yourVerySecretJwtKey
```

- Asegúrate de que la base de datos `TesloDB` existe en tu PostgreSQL.
- Ajusta usuario/contraseña según tu entorno.

Levantar el backend en desarrollo:

```bash
npm run start:dev
```

La API quedará disponible en:

- `http://localhost:3000/api`
- Documentación Swagger: `http://localhost:3000/api` (UI Swagger configurada en el mismo prefijo).

Para build/producción:

```bash
npm run build
npm run start       # o npm run start:prod
```

---

### 3️⃣ Frontend: instalación y configuración

Ir a la carpeta del frontend:

```bash
cd Pcpro-Eshop
npm install
```

Crear/editar el archivo `.env` del frontend:

```env
VITE_API_URL=http://localhost:3000/api
```

Levantar el frontend en desarrollo:

```bash
npm run dev
```

Abrir el navegador en la URL que muestre Vite (normalmente):

- `http://localhost:5173`

---

### 4️⃣ Flujo de trabajo recomendado

1. Levantar PostgreSQL (local o vía Docker).
2. Configurar `.env` del backend y hacer `npm run start:dev` en `backend-teslo-shop`.
3. Configurar `.env` del frontend y hacer `npm run dev` en `Pcpro-Eshop`.
4. Abrir el navegador y navegar por la tienda, registrarse, iniciar sesión y acceder al panel de administración.

---

## 🧪 Ejemplos de uso de la API

> **Base URL (desarrollo):** `http://localhost:3000/api`

### 🔐 Autenticación

- **POST** `/auth/register`

```http
POST /auth/register HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!",
  "fullName": "John Doe"
}
```

- **POST** `/auth/login`

```http
POST /auth/login HTTP/1.1
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "Password123!"
}
```

Respuesta típica:

```json
{
  "token": "<jwt_token>",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    "isActive": true,
    "roles": ["user"]
  }
}
```

- **GET** `/auth/check-status`

Requiere cabecera:

```http
Authorization: Bearer <jwt_token>
```

---

### 🧵 Productos

- **GET** `/products`

Lista productos con paginación (parámetros opcionales como `limit`, `offset`):

```http
GET /products?limit=10&offset=0 HTTP/1.1
Host: localhost:3000
```

- **POST** `/products`

Crear un producto (requiere auth y rol adecuado):

```http
POST /products HTTP/1.1
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Camiseta básica unisex",
  "price": 19.99,
  "description": "Camiseta de algodón 100%",
  "slug": "camiseta-basica-unisex",
  "stock": 50,
  "sizes": ["S", "M", "L"],
  "gender": "unisex",
  "tags": ["camiseta", "básico"],
  "images": [
    "https://example.com/images/camiseta1.jpg"
  ]
}
```

---

### 🖼️ Subida de imágenes

- **POST** `/files/product`

Subida de imagen de producto mediante `multipart/form-data`:

```http
POST /files/product HTTP/1.1
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary

------WebKitFormBoundary
Content-Disposition: form-data; name="file"; filename="producto.jpg"
Content-Type: image/jpeg

<binario>
------WebKitFormBoundary--
```

La respuesta devolverá la URL de acceso a la imagen subida.

---

## 📞 Soporte y Contacto

### 🆘 Obtener ayuda

- 📅 **Año**: 2025  
- 📨 **Autor**: Francisco José Herreros (franHR)  
- 📧 **Email**: [desarrollo@pcprogramacion.es](mailto:desarrollo@pcprogramacion.es)  
- 🌐 **Web**: [https://www.pcprogramacion.es](https://www.pcprogramacion.es)  
- 💼 **LinkedIn**: [Francisco José Herreros](https://www.linkedin.com/in/francisco-jose-herreros)  
- 🖥️ **Portfolio**: [https://franhr.pcprogramacion.es/](https://franhr.pcprogramacion.es/)  

---

## 🖼️ Imágenes del proyecto

Aquí puedes añadir capturas de pantalla del frontend y del panel de administración, por ejemplo:

- Página de inicio con grid de productos.
- Detalle de producto.
- Vista de login/registro.
- Panel de administración con la lista de productos.

```md
![Home de Pcpro Eshop](./screenshots/home.png)
![Detalle de producto](./screenshots/product-detail.png)
![Panel de administración](./screenshots/admin-dashboard.png)
```

> Crea la carpeta `screenshots/` en la raíz y añade tus propias imágenes para completar esta sección.

---

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

---

## 🔝 Hashtags recomendados para LinkedIn

Puedes usar estos hashtags al compartir el proyecto en LinkedIn, Instagram u otras redes:

`#React` `#TypeScript` `#Vite` `#TailwindCSS` `#NestJS` `#PostgreSQL` `#FullStackDeveloper` `#WebDevelopment` `#Ecommerce` `#JavaScript` `#NodeJS` `#APIRest` `#Portfolio` `#PCProgramacion` `#DesarrolloWeb` `#Programacion` `#SoftwareDevelopment` `#CleanCode` `#Frontend` `#Backend`