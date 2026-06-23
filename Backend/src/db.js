import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Imprimamos esto para ver qué está leyendo realmente
console.log(
  "Conectando a:",
  process.env.DATABASE_USER,
  "@",
  process.env.DATABASE_HOST,
);

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST || "localhost",
  user: process.env.DATABASE_USER || "root", // Forzamos 'root'
  password: process.env.DATABASE_PASSWORD || "", // Contraseña vacía para XAMPP
  database: process.env.DATABASE_NAME || "cine_db",
  connectionLimit: 5,
});

export const prisma = new PrismaClient({ adapter });
