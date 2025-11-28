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

### Ejemplo de Rutas (patrón genérico)

```ts
export const appRouter = createBrowserRouter([
  // Área pública / frontend principal
  {
    path: '/',
    element: <PublicLayout />, // Ej: ShopLayout, MainLayout, FrontLayout...
    children: [
      { index: true, element: <HomePage /> },                 // Página principal
      { path: 'item/:idSlug', element: <DetailPage /> },      // Detalle (producto, post, etc.)
      { path: 'section/:section', element: <SectionPage /> }, // Secciones (categoría, gender, tag...)
    ],
  },

  // Área de autenticación
  {
    path: '/auth',
    element: <AuthLayout />, // Login / registro / recuperación
    children: [
      { index: true, element: <Navigate to="/auth/login" /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },

  // Área de administración
  {
    path: '/admin',
    element: <AdminLayout />, // Panel de administración
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'items', element: <AdminListPage /> },
      { path: 'items/:id', element: <AdminDetailPage /> },
    ],
  },

  // 404 / fallback
  { path: '*', element: <Navigate to="/" /> },
])
```

**Reglas para el router (reutilizable):**

- **Tres áreas principales** en casi todos los proyectos:
  - `/` → layout público (`PublicLayout` o equivalente del proyecto).
  - `/auth` → `AuthLayout` para login/registro.
  - `/admin` → `AdminLayout` para el panel de administración.
- Cada área define sus páginas hijas en `children`.
- Siempre existe una ruta comodín `'*'` que redirige a `/`.
- Los nombres concretos de layouts y páginas (`ShopLayout`, `ProductPage`, etc.) pueden cambiar, pero la **estructura** debe seguir este patrón.

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

## 🌐 7. Peticiones a API (patrón base)

- Usa **Axios** como cliente HTTP y **TanStack Query** para caché, estados de carga y errores.
- Crea un `QueryClient` único, envuelve la app con `QueryClientProvider` y habilita `ReactQueryDevtools` solo en desarrollo.
- Variables sensibles (URLs, tokens) viven en `.env` con prefijo `VITE_` (ej. `VITE_API_URL`).
- El cliente HTTP base vive en `src/api` y se importa en todas las acciones.
- Las **interfaces de dominio y de respuestas** viven en `src/interfaces`.
- Las **acciones** que llaman a la API viven en `src/shop/actions` (o `src/<modulo>/actions`).
- Los **hooks de datos** (React Query) viven en `src/shop/hooks` (o `src/<modulo>/hooks`).

### 7.1 Cliente Axios base (`src/api`)

- Define un único cliente Axios reutilizable.
- La `baseURL` siempre viene de las variables de entorno.
- Aquí es donde se configuran **interceptores** de auth, logging, etc.

```ts
// src/api/miProyectoApi.ts
import axios from "axios"

export const miProyectoApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Aquí se pueden añadir interceptores si hace falta
// Ejemplo de patrón recomendado:
// - Leer token de localStorage.
// - Si existe, añadir `Authorization: Bearer <token>`.
// - Devolver siempre la config modificada.
```

### 7.2 Interfaces de dominio y de respuesta (`src/interfaces`)

- Cada recurso importante debe tener:
  - **Interface de dominio** (`Product`, `User`, etc.).
  - **Interface de respuesta** de la API (`ProductsResponse`, `UsersResponse`, etc.).
- Se tipan siempre las respuestas de Axios usando estas interfaces.

```ts
// src/interfaces/product.interface.ts
export interface Product {
  id: string
  title: string
  // ...resto de propiedades
}

// src/interfaces/products.response.ts
import type { Product } from "./product.interface"

export interface ProductsResponse {
  count: number
  pages: number
  products: Product[]
}
```

### 7.3 Acciones de API (`src/shop/actions`)

- **Una acción por endpoint** importante.
- La acción **no sabe nada de React**: solo recibe parámetros, llama a la API y devuelve datos tipados.
- Siempre tipar la respuesta de Axios (`get<MiRespuesta>`, `post<MiRespuesta>`).
- La URL base viene del cliente (`miProyectoApi`); en las acciones solo se usan rutas relativas (`"/products"`, `"/auth/login"`, etc.).
- Los **query params** (paginación, filtros, búsquedas) se pasan en `params` del request.
- Cualquier transformación derivada (ej. construir URLs completas de imágenes desde nombres de fichero) se hace **dentro de la acción**.

### 7.4 Hooks de datos con TanStack Query (`src/shop/hooks`)

- Un hook por recurso: `useProducts`, `useProductBySlug`, `useUsers`, etc.
- El hook solo define:
  - `queryKey` (incluyendo los parámetros: página, filtros, etc.).
  - `queryFn` que llama a la acción correspondiente.
  - Opciones como `staleTime` y `enabled`.
- El hook devuelve el objeto de React Query (`data`, `isLoading`, `error`, etc.) y nunca llama directo a Axios.

### 7.5 Configuración global de TanStack Query

1. **Crear la instancia de `QueryClient` (una sola vez)**

   En el entry point principal de la app (por ejemplo `src/App.tsx` o `src/MiProyectoApp.tsx`):

   ```tsx
   import { RouterProvider } from "react-router"
   import { appRouter } from "./app.router"
   import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
   import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

   const queryClient = new QueryClient()

   export const MiProyectoApp = () => {
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

### 7.6 Uso de TanStack Query para auth global

- Además de los datos de negocio (productos, etc.), se puede usar React Query para **controlar la sesión**.
- Patrón recomendado:
  - Crear un componente `CheckAuthProvider` que:
    - Viva dentro de `QueryClientProvider` y **por encima** de `RouterProvider`.
    - Use `useQuery` con una `queryKey` estable (por ejemplo `['auth']`).
    - Use como `queryFn` una función `checkAuthStatus` proveniente del store de Zustand.
    - Mientras `isLoading` sea `true`, muestre un loading de pantalla completa.
    - Cuando termine, renderice el árbol de rutas normalmente.
- De esta forma, cada vez que arranca la app o se recarga, la sesión se valida/renueva automáticamente antes de montar las páginas.

### 7.6 (Preparado) Consumo de datos en páginas

- Las páginas (`HomePage`, `GenderPage`, etc.) **no llaman directamente a Axios**.
- Siempre consumen la API a través de **hooks** (`useProducts`, `useProductBySlug`, etc.).
- En la siguiente sección de la guía se detallará cómo usar estos hooks dentro de las páginas, cómo combinarlo con paginación y filtros vía URL (`useSearchParams`) y cómo tipar correctamente las props de los componentes de UI.

---

## 🔐 8. Autenticación: Login con JWT

### 8.1 Interface de respuesta de auth

- Interface `AuthResponse` en `src/auth/interface/auth.response.ts`:
  - Siempre contiene al menos: `user: User` y `token: string`.
  - `User` viene de `src/interfaces/user.interface.ts`.

### 8.2 Action de login (`src/auth/actions`)

- Action `loginAction(email, password): Promise<AuthResponse>` en `src/auth/actions/login.actions.ts`.
- Usa el cliente Axios base (`miProyectoApi`) con ruta relativa `/auth/login`.
- Tipar siempre la respuesta con `<AuthResponse>`.
- Capturar errores con `try/catch` y **relanzar**; la UI se encarga de mostrar el error.

### 8.3 Almacenamiento del token JWT (con o sin store)

- La UI (página de login o store) decide qué hacer con `AuthResponse`:
  - Guardar `token` (`localStorage`, cookies, etc.).
  - Guardar `user` en un estado global (store) si hace falta.
  - Redirigir al usuario (`navigate("/")`, por ejemplo).
- Regla general: las actions de auth solo devuelven datos tipados; **no navegan ni muestran toasts**.

### 8.4 Comprobación y renovación de sesión (`check-auth`)

- Debe existir una action de auth tipo `checkAuthAction` que:
  - Lea el `token` desde `localStorage`.
  - Si no hay token, lance un error claro (no autenticado).
  - Llame a un endpoint como `/auth/check-status` para validar/renovar la sesión.
  - Si el backend devuelve un nuevo `token`, lo vuelva a guardar en `localStorage`.
  - Si la validación falla, elimine el `token` de `localStorage` y lance un error de sesión expirada/no válida.
- Esta action se usa típicamente al arrancar la app o al recargar para restaurar la sesión del usuario.

### 8.5 Integración auth: actions + Zustand + React Query

- Piezas y responsabilidades:
  - **Actions de auth** (`loginAction`, `checkAuthAction`): solo llaman a la API y devuelven datos tipados.
  - **Store de auth (Zustand)**: expone `login`, `logout`, `checkAuthStatus`, gestiona `user`, `token` y `AuthStatus`.
  - **React Query**: a través de `CheckAuthProvider`, ejecuta `checkAuthStatus` al inicio y controla el estado de carga.
- Flujo típico al arrancar la app:
  1. `QueryClientProvider` envuelve la app.
  2. `CheckAuthProvider` usa `useQuery(['auth'], checkAuthStatus)`.
  3. `checkAuthStatus` llama internamente a `checkAuthAction` y actualiza el store (`user`, `token`, `AuthStatus`).
  4. Mientras la query está en `isLoading`, se muestra un loading de pantalla completa.
  5. Cuando termina, se monta el router y las páginas ya saben si el usuario está `authenticated` o `not-authenticated` a través del store.

---

## 🔔 9. Notificaciones globales con sonner

- Librería estándar para notificaciones: **sonner** (`npm install sonner`).
- En la app raíz siempre debe existir un `<Toaster />` (ej. en `TesloShopApp`), junto al router y a `QueryClientProvider`.
- Reglas de uso:
  - Las páginas y componentes usan `toast.success`, `toast.error`, etc. para feedback al usuario.
  - El login muestra errores de credenciales con `toast.error`.
  - Las actions **no** usan `toast` directamente.

---

## 🧠 10. Gestor de estado global con Zustand (TypeScript)

- Gestor de estado global por defecto: **Zustand** (`npm install zustand`).
- Siempre usar **TypeScript** para los tipos de estado y acciones.

### 10.1 Reglas generales de los stores

- Un store por dominio principal: `auth.store.ts`, `cart.store.ts`, etc.
- Cada store define:
  - Un tipo `State` (propiedades y acciones) totalmente tipado.
  - Acciones asincrónicas que llaman a las **actions** de API.
  - Sincronización opcional con `localStorage` (token, carrito, etc.).
- Los componentes consumen el estado usando `useXStore((state) => ...)`.

### 10.2 Patrón para auth.store

- Archivo: `src/auth/store/auth.store.ts`.
- Debe exponer al menos:
  - `user: User | null`.
  - `token: string | null`.
  - `login(email: string, password: string): Promise<boolean>`.
- `login`:
  - Usa `loginAction` para hablar con la API.
  - Actualiza `user` y `token` en el store.
  - Gestiona `localStorage` con el token.
  - Devuelve `true/false` para que la UI decida navegar o mostrar error con `toast`.
- `logout` (recomendado):
  - Elimina el `token` de `localStorage`.
  - Pone `user` y `token` a `null` en el store.
- Estado de autenticación:
  - Usar un tipo `AuthStatus = 'authenticated' | 'not-authenticated' | 'checking'` dentro del store.
  - `checking`: mientras se ejecuta `checkAuthAction` al iniciar la app.
  - `authenticated`: cuando `checkAuthAction` o `login` devuelven un usuario válido.
  - `not-authenticated`: cuando no hay token o la validación/`checkAuthAction` falla.

### 10.3 Autorización por roles con Zustand y rutas protegidas

- El tipo `User` debe incluir un campo de roles (por ejemplo `roles: string[]`).
- En el store de auth se definen **getters de autorización**, por ejemplo:
  - `isAdmin(): boolean` → devuelve `true` si el usuario actual tiene el rol `"admin"`.
- Reglas para usar estos getters:
  - Los componentes de UI (ej. headers, menús) solo leen getters como `isAdmin()` y `AuthStatus` para decidir qué mostrar.
  - La lógica de “quién puede ver qué” no se repite en cada componente; vive en el store.
- Rutas protegidas recomendadas (en `src/components/routes/ProtectedRoutes.tsx`):
  - `AuthenticatedRoute` → solo deja pasar a usuarios con `AuthStatus === 'authenticated'` (sino redirige a `/auth/login`).
  - `NotAuthenticatedRoute` → bloquea vistas de auth para usuarios ya autenticados (redirige a `/`).
  - `AdminRoute` → solo deja pasar cuando `AuthStatus === 'authenticated'` y `isAdmin() === true` (sino redirige a `/auth/login` o `/`).
- Integración en el router:
  - El layout de `/auth` se envuelve con `NotAuthenticatedRoute`.
  - El layout de `/admin` se envuelve con `AdminRoute`.
  - Otras zonas protegidas pueden usar `AuthenticatedRoute` según lo requiera el proyecto.

---

## 🧮 11. Utils y helpers puros (`src/lib`)

- Carpeta recomendada: `src/lib` o `src/utils` para funciones puras reutilizables.
- No dependen de React, ni de Zustand, ni de React Router; **solo reciben datos y devuelven datos**.
- Se importan desde cualquier parte de la app (páginas, componentes, stores, actions).



### 11.1 Otros tipos de utils recomendados

- **Helpers de monedas**:
  - Funciones como `currencyFormatter`, para euros ......, etc.
- **Helpers de validación**:
  - Funciones como `isValidEmail`, `isStrongPassword`, etc.
  - Usadas tanto en formularios como en lógica de negocio.
- **Helpers de mapeo/transforms**:
  - Funciones que transforman respuestas de API a modelos de dominio (`mapProductFromApi`, etc.).
  - Viven aquí si son reutilizables en varias acciones o stores.
- **Regla general**:
  - Si una lógica no necesita React ni estado global, y se reutiliza en más de un sitio, debería extraerse a `src/lib` como helper puro.

---

## 🖼️ 12. Subida de imágenes reutilizable en proyectos React

Esta sección define **cómo quiero que se implemente SIEMPRE** la subida de imágenes en cualquier proyecto React (con TypeScript o JavaScript) para que la IA siga exactamente este patrón.

### 12.1 Objetivo del patrón

- Subir una o varias imágenes desde un formulario React.
- Enviar los ficheros al backend como `FormData` usando Axios.
- Mantener el formulario **controlado y tipado** (idealmente con `react-hook-form`).
- Poder reutilizar este patrón en productos, posts de blog, perfiles de usuario, banners, etc.
- Respetar buenas prácticas de **UX**, **SEO** y **rendimiento (Core Web Vitals)**.

### 12.2 Estructura general frontend

Reglas generales que la IA debe seguir:

- El formulario principal usa `react-hook-form` con un tipo que extienda el modelo base y añada `files?: File[]`.
- El componente de formulario recibe vía props:
  - `onSubmit: (dataLike: Partial<Entidad> & { files?: File[] }) => Promise<void>`
  - `isPending: boolean` para deshabilitar el botón mientras se envía.
- El estado local para previsualizar/gestionar las imágenes se maneja con `useState<File[]>`.
- El input de fichero **no se controla directamente** por React, sino que se sincroniza con `react-hook-form` usando `setValue('files', ...)`.
- Siempre se soportan **dos formas de selección**:
  - Click en botón `Subir imágenes` → abre el `input[type="file"]` oculto.
  - **Drag & drop** sobre una zona claramente marcada.

### 12.3 Tipado del formulario con imágenes

- Para cualquier entidad que vaya a tener imágenes, el tipo de inputs debe seguir este patrón:

```ts
// interface base (ej: Product, Post, UserProfile...)
interface EntityBase {
  id: string
  title: string
  // ...otras propiedades del recurso
}

// Tipo para el formulario (extiende la entidad base)
interface EntityFormInputs extends EntityBase {
  files?: File[] // imágenes nuevas seleccionadas en el cliente
}
```

- `useForm<EntityFormInputs>({ defaultValues: entidad })`.
- Al enviar el formulario, se pasa un `Partial<EntityBase> & { files?: File[] }` a la action.

### 12.4 Manejo del input de archivos y drag & drop

Reglas a seguir por la IA:

- Siempre habrá:
  - Un `input` con `type="file"`, `multiple` y `accept="image/*"`.
  - Un contenedor visual de drag & drop que gestione los eventos `dragenter`, `dragover`, `dragleave`, `drop`.
- Al seleccionar o soltar archivos:
  - Se actualiza el estado local `files: File[]`.
  - Se actualiza `setValue('files', [...(getValues('files') || []), ...filesNuevos])`.

Pseudocódigo de comportamiento (independiente de estilos):

```ts
const [files, setFiles] = useState<File[]>([])

const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const selected = event.target.files
  if (!selected) return

  const newFiles = Array.from(selected)
  setFiles(prev => [...prev, ...newFiles])

  const current = getValues('files') || []
  setValue('files', [...current, ...newFiles])
}

const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault()
  event.stopPropagation()

  const dropped = event.dataTransfer.files
  if (!dropped) return

  const newFiles = Array.from(dropped)
  setFiles(prev => [...prev, ...newFiles])

  const current = getValues('files') || []
  setValue('files', [...current, ...newFiles])
}
```

- Se puede usar un estado `dragActive: boolean` para cambiar el estilo cuando el usuario arrastra ficheros sobre la zona de drop.

### 12.5 Envío al backend: uso obligatorio de `FormData`

Todas las actions de subida de imágenes deben seguir estas reglas:

- La action nunca recibe directamente un `FormData` desde la UI.
- La action recibe un objeto de datos tipados (`Partial<EntityBase> & { files?: File[] }`).
- Dentro de la action se construye el `FormData`.

Patrón genérico de action:

```ts
interface EntityPayload {
  id?: string
  title?: string
  // ...otros campos
  files?: File[]
}

export const saveEntityWithImages = async (data: EntityPayload): Promise<EntityBase> => {
  const formData = new FormData()

  if (data.title) formData.append('title', data.title)
  // Añadir aquí el resto de campos escalares (price, stock, description, etc.)

  if (data.files && data.files.length > 0) {
    for (const file of data.files) {
      formData.append('files', file)
    }
  }

  const { data: entity } = await miProyectoApi.post<EntityBase>('/entities', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return entity
}
```

Reglas importantes:

- **Siempre** usar `FormData` para enviar ficheros, nunca JSON plano.
- No mezclar `JSON.stringify` con `FormData` salvo que el backend lo requiera explícitamente.
- Tipar la respuesta (`<EntityBase>`) para que el resto de la app tenga tipos fuertes.

### 12.6 URLs de imágenes y transformación de respuestas

- El backend puede devolver:
  - Nombres de fichero (`"image-123.jpg"`).
  - Rutas relativas (`"/uploads/products/image-123.jpg"`).
  - URLs absolutas (`"https://cdn.midominio.com/products/image-123.jpg"`).

Regla para la IA:

- Si el backend devuelve **nombres de fichero o rutas relativas**, crear un helper en `src/lib` para construir la URL completa:

```ts
// src/lib/image-url.ts

const BASE_URL = import.meta.env.VITE_PUBLIC_IMAGES_URL

export const buildImageUrl = (path: string): string => {
  if (!path) return ''
  return `${BASE_URL}/${path}`.replace(/([^:]\/\\)/g, '/') // normaliza barras si hace falta
}
```

- Todas las acciones que reciban imágenes del backend deben usar este helper antes de devolver los datos a la UI.
- De esta forma, todos los componentes de presentación (`<img />`, `<Image />`) reciben ya URLs completas listas para usar.

### 12.7 SEO y rendimiento para imágenes

Reglas obligatorias para la IA cuando renderiza imágenes en componentes:

- Usar siempre atributos `alt` **descriptivos y optimizados para SEO**.
- Definir `width` y `height` para evitar **CLS**.
- Para proyectos Next.js, usar `next/image` con:
  - `priority` en imágenes críticas (hero).
  - `placeholder="blur"` cuando sea posible.
- Preferir formatos `WebP` o `AVIF` cuando el backend/infra lo permitan.
- Imágenes OG y sociales con tamaño recomendado **1200x630 px** y peso < 300KB.

Ejemplo genérico en React clásico:

```tsx
<img
  src={buildImageUrl(imagePath)}
  alt="Descripción clara de la imagen para SEO"
  width={800}
  height={600}
  loading="lazy" // lazy-load para imágenes no críticas
/>
```

### 12.8 UX: lista de imágenes seleccionadas y borrado local

- Siempre que se permitan múltiples imágenes, la UI debe mostrar:
  - Lista de ficheros seleccionados (nombre, tamaño opcional).
  - O miniaturas si es posible (`URL.createObjectURL(file)`).
  - Botón para eliminar una imagen de la selección **antes** de enviar.

Pseudocódigo para eliminar localmente una imagen:

```ts
const removeFile = (index: number) => {
  const current = getValues('files') || []
  const updated = current.filter((_, i) => i !== index)
  setFiles(updated)
  setValue('files', updated)
}
```

- El borrado permanente en servidor (eliminar imagen ya subida) se gestionará con una action específica del backend (ej. `DELETE /files/:id`), pero **no** se mezcla con el borrado local del formulario.

### 12.9 Integración con React Query

- Las acciones que crean/actualizan entidades con imágenes se pueden envolver con `useMutation`:
  - La mutation recibe `EntityPayload`.
  - Internamente llama a `saveEntityWithImages`.
  - En `onSuccess`, se invalidan queries relacionadas (ej. `['entities']`).
  - La UI usa `isPending`/`isLoading` para deshabilitar el botón de `Guardar`.

Regla para la IA:

- Todas las operaciones de **creación/edición** que incluyan imágenes deben pasar por mutation de React Query o un patrón equivalente, nunca se llama Axios directo desde el componente.

---

Esta guía cubre:

- React Router + Lazy Loading
- Layouts y estructura de carpetas
- Buenas prácticas de export/import
- Peticiones a API con Axios y React Query siguiendo el patrón `api → interfaces → actions → hooks`.
- Autenticación básica con JWT usando actions de auth y almacenamiento de token.
- Sistema de notificaciones global con sonner.
- Gestión de estado global con Zustand y TypeScript.
- Utils/helpers puros en `src/lib` (formateadores, validadores, transforms reutilizables).
- **Subida de imágenes reutilizable** con React, `react-hook-form`, Axios (`FormData`) y helpers de URLs pensando en SEO y rendimiento (Core Web Vitals).
