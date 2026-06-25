import { prisma } from "./src/db.js";
import bcrypt from "bcryptjs";

async function main() {
  console.log("⚙️  Iniciando carga de datos de prueba...");

  // 1. Upsert de Género (Lo crea si no existe)
  const genero = await prisma.genre.upsert({
    where: { name: "Ciencia Ficción" },
    update: {},
    create: { name: "Ciencia Ficción" },
  });

  // 2. Upsert de Administrador (Lo crea si no existe)
  const hashedPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@cine.com" },
    update: {},
    create: {
      name: "Agustín (Admin)",
      email: "admin@cine.com",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log("✅ Datos listos.");
  console.log(`🎬 Género validado/creado: ${genero.name} (ID: ${genero.id})`);
  console.log(`👤 Admin validado/creado: ${admin.email}`);
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());
