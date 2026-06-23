import { userErrors } from "../utils/userErrors.js";

export function authorizeRoles(...rolesPermitidos) {
  return (req, res, next) => {
    // Verificamos si el rol guardado en el token coincide con los permitidos
    if (!req.user || !rolesPermitidos.includes(req.user.role)) {
      return next(userErrors.sinPermiso());
    }
    next();
  };
}
