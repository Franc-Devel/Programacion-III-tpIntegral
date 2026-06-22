import { prisma } from "./src/db.js";

async function ejecutarPrueba() {
  try {
    console.log("⚙️  Iniciando carga de datos para el TP...");

    // 1. Crear una Categoría y dos Productos en un solo paso
    const categoria = await prisma.category.create({
      data: {
        name: "Hardware PC",
        products: {
          create: [
            { name: "Procesador Ryzen 5", price: 250000, quantity: 10 },
            { name: "Memoria RAM 16GB", price: 50000, quantity: 20 },
          ],
        },
      },
      include: { products: true }, // Traemos los productos para usar sus IDs
    });

    // 2. Crear un Usuario
    const usuario = await prisma.user.create({
      data: {
        name: "Cliente de Prueba",
        email: "cliente@tp.com",
      },
    });

    // 3. Crear la Orden y los detalles (OrderItems) asociados a los productos
    const orden = await prisma.order.create({
      data: {
        userId: usuario.id,
        items: {
          create: [
            {
              productId: categoria.products[0].id,
              quantity: 1,
              price: categoria.products[0].price,
            },
            {
              productId: categoria.products[1].id,
              quantity: 2,
              price: categoria.products[1].price,
            },
          ],
        },
      },
    });

    console.log("✅ Datos creados exitosamente.\n");
    console.log("🔍 Ejecutando la megaconsulta requerida...\n");

    // 4. LA CONSULTA OBLIGATORIA: Traer todo el árbol relacional
    const resultadoConsulta = await prisma.order.findUnique({
      where: { id: orden.id },
      include: {
        user: true, // Trae los datos del usuario
        items: {
          // Trae los detalles de la orden
          include: {
            product: {
              // Entra al producto de cada detalle
              include: {
                category: true, // Llega hasta la categoría del producto
              },
            },
          },
        },
      },
    });

    // Imprimimos el resultado expandiendo todos los niveles del objeto
    console.dir(resultadoConsulta, { depth: null, colors: true });
    console.log("\n🚀 ¡Actividad obligatoria completada!");
  } catch (error) {
    console.error("❌ Error en la prueba:", error);
  } finally {
    await prisma.$disconnect();
  }
}

ejecutarPrueba();
  