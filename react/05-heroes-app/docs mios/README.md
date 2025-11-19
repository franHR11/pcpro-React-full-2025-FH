# Documentación del Proyecto Heroes App

## Sección Comercial
Una plataforma interactiva para explorar, buscar y gestionar héroes y villanos con métricas, grillas dinámicas y filtros avanzados.

## Descripción y Características
- Búsqueda instantánea por nombre y filtros refinados por equipo, categoría, universo, estado y fuerza mínima.
- Visualización de estadísticas globales y componentes reutilizables para listar héroes con sus atributos clave.
- Integración con un backend NestJS que provee endpoints para búsquedas avanzadas y administración de héroes.

## Sección Técnica
1. **Instalación**
   ```bash
   npm install
   ```
2. **Variables de entorno**
   - `VITE_API_URL`: URL base del servicio de héroes (debe definirse en el archivo `.env`).
3. **Ejecución en desarrollo**
   ```bash
   npm run dev
   ```
4. **Compilación para producción**
   ```bash
   npm run build
   ```
5. **Pruebas**
   ```bash
   npm run test
   ```
