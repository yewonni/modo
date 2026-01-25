import { PrismaClient } from "@prisma/client";

export async function seedCategories(prisma: PrismaClient) {
  const furniture = await prisma.category.upsert({
    where: { slug: "furniture" },
    update: {},
    create: { name: "FURNITURE", slug: "furniture" },
  });

  const lighting = await prisma.category.upsert({
    where: { slug: "lighting" },
    update: {},
    create: { name: "LIGHTING", slug: "lighting" },
  });

  const decor = await prisma.category.upsert({
    where: { slug: "decor" },
    update: {},
    create: { name: "DECOR", slug: "decor" },
  });

  const textile = await prisma.category.upsert({
    where: { slug: "textile" },
    update: {},
    create: { name: "TEXTILE", slug: "textile" },
  });

  const childrenData = [
    { name: "Table", slug: "table", parentId: furniture.id },
    { name: "Chair", slug: "chair", parentId: furniture.id },
    { name: "Sofa", slug: "sofa", parentId: furniture.id },
    { name: "Storage", slug: "storage", parentId: furniture.id },

    { name: "Table Lamp", slug: "table-lamp", parentId: lighting.id },
    { name: "Floor Lamp", slug: "floor-lamp", parentId: lighting.id },
    { name: "Ceiling Light", slug: "ceiling-light", parentId: lighting.id },
    { name: "Wall Light", slug: "wall-light", parentId: lighting.id },

    { name: "Vase & Planter", slug: "vase-planter", parentId: decor.id },
    { name: "Candle & Diffuser", slug: "candle-diffuser", parentId: decor.id },
    { name: "Wall Decor", slug: "wall-decor", parentId: decor.id },
    { name: "Object", slug: "object", parentId: decor.id },

    { name: "Rug", slug: "rug", parentId: textile.id },
    { name: "Cushion", slug: "cushion", parentId: textile.id },
    { name: "Blanket", slug: "blanket", parentId: textile.id },
    { name: "Curtain", slug: "curtain", parentId: textile.id },
  ];

  for (const child of childrenData) {
    await prisma.category.upsert({
      where: { slug: child.slug },
      update: {},
      create: child,
    });
  }

  console.log("Category seed completed");
}
