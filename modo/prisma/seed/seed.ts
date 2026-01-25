import { PrismaClient } from "@prisma/client";
import { seedCategories } from "./category";
import { seedProducts } from "./product";

const prisma = new PrismaClient();

async function main() {
  await seedCategories(prisma);
  await seedProducts(prisma);
}

main()
  .then(() => console.log("Seed completed"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
