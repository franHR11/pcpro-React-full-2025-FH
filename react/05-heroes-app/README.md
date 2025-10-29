# Heroes App

## Repositorios del proyecto
- **Frontend** `react/05-heroes-app/`
- **Backend** `react/06-nest-heroes-backend/`

## Requisitos previos
- **Node.js** (versión LTS recomendada, >= 18).
- **npm** instalado y disponible en la línea de comandos.

## Variables de entorno
- **Frontend** (`react/05-heroes-app/.env`):
  - `VITE_API_URL`: URL base del backend, incluyendo el prefijo `/api`.
- **Backend** (`react/06-nest-heroes-backend/.env`, opcional):
  - `PORT`: puerto donde se levantará la API (por defecto `3000`).

## Levantar el backend
```bash
cd react/06-nest-heroes-backend
npm install
npm run start:dev
```
El servidor expone las rutas bajo `http://localhost:3000/api` cuando se usa la configuración por defecto.

## Levantar el frontend
```bash
cd react/05-heroes-app
npm install
npm run dev
```
La aplicación quedará disponible en el puerto indicado por Vite (por defecto `http://localhost:5173`).

## Construir para producción (frontend)
```bash
cd react/05-heroes-app
npm run build
npm run preview
```
El comando `npm run preview` sirve para validar el build estático antes de desplegarlo.

