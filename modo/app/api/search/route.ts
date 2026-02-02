export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const keyword = searchParams.get("q") || "";
    const sort = searchParams.get("sort") || "latest";
    const page = Number(searchParams.get("page") || 1);
    const perPage = Number(searchParams.get("perPage") || 8);

    const where: Prisma.ProductWhereInput = keyword
      ? {
          OR: [
            { name: { contains: keyword, mode: "insensitive" } },
            { store: { contains: keyword, mode: "insensitive" } },
          ],
        }
      : {};

    const totalCount = await prisma.product.count({ where });

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy:
        sort === "priceAsc"
          ? { price: "asc" }
          : sort === "priceDesc"
            ? { price: "desc" }
            : { id: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return NextResponse.json({ totalCount, products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "검색 실패" }, { status: 500 });
  }
}
