import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserIdFromRequest } from "@/app/lib/getUser";

export async function GET(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(cartItems);
  } catch (err: any) {
    console.error("장바구니 조회 실패:", err);
    return NextResponse.json(
      { message: err.message || "장바구니 조회 실패" },
      { status: 401 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId, quantity } = await req.json();

    if (!productId || quantity < 1) {
      return NextResponse.json(
        { message: "상품 ID와 수량 필요" },
        { status: 400 },
      );
    }

    const existing = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    let cartItem;
    if (existing) {
      cartItem = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { userId, productId, quantity },
      });
    }

    return NextResponse.json(cartItem);
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "장바구니 실패" },
      { status: 401 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const userId = getUserIdFromRequest(req);
  const { productIds } = await req.json();

  if (!Array.isArray(productIds)) {
    return NextResponse.json({ message: "productIds 필요" }, { status: 400 });
  }

  await prisma.cartItem.deleteMany({
    where: {
      userId,
      productId: { in: productIds },
    },
  });

  return NextResponse.json({ message: "삭제 완료" });
}
