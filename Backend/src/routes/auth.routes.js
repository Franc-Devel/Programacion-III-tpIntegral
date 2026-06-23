import { Router } from "express";
import { prisma } from "../db.js";
import bcrypt from "bcryptjs";
import { signToken } from "../auth/signToken.js";
import { userErrors } from "../utils/userErrors.js";

const router = Router();

// 1. REGISTRO DE USUARIO
router.post("/auth/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones usando nuestro diccionario de errores
    if (!name) return next(userErrors.nameRequerido());
    if (!email) return next(userErrors.emailRequerido());
    if (!password) return next(userErrors.passwordRequerido());
    if (password.length < 6) return next(userErrors.passwordCorta());

    // Verificar si el email ya está registrado
    const usuarioExistente = await prisma.user.findUnique({ where: { email } });
    if (usuarioExistente) return next(userErrors.emailEnUso());

    // Hashear la contraseña (¡nunca guardar en texto plano!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la BD (Prisma le asigna el rol 'user' por defecto)
    const nuevoUsuario = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generar el pasaporte digital (JWT)
    const token = signToken(nuevoUsuario);

    res.status(201).json({
      message: "Usuario registrado con éxito",
      token,
      user: {
        id: nuevoUsuario.id,
        name: nuevoUsuario.name,
        email: nuevoUsuario.email,
        role: nuevoUsuario.role,
      },
    });
  } catch (error) {
    next(error); // Pasa el error al errorHandler
  }
});

// 2. LOGIN DE USUARIO
router.post("/auth/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) return next(userErrors.emailRequerido());
    if (!password) return next(userErrors.passwordRequerido());

    // Buscamos al usuario en la BD
    const user = await prisma.user.findUnique({ where: { email } });

    // Validamos que exista y que la contraseña coincida
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(userErrors.credencialesInvalidas());
    }

    // Generar el pasaporte digital (JWT)
    const token = signToken(user);

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
