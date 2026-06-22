import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

// Listar todos los productos
router.get("/products", async (req, res) => {
  try {
    const productos = await prisma.product.findMany();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al listar productos" });
  }
});

// Obtener producto por ID
router.get("/products/:id", async (req, res) => {
  try {
    const producto = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    producto
      ? res.json(producto)
      : res.status(404).json({ message: "Producto no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el producto" });
  }
});

// Crear producto
router.post("/products", async (req, res) => {
  try {
    const { name, price, quantity, categoryId } = req.body;

    if (!name || !price || !categoryId) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const nuevoProducto = await prisma.product.create({
      data: {
        name,
        price: parseInt(price),
        quantity: parseInt(quantity) || 0,
        categoryId: parseInt(categoryId),
      },
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({
      message: "Error al guardar el producto",
      details: error.message,
    });
  }
});

// Actualizar producto (PUT)
router.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, categoryId } = req.body;

    const productoActualizado = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        price: parseInt(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
      },
    });
    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar:", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});
// Actualizar producto (PATCH)
router.patch("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, categoryId } = req.body;

    const productoActualizado = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        price: parseInt(price),
        quantity: parseInt(quantity),
        categoryId: parseInt(categoryId),
      },
    });
    res.json(productoActualizado);
  } catch (error) {
    console.error("Error al actualizar (PATCH):", error);
    res.status(500).json({ message: "Error al actualizar el producto" });
  }
});

// Eliminar producto (DELETE)
router.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar:", error);
    res.status(500).json({ message: "Error al eliminar el producto" });
  }
});

export default router;
