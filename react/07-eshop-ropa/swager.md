# 📘 Documentar APIs con Swagger (OpenAPI 3.0) como un profesional

### 📌 DESCRIPCIÓN DEL PROYECTO / POST

En mis últimos proyectos he estado trabajando bastante con APIs REST, y una de las partes que más valoro es la documentación técnica. Para mí no es un extra, es una pieza clave del proyecto. Por eso utilizo Swagger/OpenAPI 3.0 como estándar para documentar cada endpoint de forma clara, estructurada y entendible para cualquier desarrollador que entre al proyecto.

Normalmente organizo el openapi.yaml por módulos:
Auth, Products, Files, Seed, etc.
Cada módulo queda perfectamente separado, con sus rutas, parámetros, esquemas y respuestas. Esto no solo hace que la API sea más fácil de mantener, sino que además mejora muchísimo la comunicación del equipo y la experiencia de quien integra el servicio.

A esta especificación la conecto con Swagger UI, lo que convierte la documentación en algo interactivo: puedo probar peticiones, validar datos, revisar errores y entender rápidamente cómo se comporta cada recurso del sistema. Es una herramienta muy potente cuando trabajas con clientes o con equipos donde varias personas consumen la misma API.

Trabajar así me permite entregar proyectos más sólidos, más profesionales y más fáciles de escalar. Y sobre todo, asegura que cualquier desarrollador pueda comprender la API sin tener que bucear en el código.

El foco está en mostrar:

- Cómo estructurar un archivo `openapi.yaml` para una API real (por ejemplo, módulos tipo **Products**, **Auth**, **Files**, **Seed**, etc.).
- Cómo conectar ese `openapi.yaml` con **Swagger UI** para obtener una documentación **interactiva**.
- Qué beneficios aporta Swagger/OpenAPI en proyectos profesionales orientados a clientes, empresas y equipos de desarrollo.

Está orientado a **desarrolladores backend y full stack**, equipos que trabajan con **APIs REST**, y perfiles técnicos que quieren mejorar la **calidad, comunicación y mantenibilidad** de sus servicios.

---

### ✨ CARACTERÍSTICAS DESTACADAS

- 🛠️ **Definición completa de la API con OpenAPI 3.0**: descripción de endpoints, parámetros, bodies, respuestas y errores estándar.
- 📦 **Documentación interactiva con Swagger UI**: probar cada endpoint directamente desde el navegador, sin herramientas externas.
- 📊 **Contratos claros entre equipos**: backend, frontend, mobile y QA hablan el mismo lenguaje gracias al archivo `openapi.yaml`.
- 🔒 **Visión global de seguridad**: endpoints públicos/privados, uso de tokens, cabeceras de autenticación, códigos 401/403 bien definidos.
- ⚙️ **Estandarización de respuestas**: códigos como `200`, `201`, `400`, `401`, `403`, `404`, `500` documentados con ejemplos JSON reales.
- 📚 **Schemas bien definidos**: DTOs y modelos (`Product`, `User`, `AuthLoginDto`, `AuthRegisterDto`, etc.) centralizados en `components/schemas`.
- 🚀 **Onboarding ultra rápido**: cualquier desarrollador nuevo entiende la API leyendo la documentación generada por Swagger.

---

### ⚙️ FUNCIONALIDADES QUE DOCUMENTO CON SWAGGER

En un escenario típico con Swagger/OpenAPI, se incluyen módulos como:

- **Products**
  - `POST /api/products` – Crear un nuevo producto.
  - `GET /api/products` – Listar todos los productos.
  - `GET /api/products/{term}` – Buscar productos por término (id, nombre, slug...).
  - `PATCH /api/products/{id}` – Actualizar un producto existente.
  - `DELETE /api/products/{id}` – Eliminar un producto.

- **Auth**
  - `POST /api/auth/register` – Registro de nuevos usuarios.
  - `POST /api/auth/login` – Login y obtención de token.
  - `GET /api/auth/check-status` – Validar sesión/token.
  - `GET /api/auth/private` / `private2` / `private3` – Rutas protegidas de ejemplo.

- **Files**
  - `GET /api/files/product/{imageName}` – Obtener imagen asociada a un producto.
  - `POST /api/files/product` – Subir imagen de producto.

- **Seed**
  - `GET /api/seed` – Poblar la base de datos con datos de prueba.

Cada uno de estos endpoints se documenta en OpenAPI con:

- `summary` y `description` claros y orientados a negocio.
- `tags` para agrupar por módulos (Products, Auth, Files, Seed...).
- `parameters` de ruta, query y cabeceras.
- `requestBody` tipado con `application/json` y referencias a `schemas`.
- `responses` con ejemplos de éxito y error.

---

### 🔧 TECNOLOGÍAS UTILIZADAS (EN EL CONTEXTO DE SWAGGER)

- ⚙️ **OpenAPI 3.0** – Especificación estándar para describir APIs REST.
- 📘 **Swagger UI** – Interfaz web para visualizar y probar los endpoints de la API.
- 🧩 **YAML/JSON** – Formato del archivo `openapi.yaml` o `openapi.json`.
- ⚛️ **Framework backend (por ejemplo Node.js/Express, NestJS, Laravel, etc.)** – Implementación real de la API.
- 🧪 **Herramientas de testing** (Postman, Insomnia, Jest, etc.) – Complemento perfecto para validar que lo implementado coincide con lo documentado.

En el post de LinkedIn se puede mencionar cómo Swagger se integra fácilmente con la pila tecnológica del proyecto y cómo se convierte en un punto central de referencia.

---

### 📁 ESTRUCTURA TÍPICA DEL PROYECTO + SWAGGER

Una estructura orientativa para integrar Swagger podría ser:

- `backend/`
  - `src/`
    - `modules/` (Products, Auth, Files, Seed...)
    - `controllers/`
    - `services/`
    - `dto/`
  - `openapi/`
    - `openapi.yaml`  ← Archivo principal de la especificación OpenAPI 3.0
  - `swagger-ui-dist/`
    - `index.html` configurado para cargar `openapi.yaml`

En el post se puede explicar que, al levantar el backend, la documentación está disponible en una ruta tipo:

- `http://localhost:3000/docs`
- `http://localhost:8080/api-docs`

Según el framework o configuración elegidos.

---

### 🚀 INSTRUCCIONES DE USO (ORIENTADAS AL LECTOR DEL POST)

En el post de LinkedIn se puede incluir un mini "how-to" para que cualquiera pueda replicar el enfoque:

1. **Definir los endpoints de tu API**
   - Haz una lista clara de rutas, métodos HTTP, parámetros y tipos de datos.

2. **Crear el archivo `openapi.yaml`**
   - Especificar `openapi: 3.0.0`.
   - Añadir la sección `info` (título, versión, descripción).
   - Definir `paths` con cada endpoint (GET, POST, PATCH, DELETE...).
   - Crear `components/schemas` para tus DTOs (`Product`, `User`, etc.).

3. **Incluir ejemplos de request/response**
   - Añadir ejemplos JSON reales para respuestas `200`/`201` y errores `400`/`401`/`404`/`500`.

4. **Instalar Swagger UI**
   - Descargar `swagger-ui-dist` o usar un paquete propio del framework.
   - Configurar `index.html` para que apunte a tu `openapi.yaml`.

5. **Levantar el servidor y probar**
   - Abrir la URL de Swagger UI.
   - Probar los endpoints directamente desde el navegador.
   - Compartir la URL de la documentación con tu equipo o cliente.

---

### 🧪 EJEMPLOS DE USO (IDEAS PARA EL POST)

En el post puedes mostrar fragmentos como:

- **Ejemplo de request** `POST /api/products`:

```json
{
  "title": "Camiseta React 2025",
  "price": 29.99,
  "description": "Camiseta técnica para desarrolladores frontend.",
  "stock": 100,
  "sizes": ["S", "M", "L"],
  "tags": ["react", "frontend", "merch"]
}
```

- **Ejemplo de response 201**:

```json
{
  "id": "c0a80123-45f6-7890-abcd-ef1234567890",
  "title": "Camiseta React 2025",
  "price": 29.99,
  "description": "Camiseta técnica para desarrolladores frontend.",
  "stock": 100,
  "sizes": ["S", "M", "L"],
  "tags": ["react", "frontend", "merch"],
  "createdAt": "2025-11-29T10:15:00.000Z"
}
```

También puedes incluir una captura de pantalla de Swagger UI mostrando el grupo de endpoints **Products** o **Auth**.

---

### 📞 Soporte y Contacto

##### 🆘 Obtener Ayuda

- 📅 **Año**: 2025  
- 📨 **Autor**: Francisco José Herreros (franHR)  
- 📧 **Email**: [desarrollo@pcprogramacion.es](mailto:desarrollo@pcprogramacion.es)  
- 🌐 **Web**: [https://www.pcprogramacion.es](https://www.pcprogramacion.es)  
- 💼 **LinkedIn**: [Francisco José Herreros](https://www.linkedin.com/in/francisco-jose-herreros)  
- 🖥️ **Portfolio**: [https://franhr.pcprogramacion.es/](https://franhr.pcprogramacion.es/)  

---

### 🖼️ Imágenes del proyecto / post

En el post de LinkedIn puedes acompañar el texto con:

- Captura de pantalla de **Swagger UI** mostrando la lista de endpoints.
- Fragmento del archivo `openapi.yaml` con un esquema bien definido.
- Imagen de arquitectura sencilla donde se vea **cliente → API → Swagger**.

---

### 🛡️ LICENCIA (PARA EL CONTENIDO TÉCNICO / REPOSITORIO)

#### Español

Copyright (c) 2025 Francisco José Herreros (franHR) / PCProgramación

Todos los derechos reservados.

Este software es propiedad de Francisco José Herreros (franHR), desarrollador de PCProgramación (https://www.pcprogramacion.es). No está permitido copiar, modificar, distribuir o utilizar este código, ni total ni parcialmente, sin una autorización expresa y por escrito del autor.

El acceso a este repositorio tiene únicamente fines de revisión, auditoría o demostración, y no implica la cesión de ningún derecho de uso o explotación.

Para solicitar una licencia o permiso de uso, contacta con: desarrollo@pcprogramacion.es

#### English

Copyright (c) 2025 Francisco José Herreros (franHR) / PCProgramación

All rights reserved.

This software is the property of Francisco José Herreros (franHR), developer of PCProgramación (https://www.pcprogramacion.es). It is not allowed to copy, modify, distribute or use this code, either totally or partially, without express and written authorization from the author.

Access to this repository has only review, audit or demonstration purposes, and does not imply the transfer of any right of use or exploitation.

To request a license or permission to use, contact: desarrollo@pcprogramacion.es

---

### 🔝 HASHTAGS RECOMENDADOS PARA LINKEDIN

Puedes cerrar tu post en LinkedIn con una sección de hashtags como:

`#swagger` `#openapi` `#api` `#restapi` `#backend` `#fullstack` `#javascript` `#typescript` `#nodejs` `#nestjs` `#desarrolloweb` `#documentacion` `#cleanarchitecture` `#devops` `#pcprogramacion` `#franHR`

---

Este archivo `swager.md` está pensado para que puedas **copiar, adaptar y pegar** el contenido directamente en LinkedIn, ajustando solo los fragmentos que quieras destacar de tu implementación concreta de Swagger/OpenAPI.
