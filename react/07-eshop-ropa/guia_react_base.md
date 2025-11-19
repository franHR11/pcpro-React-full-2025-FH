# 📘 GUÍA BASE DE DESARROLLO REACT

## 🎨 0. Tailwind CSS base

1. Instalar dependencias

```bash
npm install tailwindcss @tailwindcss/vite
```

2. Configurar Vite con el plugin oficial

```ts
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```

3. Importar Tailwind en tu hoja global (ej. `src/index.css`)

```css
@import "tailwindcss";
```

---

## 🧩 0.1 Shadcn UI

1. Ejecuta la inicialización y sigue el asistente (elige el esquema neutral por defecto):
   ```bash
   npx shadcn@latest init
   ```
2. Asegura el alias `@/*` tanto en `tsconfig.json` como en `tsconfig.app.json` (requerido para los imports de la librería):
   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "@/*": [
           "./src/*"
         ]
       }
     }
   }
   ```
3. Refuerza el alias en `vite.config.ts` para que Vite entienda `@` durante el build:
   ```ts
   import path from "path"
   import tailwindcss from "@tailwindcss/vite"
   import react from "@vitejs/plugin-react"
   import { defineConfig } from "vite"

   export default defineConfig({
     plugins: [react(), tailwindcss()],
     resolve: {
       alias: {
         "@": path.resolve(__dirname, "./src"),
       },
     },
   })
   ```
4. Para agregar componentes individuales usa:
   ```bash
   npx shadcn@latest add <nombre-del-componente>
   ```

---

## 🚀 1. Enrutamiento base

- Usa `react-router-dom` (v6+) como dependencia principal.
- Carga layouts y páginas con `lazy()` para optimizar el primer render.
- El router vive en `src/router/appRouter.jsx` o `src/app.router.tsx`.
- Siempre expón un `RouterProvider` en el entry point de la app.

## 🧭 2. Estructura del router

- `createBrowserRouter` con tres áreas principales:
  1. `"/"` con `ShopLayout` y rutas hijas: `index`, `product/:idSlug`, `gender/:gender`.
  2. `"/auth"` con `AuthLayout`, redirección inicial a `login`, rutas `login` y `register`.
  3. `"/admin"` con `AdminLayout`, rutas `index`, `products`, `products/:id`.
- Añade ruta comodín `"*"` que redirige a `/`.
- Importa los layouts de forma perezosa (`lazy(() => import(...))`).
- Las páginas se cargan con `lazy()` y se ubican bajo `@/shop`, `@/auth` y `@/admin`.

### Variante sin DOM

- Si el proyecto usa únicamente `react-router`, importa `createBrowserRouter` y `Navigate` desde `react-router`.
- La estructura de rutas y la carga perezosa se mantienen idénticas; solo cambia el paquete.
- Ideal para setups SSR/SSG propios donde controlas el renderizado.

### Ejemplo de Rutas

exportconstappRouter=createBrowserRouter([

    // Rutas Publicas

    {

    path: '/',

    element:`<Shoplayaut/>`,

    children: [

    {

    index: true,

    element:`<HomePage/>`

    },

    {

    path: 'product/:idSlug',

    element:`<ProductPage/>`

    },

    {

    path: 'gender/:gender',

    element:`<GenderPage/>`

    }

    ]

    },

    // Auth Rutas

    {

    path: '/auth',

    element:`<AuthLayout/>`,

    children: [

    {

    index: true,

    element: <Navigateto="/auth/login"/>

    },

    {

    path: 'login',

    element:`<LoginPage/>`

    },

    {

    path: 'register',

    element:`<RegisterPage/>`

    }

    ]

    },

    // Admin Rutas

    {

    path: '/admin',

    element:`<AdminLayout/>`,

    children: [

    {

    index: true,

    element:`<DashboardPage/>`

    },

    {

    path: 'products',

    element:`<AdminProductsPage/>`

    },

    {

    path: 'products/:id',

    element:`<AdminProductPage/>`

    }

    ]

    },

    {

    path: '*',

    element: <Navigateto='/'/>

    }

])

---

## 🧱 3. Estructura de Carpetas Recomendada

```
src/
├─ layouts/
│  ├─ MainLayout.jsx
│  └─ AdminLayout.jsx
│
├─ components/
│  ├─ ui/
│  │  ├─ Button.jsx
│  │  ├─ Input.jsx
│  │  └─ Modal.jsx
│  ├─ common/
│  │  ├─ Header.jsx
│  │  ├─ Footer.jsx
│  │  └─ Sidebar.jsx
│  └─ ...
│
├─ pages/
│  ├─ home/
│  │  └─ HomePage.jsx
│  ├─ about/
│  │  └─ AboutPage.jsx
│  └─ admin/
│     └─ AdminPage.jsx
│
├─ api/
│  ├─ axiosClient.js
│  └─ hooks/
│     └─ useExampleQuery.js
│
└─ router/
   └─ appRouter.jsx
```

---

## 🧩 4. Definición de una Página

- Cada página exporta el componente como **named export** y también como **default export** con el mismo nombre.
- Mantén las páginas enfocadas en UI y delega la lógica a hooks o helpers reutilizables.

---

## 🧰 5. Componentes Reutilizables

Los proyectos deben componerse de **componentes reutilizables y modulares**, evitando archivos con demasiado código.

### Tipos recomendados

| Tipo                    | Descripción                                    | Ejemplo                                      |
| ----------------------- | ----------------------------------------------- | -------------------------------------------- |
| Comunes                 | Elementos globales como Header, Footer, Sidebar | `components/common/Header.jsx`             |
| UI / Atómicos          | Botones, inputs, modales, etc.                  | `components/ui/Button.jsx`                 |
| Específicos de módulo | Componentes propios de una sección             | `pages/admin/components/DashboardCard.jsx` |

#### Buenas prácticas para componentes

- Header y Footer viven en `components/common`.
- Componentes UI genéricos van a `components/ui`.
- Componentes específicos de módulo se organizan dentro de cada página o layout.
- Los layouts siempre exponen `<Outlet />` y encapsulan los componentes comunes (Header, Footer, Sidebar).

---

## ⚙️ 6. Buenas Prácticas Generales

- Usar `lazy()` para todas las páginas que no deban cargarse inicialmente.
- Carpetas y archivos deben usar **PascalCase**.
- Importar con alias `@/` para paths absolutos.
- Cada componente debe estar en su propio archivo.
- Mantener los componentes **pequeños, reutilizables y enfocados**.
- Layouts deben incluir `<Outlet />` para renderizar rutas hijas.

### 🌐 URLización del estado

- Todo estado que pueda compartirse mediante un enlace o deba persistir entre recargas debe vivir en la URL.
- Usa `useSearchParams` para filtros, búsqueda, paginación y ordenación (ej. `FilterSidebar`, `ProductsGrid`).
- Usa segmentos dinámicos (`/productos/ordenadores/portatiles`, `/blog/javascript/react-hooks`) cuando la ruta describa el recurso o jerarquía.
- Beneficios: vistas reproducibles, navegación coherente, SEO optimizado y sincronía entre UI y routing.

---

## 🌐 7. Peticiones a API

- Usa **Axios** como cliente HTTP y **TanStack Query** para caché, estados de carga y errores.
- Crea un `QueryClient` único, envuelve la app con `QueryClientProvider` y habilita `ReactQueryDevtools` solo en desarrollo.
- Variables sensibles (URLs, tokens) viven en `.env` con prefijo `VITE_`.
- Implementa un `axiosClient` reutilizable en `src/api/axiosClient.ts` y expone hooks por recurso en `src/api/hooks/`.
- Cada hook define `queryKey`, `queryFn` y `staleTime` según el recurso.
- Maneja estados `isLoading` y `error` dentro de los componentes que consumen los hooks.

### 7.1 configuración de TanStack Query

1. **Crear la instancia de `QueryClient` (una sola vez)**

   En tu entry point principal de la app (por ejemplo `src/TesloShopApp.tsx`), crea una instancia única:

   ```tsx
   import { RouterProvider } from "react-router"
   import { appRouter } from "./app.router"
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
   import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

   const queryClient = new QueryClient()

   export const TesloShopApp = () => {
     return (
       <QueryClientProvider client={queryClient}>
         <RouterProvider router={appRouter} />
         <ReactQueryDevtools initialIsOpen={false} />
       </QueryClientProvider>
     )
   }
   ```

   - La **instancia** `const queryClient = new QueryClient()` debe crearse **fuera** del componente para que sea siempre la misma entre renders.
   - Toda la app (router, layouts, páginas) debe ir envuelta por `QueryClientProvider` para poder usar los hooks de TanStack Query.

Esta guía cubre:

- React Router + Lazy Loading
- Layouts y estructura de carpetas
- Buenas prácticas de export/import
- Peticiones a API con Axios y React Query
