📋 Requisitos Previos
Node.js: v18 o superior.

XAMPP: Con los servicios MySQL y Apache iniciados.

Editor: VS Code.

🚀 Guía de Instalación y Ejecución

1. Configuración de Base de Datos
   Abrí http://localhost/phpmyadmin.

Hacé clic en "Nueva" y crea una base de datos llamada cine_db.

2. Configuración del Backend
   Navegá a la carpeta /Backend.

Instalá las dependencias:

Bash
npm install
Crea un archivo .env en la raíz de /Backend con el siguiente contenido:

Fragmento de código
DATABASE_URL="mysql://root:@localhost:3306/cine_db"
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=cine_db
JWT_SECRET="tu_secreto_super_seguro"
PORT=3000
Generá el cliente de Prisma y ejecutá las migraciones:

Bash
npx prisma generate
npx prisma migrate dev --name init_cine
Sembrá los datos iniciales (crea el usuario Admin):

Bash
node seed.js
Iniciá el servidor:

Bash
npm run dev 3. Configuración del Frontend
Navegá a la carpeta /Frontend.

Instalá las dependencias:

Bash
npm install
Iniciá el servidor de desarrollo:

Bash
npm run dev
🔐 Credenciales de Acceso
Al ejecutar el seed.js, se crea automáticamente un usuario administrador:

Email: admin@cine.com

Contraseña: admin123

🛠️ Estructura del Proyecto
/Backend: API REST construida con Express y Prisma.

/Frontend: Interfaz web moderna con Vite y Vanilla JS.
