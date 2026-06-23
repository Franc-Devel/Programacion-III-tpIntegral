# 🎬 CineApp - Sistema de Gestión y Reseñas de Películas

Sistema web desarrollado como Trabajo Práctico Integrador utilizando **Node.js**, **Express**, **Prisma ORM**, **MySQL/MariaDB** y **Vite + Vanilla JavaScript**.

La aplicación permite la gestión de un catálogo de películas, autenticación de usuarios mediante JWT, control de permisos por roles y publicación de reseñas por parte de los usuarios registrados.

---

# 📌 Características Principales

## 👤 Gestión de Usuarios

* Registro de nuevos usuarios.
* Inicio de sesión seguro.
* Contraseñas almacenadas mediante hash con BCrypt.
* Autenticación basada en JWT (JSON Web Token).

## 🔐 Sistema de Roles

### Usuario

* Visualizar catálogo de películas.
* Consultar detalles de películas.
* Crear reseñas y puntuaciones.

### Administrador

Además de las funcionalidades de usuario:

* Crear películas.
* Editar películas.
* Eliminar películas.
* Administrar contenido del catálogo.

---

# 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos aplicaciones independientes:

```text
/
├── Backend/
│   ├── prisma/
│   ├── src/
│   └── seed.js
│
├── Frontend/
│   ├── src/
│   ├── pages/
│   └── index.html
│
└── README.md
```

---

# ⚙️ Tecnologías Utilizadas

## Backend

* Node.js
* Express.js
* Prisma ORM
* MySQL / MariaDB
* JWT
* BCryptJS
* CORS
* Dotenv

## Frontend

* Vite
* Vanilla JavaScript
* HTML5
* CSS3

---

# 🗄️ Modelo de Datos

## User

Representa los usuarios registrados en el sistema.

| Campo    | Tipo                      |
| -------- | ------------------------- |
| id       | Integer                   |
| name     | String                    |
| email    | String                    |
| password | String                    |
| role     | user / admin / superadmin |

---

## Genre

Representa los géneros cinematográficos.

| Campo | Tipo    |
| ----- | ------- |
| id    | Integer |
| name  | String  |

---

## Movie

Representa una película registrada en el catálogo.

| Campo    | Tipo    |
| -------- | ------- |
| id       | Integer |
| title    | String  |
| director | String  |
| year     | Integer |
| duration | Integer |
| synopsis | Text    |
| genreId  | Integer |
| userId   | Integer |

---

## Review

Representa una reseña realizada por un usuario.

| Campo   | Tipo    |
| ------- | ------- |
| id      | Integer |
| rating  | Integer |
| comment | Text    |
| movieId | Integer |
| userId  | Integer |

---

# 🔗 Relaciones

```text
User
 ├── 1:N Movie
 └── 1:N Review

Genre
 └── 1:N Movie

Movie
 └── 1:N Review
```

### Restricción importante

Un usuario sólo puede realizar una reseña por película.

```prisma
@@unique([movieId, userId])
```

---

# 📋 Requisitos Previos

Antes de ejecutar el proyecto asegurate de tener instalado:

* Node.js v18 o superior
* XAMPP
* MySQL/MariaDB
* Git
* Visual Studio Code

Además deben estar iniciados los servicios:

* Apache
* MySQL

---

# 🚀 Instalación y Configuración

## 1️⃣ Crear la Base de Datos

Abrir:

```text
http://localhost/phpmyadmin
```

Crear una base de datos llamada:

```sql
cine_db
```

---

# 2️⃣ Configuración del Backend

Ingresar a la carpeta:

```bash
cd Backend
```

Instalar dependencias:

```bash
npm install
```

---

## Crear archivo .env

Crear un archivo llamado:

```text
.env
```

con el siguiente contenido:

```env
DATABASE_URL="mysql://root:@localhost:3306/cine_db"

DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=cine_db

JWT_SECRET="tu_secreto_super_seguro"

PORT=3000
```

---

## Generar Prisma Client

```bash
npx prisma generate
```

---

## Ejecutar Migraciones

```bash
npx prisma migrate dev --name init_cine
```

---

## Cargar Datos Iniciales

```bash
node seed.js
```

Esto creará:

* Género: Ciencia Ficción
* Usuario Administrador

---

## Iniciar Servidor Backend

```bash
npm run dev
```

Servidor disponible en:

```text
http://localhost:3000
```

---

# 3️⃣ Configuración del Frontend

Abrir una nueva terminal.

Ingresar a:

```bash
cd Frontend
```

Instalar dependencias:

```bash
npm install
```

Iniciar aplicación:

```bash
npm run dev
```

La aplicación quedará disponible en:

```text
http://localhost:5173
```

---

# 🔐 Credenciales de Administrador

Generadas automáticamente por el script seed.js

```text
Email: admin@cine.com

Contraseña: admin123
```

---

# 📡 Endpoints Principales

## Autenticación

### Registro

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Películas

### Obtener todas las películas

```http
GET /api/movies
```

### Obtener película por ID

```http
GET /api/movies/:id
```

### Crear película (Admin)

```http
POST /api/movies
```

### Editar película (Admin)

```http
PUT /api/movies/:id
```

### Eliminar película (Admin)

```http
DELETE /api/movies/:id
```

---

## Reseñas

### Crear reseña

```http
POST /api/movies/:movieId/reviews
```

### Eliminar reseña

```http
DELETE /api/reviews/:id
```

---

# 🔒 Seguridad Implementada

* Contraseñas hasheadas con BCrypt.
* Autenticación mediante JWT.
* Middleware de autorización por roles.
* Validaciones de entrada.
* Manejo centralizado de errores.
* Protección de rutas privadas.

---

# 🧪 Datos de Prueba

Al ejecutar:

```bash
node seed.js
```

Se generan automáticamente:

```text
Género:
- Ciencia Ficción

Administrador:
- admin@cine.com
- admin123
```

---

# 👨‍💻 Equipo de Desarrollo

* Agustín Francisco Delgado Ojeda
* Nicolás
* Franco

---

# 📚 Trabajo Práctico Integrador

Proyecto desarrollado para la materia:

**Metodología de Sistemas I**

Docente:
**Ing. Ruth Díaz Alberti**

Universidad Nacional de Tucumán

---

# 📄 Licencia

Proyecto desarrollado con fines académicos y educativos.
No destinado a uso comercial.
