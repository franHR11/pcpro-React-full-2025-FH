# Pcpro Eshop Ropa – Guía de instalación y ejecución

Proyecto compuesto por **backend NestJS** y **frontend React + Vite**.

- Backend: `backend-teslo-shop`
- Frontend: `Pcpro-Eshop`

> **Importante:** este proyecto necesita que el backend y el frontend estén corriendo a la vez. El frontend consume la API del backend.

---

## 1. Requisitos previos

- **Node.js** (recomendado ≥ 18.x; el backend indica `"node": "17.x"`, por lo que cualquier versión 18+ LTS suele funcionar bien)
- **npm** (incluido con Node)
- **PostgreSQL** instalado y en ejecución
- Puerto **3000** libre para el backend
- Puerto **5173** (por defecto Vite) libre para el frontend

---

## 2. Estructura del proyecto

```text
07-eshop-ropa/
  backend-teslo-shop/   # API NestJS + PostgreSQL
  Pcpro-Eshop/          # Frontend React + Vite
```

---

## 3. Configuración del backend (`backend-teslo-shop`)

Ruta: `./backend-teslo-shop`

### 3.1. Instalar dependencias

En una terminal, ubicarse en la carpeta `backend-teslo-shop` y ejecutar:

```bash
npm install
```

### 3.2. Configurar variables de entorno

1. En la carpeta `backend-teslo-shop` tienes:

   - `.env.template`
   - `.env` (puede existir ya, pero se recomienda revisar)

2. **Si no existe `.env` o quieres partir de cero:**

   - Copia/renombra `/.env.template` a `/.env`.

3. Abre el archivo `.env` y ajusta los valores según tu entorno de PostgreSQL:

```env
STAGE=dev

DB_PASSWORD=MySecr3tPassWord@as2
DB_NAME=TesloDB
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres

PORT=3000
HOST_API=http://localhost:3000/api

JWT_SECRET=Est3EsMISE3Dsecreto32s
```

- **STAGE**: entorno actual, normalmente `dev`.
- **DB_HOST**: servidor de PostgreSQL, normalmente `localhost`.
- **DB_PORT**: puerto de PostgreSQL, por defecto `5432`.
- **DB_NAME**: nombre de la base de datos que usarás para el proyecto.
- **DB_USERNAME** / **DB_PASSWORD**: credenciales de acceso a tu base de datos.
- **PORT**: puerto en el que se levantará el backend NestJS (por defecto `3000`).
- **HOST_API**: URL base de la API (debe apuntar al mismo host/puerto donde corre NestJS).
- **JWT_SECRET**: cadena secreta usada para firmar los tokens JWT (cámbiala por una propia en producción).

> **Nota:** Asegúrate de que la base de datos `DB_NAME` existe en PostgreSQL o que tu configuración de TypeORM permita crearla/actualizarla.

### 3.3. Ejecutar el backend en desarrollo

Con la base de datos PostgreSQL corriendo y el `.env` configurado, en `backend-teslo-shop` ejecuta:

```bash
npm run start:dev
```

Esto levantará el servidor NestJS en:

- API base: `http://localhost:3000/api`

También dispones de otros scripts útiles:

```bash
npm run build      # compilar a dist
npm run start      # ejecutar versión compilada (dist/main)
npm run start:prod # modo producción (requiere build previa)
```

---

## 4. Configuración del frontend (`Pcpro-Eshop`)

Ruta: `./Pcpro-Eshop`

### 4.1. Instalar dependencias

En otra terminal, ubicarse en la carpeta `Pcpro-Eshop` y ejecutar:

```bash
npm install
```

### 4.2. Configurar variables de entorno del frontend

En `Pcpro-Eshop` tienes un archivo `.env` (si no existe, créalo). Debe contener al menos:

```env
VITE_API_URL=http://localhost:3000/api
```

- **VITE_API_URL**: debe apuntar al endpoint público de la API del backend. Si cambias el puerto o el host del backend, actualiza también este valor.

> **Importante:** en Vite todas las variables de entorno accesibles desde el frontend deben empezar por `VITE_`.

### 4.3. Ejecutar el frontend en desarrollo

Con el backend corriendo y el `.env` configurado, en `Pcpro-Eshop` ejecuta:

```bash
npm run dev
```

Vite mostrará en la terminal la URL local, normalmente:

- Frontend: `http://localhost:5173`

Abre esa URL en el navegador.

---

## 5. Orden recomendado para levantar todo el proyecto

1. **Iniciar PostgreSQL** y asegurarte de que la base de datos configurada existe.
2. **Configurar backend**:
   - Renombrar `backend-teslo-shop/.env.template` → `backend-teslo-shop/.env` (si es necesario).
   - Ajustar las variables `DB_*`, `HOST_API`, `PORT`, `JWT_SECRET`, etc.
3. **Levantar backend**:

   En `backend-teslo-shop`:

   ```bash
   npm install
   npm run start:dev
   ```

4. **Configurar frontend**:
   - Crear/editar `Pcpro-Eshop/.env` con:
     ```env
     VITE_API_URL=http://localhost:3000/api
     ```
5. **Levantar frontend**:

   En `Pcpro-Eshop`:

   ```bash
   npm install
   npm run dev
   ```

6. Abrir el navegador en la URL que indica Vite, por ejemplo `http://localhost:5173`.

---

## 6. Notas adicionales

- No subas jamás los archivos `.env` a Git (ya está contemplado normalmente en `.gitignore`).
- Si cambias el puerto del backend (`PORT` en el `.env` del backend), recuerda actualizar:
  - `HOST_API` en el mismo `.env` del backend.
  - `VITE_API_URL` en el `.env` del frontend.
- Si vas a desplegar en producción, usa variables de entorno seguras y valores distintos a los de desarrollo.
