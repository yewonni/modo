import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "상품을 찾을 수 없습니다" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "상품 조회 실패" }, { status: 500 });
  }
}
