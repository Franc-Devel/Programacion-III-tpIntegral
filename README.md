# CineApp - Sistema de Gestión y Reseñas de Películas

Sistema web desarrollado como Trabajo Práctico Integrador utilizando **Node.js**, **Express**, **Prisma ORM**, **MySQL/MariaDB** y **Vite + Vanilla JavaScript**.

La aplicación permite la gestión de un catálogo de películas, autenticación de usuarios mediante JWT, control de permisos por roles y publicación de reseñas por parte de los usuarios registrados.

---

# Características Principales

## Gestión de Usuarios

- Registro de nuevos usuarios.
- Inicio de sesión seguro.
- Contraseñas almacenadas mediante hash con BCrypt.
- Autenticación basada en JWT (JSON Web Token).

## Sistema de Roles

### Usuario (`user`, rol por defecto)

- Visualizar catálogo de películas.
- Consultar detalles de una película.
- Crear reseñas y puntuaciones (una sola reseña por película).
- Eliminar sus propias reseñas.

### Administrador (`admin` / `superadmin`)

Además de las funcionalidades de usuario:

- Crear películas.
- Editar películas.
- Eliminar películas.
- Eliminar cualquier reseña (no solo las propias).

---

# Arquitectura del Proyecto

```text
/
├── Backend/                  → API REST (Node.js + Express + Prisma)
│   ├── prisma/
│   │   ├── schema.prisma     → Modelo de datos
│   │   └── migrations/       → Historial de migraciones de la base de datos
│   ├── src/
│   │   ├── auth/             → Firma y verificación de JWT
│   │   ├── errors/           → Clases de error personalizadas
│   │   ├── middlewares/      → Autenticación, autorización y manejo de errores
│   │   ├── routes/           → Endpoints de auth, movies y reviews
│   │   ├── utils/            → Diccionario de errores de usuario
│   │   ├── db.js             → Conexión a la base de datos (Prisma + adaptador MariaDB)
│   │   └── index.js          → Punto de entrada del servidor Express
│   └── seed.js                → Script de carga de datos iniciales
│
├── Frontend/                  → Aplicación cliente (Vite + JavaScript vanilla)
│   ├── src/
│   │   ├── api/               → Funciones que llaman a la API (fetch)
│   │   ├── ui/                → Lógica de interfaz (manipulación del DOM)
│   │   ├── pages/movies.html  → Vista del catálogo / panel de administración
│   │   ├── utils/             → Validaciones y manejo de respuestas HTTP
│   │   ├── login.js           → Punto de entrada de la pantalla de login
│   │   └── movies.js          → Punto de entrada de la pantalla de catálogo
│   └── index.html             → Pantalla de login (raíz del sitio)
│
└── README.md
```

> ℹ️ Dentro de ambas carpetas conviven también algunos archivos **de versiones anteriores del TP** (cuando el proyecto era un sistema de productos/categorías en lugar de películas). Quedaron en el repositorio pero **no se usan en la app actual**. Están detallados en la sección "Archivos heredados / no utilizados" más abajo para que no generen confusión al revisar el código.

---

# Tecnologías Utilizadas

## Backend

- Node.js (con módulos ES — `"type": "module"`)
- Express.js
- Prisma ORM 7 (con `@prisma/adapter-mariadb`)
- MySQL / MariaDB
- JSON Web Token (`jsonwebtoken`)
- BCryptJS (hash de contraseñas)
- CORS
- Dotenv
- Morgan (logging de requests)
- Nodemon (recarga automática en desarrollo)

## Frontend

- Vite
- JavaScript Vanilla (ES Modules)
- HTML5
- CSS3

---

# Modelo de Datos

## User

Representa los usuarios registrados en el sistema.

| Campo     | Tipo                                  | Notas                        |
| --------- | ------------------------------------- | ---------------------------- |
| id        | Integer (autoincremental)             | Clave primaria               |
| email     | String                                | Único                        |
| password  | String                                | Almacenada con hash (BCrypt) |
| name      | String                                |                              |
| role      | Enum: `user` / `admin` / `superadmin` | Por defecto `user`           |
| createdAt | DateTime                              | Generado automáticamente     |

## Genre

Representa los géneros cinematográficos.

| Campo | Tipo    | Notas          |
| ----- | ------- | -------------- |
| id    | Integer | Clave primaria |
| name  | String  | Único          |

## Movie

Representa una película registrada en el catálogo.

| Campo     | Tipo     | Notas                             |
| --------- | -------- | --------------------------------- |
| id        | Integer  | Clave primaria                    |
| title     | String   |                                   |
| director  | String   |                                   |
| year      | Integer  |                                   |
| duration  | Integer  | En minutos                        |
| synopsis  | Text     |                                   |
| genreId   | Integer  | FK a `Genre`                      |
| userId    | Integer  | FK a `User` (quién la creó)       |
| createdAt | DateTime | Generado automáticamente          |
| updatedAt | DateTime | Se actualiza en cada modificación |

## Review

Representa una reseña realizada por un usuario sobre una película.

| Campo     | Tipo            | Notas                             |
| --------- | --------------- | --------------------------------- |
| id        | Integer         | Clave primaria                    |
| rating    | Integer         | Puntaje de 1 a 5                  |
| comment   | Text (opcional) |                                   |
| movieId   | Integer         | FK a `Movie`                      |
| userId    | Integer         | FK a `User`                       |
| createdAt | DateTime        | Generado automáticamente          |
| updatedAt | DateTime        | Se actualiza en cada modificación |

---

# Relaciones

```text
User
 ├── 1:N Movie    (un usuario puede crear varias películas)
 └── 1:N Review   (un usuario puede dejar varias reseñas, en distintas películas)

Genre
 └── 1:N Movie    (un género puede tener muchas películas)

Movie
 └── 1:N Review   (una película puede tener muchas reseñas)
```

### Restricción importante

Un usuario sólo puede realizar **una reseña por película**:

```prisma
@@unique([movieId, userId])
```

Si se intenta violar esta restricción, Prisma devuelve el código de error `P2002`, que la API captura específicamente en `reviews.routes.js` para responder con un mensaje claro ("Ya dejaste una reseña para esta película") en vez de un error genérico.

Las reseñas también usan `onDelete: Cascade` en sus relaciones con `Movie` y `User`: si se borra una película o un usuario, sus reseñas asociadas se eliminan automáticamente.

---

# Requisitos Previos

Antes de ejecutar el proyecto asegurate de tener instalado:

- Node.js v18 o superior
- XAMPP (o cualquier servidor MySQL/MariaDB equivalente)
- MySQL/MariaDB
- Git
- Visual Studio Code (recomendado)

Además deben estar iniciados los servicios:

- Apache
- MySQL

---

# Instalación y Configuración

## Crear la Base de Datos

Abrir:

```text
http://localhost/phpmyadmin
```

Crear una base de datos llamada:

```sql
cine_db
```

---

## Configuración del Backend

Ingresar a la carpeta:

```bash
cd Backend
```

Instalar dependencias:

```bash
npm install
```

### Crear archivo `.env`

Crear un archivo llamado `.env` dentro de `Backend/` con el siguiente contenido:

```env
DATABASE_URL="mysql://root:@localhost:3306/cine_db"

DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=cine_db

JWT_SECRET="tu_secreto_super_seguro"

PORT=3000
```

> El archivo `src/db.js` lee estas variables individualmente (`DATABASE_HOST`, `DATABASE_USER`, etc.) para configurar el adaptador de MariaDB, mientras que `DATABASE_URL` es la que usa Prisma para las migraciones. **Hay que completar ambas.**

### Generar el cliente de Prisma

```bash
npx prisma generate
```

### Ejecutar las migraciones

```bash
npx prisma migrate dev
```

> Las migraciones ya existen en `prisma/migrations/`, por lo que este comando las aplicará en orden sobre la base de datos `cine_db`. No es necesario crear una migración nueva salvo que se modifique el `schema.prisma`.

### Cargar datos iniciales (seed)

```bash
node seed.js
```

Esto crea automáticamente:

- Un género: **Ciencia Ficción**
- Un usuario administrador (ver credenciales más abajo)

### Iniciar el servidor backend

```bash
npm run dev
```

Servidor disponible en:

```text
http://localhost:3000
```

---

## Configuración del Frontend

Abrir una **nueva terminal** (dejando el backend corriendo en la anterior).

Ingresar a la carpeta:

```bash
cd Frontend
```

Instalar dependencias:

```bash
npm install
```

Verificar que exista el archivo `.env` con:

```env
VITE_API_URL=http://localhost:3000/api
```

Iniciar la aplicación:

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:5173
```

Y se abrirá directamente en la pantalla de **login** (`index.html`).

---

# Credenciales de Administrador (datos de prueba)

Generadas automáticamente al ejecutar `node seed.js`:

```text
Email:       admin@cine.com
Contraseña:  admin123
```

---

# Endpoints Principales

Todas las rutas están montadas bajo el prefijo `/api`.

## Autenticación

| Método | Endpoint             | Acceso  | Descripción                                                          |
| ------ | -------------------- | ------- | -------------------------------------------------------------------- |
| POST   | `/api/auth/register` | Público | Registra un nuevo usuario (rol `user` por defecto) y devuelve un JWT |
| POST   | `/api/auth/login`    | Público | Verifica credenciales y devuelve un JWT                              |

## Películas

| Método | Endpoint          | Acceso             | Descripción                                    |
| ------ | ----------------- | ------------------ | ---------------------------------------------- |
| GET    | `/api/movies`     | Público            | Lista todas las películas (con su género)      |
| GET    | `/api/movies/:id` | Público            | Detalle de una película (con género y reseñas) |
| POST   | `/api/movies`     | Admin / Superadmin | Crea una película                              |
| PUT    | `/api/movies/:id` | Admin / Superadmin | Edita una película                             |
| DELETE | `/api/movies/:id` | Admin / Superadmin | Elimina una película                           |

## Reseñas

| Método | Endpoint                       | Acceso                                 | Descripción                                        |
| ------ | ------------------------------ | -------------------------------------- | -------------------------------------------------- |
| POST   | `/api/movies/:movieId/reviews` | Usuario autenticado                    | Crea una reseña (rating 1-5 + comentario opcional) |
| DELETE | `/api/reviews/:id`             | Dueño de la reseña, Admin o Superadmin | Elimina una reseña                                 |

Las rutas protegidas requieren el header:

```text
Authorization: Bearer <token>
```

---

# Seguridad Implementada

- Contraseñas hasheadas con BCrypt (`bcrypt.hash`, 10 rondas de salt).
- Autenticación mediante JWT, con expiración de 7 días (`signToken.js`).
- Middleware `authMiddleware` que valida el token en cada ruta protegida.
- Middleware `authorizeRoles(...roles)` que valida el rol del usuario antes de permitir la acción (usado en las rutas de administración de películas).
- Manejo centralizado de errores con clases personalizadas (`AppError`, `NotFoundError`, `ValidationError`) y un único `errorHandler` al final del pipeline de Express.
- Validaciones de entrada en registro/login (campos requeridos, formato, longitud mínima de contraseña) mediante el diccionario `userErrors`.
- El `userId` de quien crea una película o reseña siempre se obtiene del token (`req.user.userId`), nunca del body, evitando que alguien se atribuya contenido ajeno.

---

# Datos de Prueba

Al ejecutar `node seed.js` se generan automáticamente:

```text
Género:
- Ciencia Ficción

Administrador:
- admin@cine.com
- admin123
```

A partir de ahí se pueden crear películas (con ese usuario admin) y registrar usuarios nuevos desde el formulario de la app para dejar reseñas.

---

# Archivos heredados / no utilizados

El repositorio conserva algunos archivos de una **versión anterior** del Trabajo Práctico (un sistema de productos, categorías y órdenes) que fue migrada hacia el sistema actual de películas y reseñas. No forman parte del flujo activo de la aplicación, pero quedaron en el código:

**Backend:**

- `Backend/src/insert_category.js` y `Backend/prueba_tp.js`: usan modelos (`Category`, `Product`, `Order`, `OrderItem`) que **ya no existen** en el `schema.prisma` actual. Si se ejecutan, van a fallar.
- `Backend/registrar_usuario.js`: script suelto para crear un usuario de prueba a mano (no se usa en el flujo normal, para eso ya está `/api/auth/register`).

**Frontend:**

- `Frontend/src/productos.js` y `Frontend/src/ui/productosUI.js`: pertenecen a la versión anterior (sistema de productos). `productos.js` importa un archivo (`api/productosApi.js`) que no existe en el proyecto. Ninguno de los dos está referenciado desde `index.html` ni desde `movies.html`, por lo que no se ejecutan al usar la app.

---

# Equipo de Desarrollo

- Delgado Agustín
- Cequi Sofía
- Gordillo Oriana
