# 📘 GUÍA BASE DE DESARROLLO REACT

## 🚀 1. Enrutamiento con React Router + Lazy Loading

Usar `react-router-dom` (v6+) y `lazy()` de React para cargar páginas bajo demanda.

### Instalación

```bash
npm install react-router-dom
```

---

## 🧭 2. Definición del Router Principal

El router se define en `src/router/appRouter.jsx`.

```jsx
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'

// Layouts
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'

// Páginas (cargadas con lazy)
const HomePage = lazy(() => import('@/pages/home/HomePage'))
const AboutPage = lazy(() => import('@/pages/about/AboutPage'))
const AdminPage = lazy(() => import('@/pages/admin/AdminPage'))

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminPage /> },
    ],
  },
])
```

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

Cada página debe exportar el componente como **named export** y también como **default export** con el mismo nombre.

```jsx
export const HomePage = () => {
  return <div>Home Page</div>
}

export default HomePage
```

---

## 🧰 5. Componentes Reutilizables

Los proyectos deben componerse de **componentes reutilizables y modulares**, evitando archivos con demasiado código.

### Tipos recomendados

| Tipo | Descripción | Ejemplo |
|------|--------------|---------|
| Comunes | Elementos globales como Header, Footer, Sidebar | `components/common/Header.jsx` |
| UI / Atómicos | Botones, inputs, modales, etc. | `components/ui/Button.jsx` |
| Específicos de módulo | Componentes propios de una sección | `pages/admin/components/DashboardCard.jsx` |

#### Ejemplo de Header

```jsx
export const Header = () => {
  return (
    <header className="header">
      <h1>My App</h1>
    </header>
  )
}

export default Header
```

#### Uso en Layout

```jsx
import { Outlet } from 'react-router-dom'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
```

---

## ⚙️ 6. Buenas Prácticas Generales

- Usar `lazy()` para todas las páginas que no deban cargarse inicialmente.  
- Carpetas y archivos deben usar **PascalCase**.  
- Importar con alias `@/` para paths absolutos.  
- Cada componente debe estar en su propio archivo.  
- Mantener los componentes **pequeños, reutilizables y enfocados**.  
- Layouts deben incluir `<Outlet />` para renderizar rutas hijas.

---

## 🌐 7. Peticiones a API

Para manejar datos desde un servidor vamos a combinar **Axios** (realiza las peticiones) con **TanStack Query (React Query)** (gestiona caché, estados de carga y errores). Sigue los pasos en orden y podrás reutilizar este esquema en cualquier proyecto similar.

### 7.1 Instalación base

```bash
npm install axios @tanstack/react-query
```

### 7.2 Configura el archivo principal `src/HeroesApp.tsx`

Este archivo es el punto de entrada de la aplicación. Crea un `QueryClient`, envuélvelo con `QueryClientProvider` y habilita las devtools para depurar las peticiones.

```tsx
import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Crea una instancia única para toda la app
const queryClient = new QueryClient()

export const HeroesApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRouter} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
```

### 7.3 Prepara tu variable de entorno

Crea (o edita) el archivo `.env` y define la URL base de tu API. Usa un nombre descriptivo.

```bash
VITE_API_BASE_URL=<URL_DE_TU_API>
```

### 7.4 Cliente Axios reutilizable

```jsx
// src/api/axiosClient.js
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})
```

### 7.5 Hook con TanStack Query

```jsx
// src/api/hooks/useExampleQuery.js
import { useQuery } from '@tanstack/react-query'
import { axiosClient } from '../axiosClient'

export const useExampleQuery = () => {
  return useQuery(['exampleData'], async () => {
    const { data } = await axiosClient.get('/example')
    return data
  })
}
```

#### Uso en un componente sencillo

```jsx
import { useExampleQuery } from '@/api/hooks/useExampleQuery'

export const ExampleComponent = () => {
  const { data, isLoading, error } = useExampleQuery()

  if (isLoading) return <div>Cargando...</div>
  if (error) return <div>Ocurrió un error al obtener los datos</div>

  return (
    <div>
      {data.map(item => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  )
}
```

#### Uso real en una página con `useQuery`

Cuando necesites invocar directamente la acción `getHeroesByPageAction()` dentro de una página (por ejemplo, `src/heroes/pages/home/HomePage.tsx`), declara el hook `useQuery` así:

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['heroes'],
  queryFn: () => getHeroesByPageAction(),
  staleTime: 1000 * 60 * 5,
})
```

- `queryKey`: Identificador único del fetch. Si cambias la clave, TanStack Query entiende que debe volver a pedir los datos.
- `queryFn`: Función asíncrona que trae la información. Aquí aprovechamos la acción `getHeroesByPageAction()` para mantener la lógica de peticiones centralizada.
- `staleTime`: Tiempo en milisegundos durante el cual los datos se consideran frescos. Mientras no expire, TanStack Query reutiliza la respuesta cacheada y evita llamar a la API.

Con este patrón puedes reutilizar la misma acción y configuración en cualquier vista: solo cambia la clave y la función según el recurso que quieras consumir.

### 7.6 Instalación del plugin de ESLint para TanStack Query

```bash
npm i -D @tanstack/eslint-plugin-query
```

### 7.7 Instalación de las Devtools de TanStack Query

```bash
npm i @tanstack/react-query-devtools
```

---

Esta guía cubre:

- React Router + Lazy Loading  
- Layouts y estructura de carpetas  
- Componentes reutilizables  
- Buenas prácticas de export/import  
- Peticiones a API con Axios y React Query

