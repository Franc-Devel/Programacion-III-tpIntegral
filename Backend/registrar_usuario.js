import { prisma } from "./src/db.js";
import bcrypt from "bcryptjs"; // Asegurate de tener esta librería instalada

async function registrar() {
  const hashedPassword = await bcrypt.hash("123456", 10); // Contraseña de prueba: 123456
  const user = await prisma.user.create({
    data: {
      name: "Agustin",
      email: "cliente@tp.com",
      password: hashedPassword, // Nota: esto requiere que tu modelo User tenga el campo password
    },
  });
  console.log("Usuario registrado con éxito:", user);
  await prisma.$disconnect();
}
registrar();
