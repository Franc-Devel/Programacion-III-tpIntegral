/**
 * Clase de error personalizada para errores controlados de la app.
 * Permite asignar un código HTTP específico a cada error de negocio.
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distingue errores "esperados" de bugs inesperados
    Error.captureStackTrace(this, this.constructor);
  }
}
