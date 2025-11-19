# Conexiones y Consultas a la Base de Datos

A la fecha no se han definido conexiones directas a bases de datos dentro de la aplicación frontend. Todas las operaciones de búsqueda y filtrado se realizan contra la API documentada, provista por el backend NestJS.

## Endpoints relevantes
- `GET /heroes/search`: Permite realizar la búsqueda avanzada enviando parámetros opcionales como `name`, `team`, `category`, `universe`, `status` y `strength`.

No existen consultas SQL gestionadas desde el frontend; cualquier consulta adicional deberá documentarse aquí cuando se implemente.
