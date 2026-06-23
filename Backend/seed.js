import { prisma } from "./src/db.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("⚙️  Iniciando carga de datos de prueba...");

  // 1. Crear un Género
  const genero = await prisma.genre.create({
    data: { name: "Ciencia Ficción" },
  });

  // 2. Crear tu usuario Administrador
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      name: "Agustín (Admin)",
      email: "admin@cine.com",
      password: hashedPassword,
      role: "admin", // ¡Clave para que se habilite el formulario!
    },
  });

  console.log("✅ Datos listos.");
  console.log(`🎬 Género creado: ${genero.name} (ID: ${genero.id})`);
  console.log(`👤 Admin creado: ${admin.email} | Pass: admin123`);
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
