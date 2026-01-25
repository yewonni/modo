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

export async function getProductsByType(
  type?: string,
  limit?: number,
): Promise<Product[]> {
  if (type === "new") {
    return prisma.product.findMany({
      orderBy: { id: "desc" },
      take: limit,
      include: { category: true },
    });
  } else if (type === "trend") {
    const allProducts = await prisma.product.findMany({
      include: { category: true },
    });
    return limit
      ? allProducts.sort(() => 0.5 - Math.random()).slice(0, limit)
      : allProducts;
  } else {
    return prisma.product.findMany({ include: { category: true } });
  }
}
