import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  store?: string;
  categoryId: number;
  category?: { id: number; name: string; slug: string };
}

export async function getProductsByType(type?: string, limit = 8) {
  if (type === "new") {
    return prisma.product.findMany({
      orderBy: { id: "desc" },
      take: limit,
      include: { category: true },
    });
  }

  if (type === "trend") {
    return prisma.product.findMany({
      orderBy: { id: "desc" }, // 임시 트렌드 기준
      take: limit,
      include: { category: true },
    });
  }

  return prisma.product.findMany({
    take: limit,
    include: { category: true },
  });
}
