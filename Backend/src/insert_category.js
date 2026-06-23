import { prisma } from "./db.js";

async function main() {
  const nuevaCategoria = await prisma.category.create({
    data: {
      name: "Hardware",
    },
  });
  console.log("Categoría creada:", nuevaCategoria);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
