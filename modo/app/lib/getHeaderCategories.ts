import prisma from "@/prisma/client";

export async function getHeaderCategories() {
  return prisma.category.findMany({
    where: {
      parentId: null,
    },
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: {
      id: "asc",
    },
  });
}
