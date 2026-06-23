import { Router } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Buscamos al usuario en la DB
  const user = await prisma.user.findUnique({ where: { email } });

  // Validamos que exista y que la contraseña sea correcta
  if (user && (await bcrypt.compare(password, user.password))) {
    // En un caso real generarías un token JWT aquí
    res.json({
      token: "fake-jwt-token-123",
      user: { name: user.name, email: user.email },
    });
  } else {
    res.status(401).json({ message: "Credenciales inválidas" });
  }
});

export default router;
