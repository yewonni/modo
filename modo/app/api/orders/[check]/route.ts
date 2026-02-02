import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserIdFromRequest } from "@/app/lib/getUser";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { message: "로그인이 필요합니다" },
        { status: 401 },
      );
    }

    const url = new URL(req.url);
    const productId = url.searchParams.get("productId");

    if (!productId) {
      return NextResponse.json(
        { message: "productId가 필요합니다" },
        { status: 400 },
      );
    }

    const orderItem = await prisma.orderItem.findFirst({
      where: {
        productId: Number(productId),
        order: {
          userId,
        },
      },
    });

    return NextResponse.json({ hasOrdered: !!orderItem });
  } catch (error) {
    console.error("주문 여부 확인 실패:", error);
    return NextResponse.json(
      { message: "주문 여부 확인 실패" },
      { status: 500 },
    );
  }
}
