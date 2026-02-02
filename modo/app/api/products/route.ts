export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const type = searchParams.get("type"); // 홈페이지용 "new" | "trend"
    const parentId = searchParams.get("parentId");
    const childId = searchParams.get("childId");
    const sort = searchParams.get("sort") || "latest";
    const page = Number(searchParams.get("page") || 1);
    const perPage = Number(searchParams.get("perPage") || 8);

    // 홈페이지용 로직
    if (type === "new") {
      const products = await prisma.product.findMany({
        orderBy: { id: "desc" },
        take: 4,
        include: { category: true },
      });
      return NextResponse.json(products);
    }

    if (type === "trend") {
      const count = await prisma.product.count();
      const skip = Math.floor(Math.random() * Math.max(0, count - 4));

      const products = await prisma.product.findMany({
        skip,
        take: 4,
        include: { category: true },
      });
      return NextResponse.json(products);
    }

    // 카테고리 페이지용 로직
    const where: Prisma.ProductWhereInput = {};

    if (childId) {
      where.categoryId = Number(childId);
    } else if (parentId) {
      const parentCategory = await prisma.category.findUnique({
        where: { id: Number(parentId) },
        include: { children: true },
      });

      if (parentCategory) {
        const childIds = parentCategory.children.map((child) => child.id);
        where.categoryId = { in: [Number(parentId), ...childIds] };
      }
    }

    const totalCount = await prisma.product.count({ where });

    const orderBy =
      sort === "priceAsc"
        ? { price: "asc" as const }
        : sort === "priceDesc"
          ? { price: "desc" as const }
          : { id: "desc" as const };

    const products = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
    });

    return NextResponse.json({ totalCount, products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "상품 조회 실패" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body || !Array.isArray(body.ids)) {
      console.error("잘못된 요청 바디:", body);
      return NextResponse.json({ message: "ids 배열 필요" }, { status: 400 });
    }

    const ids: number[] = body.ids;
    if (ids.length === 0) return NextResponse.json([], { status: 200 });

    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
      include: { category: true },
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error("상품 조회 실패:", err);
    return NextResponse.json({ message: "상품 조회 실패" }, { status: 500 });
  }
}
