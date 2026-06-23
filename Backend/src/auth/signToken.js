import jwt from "jsonwebtoken";

export function signToken(user) {
  // Guardamos el id, email y el rol del usuario dentro del token
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}
