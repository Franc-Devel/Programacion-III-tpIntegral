# Proyecto Sprint 3 - Gestión de Productos (Frontend)

Este proyecto constituye la entrega del Sprint 3, enfocado en la implementación del **Frontend** para la gestión de productos, consumiendo la API REST desarrollada en el backend.

## 🚀 Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+).
- **Backend:** Node.js, Express, Prisma ORM.
- **Base de Datos:** MariaDB (vía XAMPP).
- **Comunicación:** Fetch API (JSON).

## 🛠️ Funcionalidades Implementadas

- **Listado de Productos:** Visualización dinámica de productos obtenidos de la base de datos.
- **Creación:** Formulario para agregar nuevos productos con validaciones básicas.
- **Edición:** Actualización de productos existentes mediante métodos HTTP (PATCH/PUT).
- **Eliminación:** Borrado de productos con confirmación.

## 📦 Cómo levantar el proyecto

1. **Configuración Inicial:**
   - Asegurate de tener XAMPP corriendo con Apache y MySQL.
   - Crea la base de datos `tp_sprint2_db` en `phpmyadmin`.

2. **Backend:**
   - Navegá a la carpeta del backend y ejecutá los siguientes comandos en la terminal:

     npm install
     npx prisma migrate dev
     npm run dev

3. **Frontend:**
   - Abrí el archivo `index.html` en tu navegador o utilizá una extensión como "Live Server" en VS Code para servir los archivos estáticos.

## 📂 Estructura del Proyecto

    /src
      ├── /api          # Lógica de conexión (fetch)
      ├── /ui           # Lógica de manipulación del DOM
      ├── /routes       # Endpoints de la API
      └── db.js         # Configuración de Prisma

## 👥 Autores

Proyecto desarrollado para la materia de **Programación III** de la Tecnicatura Universitaria en Programación (UTN).

- **Francisco Delgado**
- **Oriana Gordillo**
- **Cequi Sofia**
