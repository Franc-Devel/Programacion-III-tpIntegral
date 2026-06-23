import { verifyToken } from "../auth/verifyToken.js";
import { AppError } from "../errors/AppError.js";

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Token de acceso requerido", 401));
  }

  const token = authHeader.split(" ")[1];

  try {
    // Si el token es válido, guardamos los datos del usuario en la request
    req.user = verifyToken(token);
    next();
  } catch (err) {
    return next(new AppError("Token inválido o expirado", 401));
  }
}
