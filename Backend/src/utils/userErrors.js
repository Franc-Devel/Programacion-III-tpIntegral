import { AppError } from "../errors/AppError.js";

export const userErrors = {
  emailRequerido: () => new AppError("El email es requerido", 400),
  passwordRequerido: () => new AppError("La contraseña es requerida", 400),
  nameRequerido: () => new AppError("El nombre es requerido", 400),
  emailInvalido: () => new AppError("El formato del email no es válido", 400),
  passwordCorta: () =>
    new AppError("La contraseña debe tener al menos 6 caracteres", 400),
  emailEnUso: () => new AppError("Ya existe una cuenta con ese email", 409),
  credencialesInvalidas: () => new AppError("Credenciales incorrectas", 401),
  noEncontrado: () => new AppError("Usuario no encontrado", 404),
  rolInvalido: () => new AppError("El rol indicado no es válido", 400),
  sinPermiso: () =>
    new AppError("No tenés permisos para realizar esta acción", 403),
};
