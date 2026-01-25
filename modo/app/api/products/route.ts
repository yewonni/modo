import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  let products;

  if (type === "new") {
    // 최신 4개 상품
    products = await prisma.product.findMany({
      orderBy: { id: "desc" },
      take: 4,
      include: { category: true },
    });
  } else if (type === "trend") {
    // 랜덤 4개 상품
    const allProducts = await prisma.product.findMany({
      include: { category: true },
    });
    products = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
  } else {
    // 전체 상품
    products = await prisma.product.findMany({ include: { category: true } });
  }

  return NextResponse.json(products);
}
