import { Router } from "express";
import { prisma } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ValidationError } from "../errors/ValidationError.js";
import { AppError } from "../errors/AppError.js";

const router = Router();

// POST /api/movies/:movieId/reviews -> Dejar una reseña
router.post(
  "/movies/:movieId/reviews",
  authMiddleware,
  async (req, res, next) => {
    try {
      const movieId = parseInt(req.params.movieId);
      const { rating, comment } = req.body;
      const userId = req.user.userId; // Sacamos al usuario del Token

      if (!rating || rating < 1 || rating > 5) {
        throw new ValidationError("El rating debe ser entre 1 y 5");
      }

      const review = await prisma.review.create({
        data: {
          rating: parseInt(rating),
          comment,
          movieId,
          userId,
        },
      });

      res.status(201).json(review);
    } catch (error) {
      // P2002 es el código de Prisma cuando se viola una regla @@unique
      if (error.code === "P2002") {
        next(new AppError("Ya dejaste una reseña para esta película", 400));
      } else {
        next(error);
      }
    }
  },
);

// DELETE /api/reviews/:id -> Borrar una reseña
router.delete("/reviews/:id", authMiddleware, async (req, res, next) => {
  try {
    const reviewId = parseInt(req.params.id);
    const userId = req.user.userId;
    const userRole = req.user.role;

    // 1. Buscamos la reseña
    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundError("Reseña no encontrada");

    // 2. Verificamos que quien la quiere borrar sea el dueño O sea un administrador
    if (
      review.userId !== userId &&
      userRole !== "admin" &&
      userRole !== "superadmin"
    ) {
      throw new AppError("No tenés permiso para borrar esta reseña", 403);
    }

    // 3. Borramos
    await prisma.review.delete({ where: { id: reviewId } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
