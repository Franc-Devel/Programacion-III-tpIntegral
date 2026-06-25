import { Router } from "express";
import { prisma } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/ValidationError.js";

const router = Router();

// --- FINDERS (Buscadores) ---

// 1. GET ALL: Obtener todas las películas
router.get("/movies", async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({ include: { genre: true } });
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// 2. SEARCH BY TITLE: Búsqueda flexible por título
router.get("/movies/search/:title", async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({
      where: { title: { contains: req.params.title } },
      include: { genre: true },
    });
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// 3. GET BY GENRE: Filtrar por ID de género
router.get("/movies/genre/:genreId", async (req, res, next) => {
  try {
    const movies = await prisma.movie.findMany({
      where: { genreId: parseInt(req.params.genreId) },
      include: { genre: true },
    });
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// 4. GET BY ID: Detalles completos
router.get("/movies/:id", async (req, res, next) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        genre: true,
        reviews: { include: { user: { select: { name: true } } } },
      },
    });
    if (!movie) throw new NotFoundError("Película no encontrada");
    res.json(movie);
  } catch (error) {
    next(error);
  }
});

// --- GESTIÓN (ADMIN) ---

router.post(
  "/movies",
  authMiddleware,
  authorizeRoles("admin", "superadmin"),
  async (req, res, next) => {
    try {
      const { title, director, year, duration, synopsis, genreId } = req.body;
      if (!title || !director || !year || !duration || !synopsis || !genreId)
        throw new ValidationError("Faltan campos");
      const movie = await prisma.movie.create({
        data: {
          title,
          director,
          year: parseInt(year),
          duration: parseInt(duration),
          synopsis,
          genreId: parseInt(genreId),
          userId: req.user.userId,
        },
      });
      res.status(201).json(movie);
    } catch (error) {
      next(error);
    }
  },
);

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

router.patch(
  "/movies/:id",
  authMiddleware,
  authorizeRoles("admin", "superadmin"),
  async (req, res, next) => {
    try {
      const { title, director, year, duration, synopsis, genreId } = req.body;
      const dataToUpdate = {};
      if (title) dataToUpdate.title = title;
      if (director) dataToUpdate.director = director;
      if (year) dataToUpdate.year = parseInt(year);
      if (duration) dataToUpdate.duration = parseInt(duration);
      if (synopsis) dataToUpdate.synopsis = synopsis;
      if (genreId) dataToUpdate.genreId = parseInt(genreId);

      const movie = await prisma.movie.update({
        where: { id: parseInt(req.params.id) },
        data: dataToUpdate,
      });
      res.json(movie);
    } catch (error) {
      next(error);
    }
  },
);

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
