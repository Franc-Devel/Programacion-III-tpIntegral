import { Router } from "express";
import { prisma } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/ValidationError.js";

const router = Router();

// GET /api/movies -> Obtener todas las películas (Público)
router.get("/movies", async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({
      include: { genre: true }, // Traemos el nombre del género
    });
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// GET /api/movies/:id -> Ver detalles de una película (Público)
router.get("/movies/:id", async (req, res, next) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        genre: true,
        reviews: { include: { user: { select: { name: true } } } }, // Traemos las reseñas con el nombre del autor
      },
    });
    if (!movie) throw new NotFoundError("Película no encontrada");
    res.json(movie);
  } catch (error) {
    next(error);
  }
});

// POST /api/movies -> Crear película (SOLO ADMIN)
// Fijate cómo inyectamos los middlewares en la ruta antes de la función
router.post(
  "/movies",
  authMiddleware,
  authorizeRoles("admin", "superadmin"),
  async (req, res, next) => {
    try {
      const { title, director, year, duration, synopsis, genreId } = req.body;

      if (!title || !director || !year || !duration || !synopsis || !genreId) {
        throw new ValidationError("Faltan campos obligatorios");
      }

      const movie = await prisma.movie.create({
        data: {
          title,
          director,
          year: parseInt(year),
          duration: parseInt(duration),
          synopsis,
          genreId: parseInt(genreId),
          userId: req.user.userId, // El ID se saca directamente del Token, no del body
        },
      });
      res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  },
);

// PUT /api/movies/:id -> Editar película (SOLO ADMIN)
router.put(
  "/movies/:id",
  authMiddleware,
  authorizeRoles("admin", "superadmin"),
  async (req, res, next) => {
    try {
      const { title, director, year, duration, synopsis, genreId } = req.body;
      const movie = await prisma.movie.update({
        where: { id: parseInt(req.params.id) },
        data: {
          title,
          director,
          year: parseInt(year),
          duration: parseInt(duration),
          synopsis,
          genreId: parseInt(genreId),
        },
      });
      res.json(movie);
    } catch (error) {
      next(error);
    }
  },
);

// DELETE /api/movies/:id -> Borrar película (SOLO ADMIN)
router.delete(
  "/movies/:id",
  authMiddleware,
  authorizeRoles("admin", "superadmin"),
  async (req, res, next) => {
    try {
      await prisma.movie.delete({ where: { id: parseInt(req.params.id) } });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
);

export default router;
