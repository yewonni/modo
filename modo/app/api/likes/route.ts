export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserIdFromRequest } from "@/app/lib/getUser";

export async function GET(req: NextRequest) {
  try {
    let userId;
    try {
      userId = getUserIdFromRequest(req);
      console.log("userId:", userId);
    } catch (err) {
      console.error("getUserIdFromRequest 실패:", err);
      return NextResponse.json(
        { message: "사용자 인증 실패" },
        { status: 401 },
      );
    }

    const likes = await prisma.like.findMany({
      where: { userId },
      select: { productId: true },
    });

    return NextResponse.json({
      likedProductIds: likes.map((l) => l.productId),
    });
  } catch (err) {
    console.error("좋아요 조회 실패:", err);
    return NextResponse.json({ message: "좋아요 조회 실패" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = await req.json();

    await prisma.like.create({ data: { userId, productId } });
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { message: "이미 좋아요한 상품입니다." },
        { status: 409 },
      );
    }
    return NextResponse.json({ message: "좋아요 실패" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = getUserIdFromRequest(req);
    const { productId } = await req.json();

    await prisma.like.delete({
      where: { userId_productId: { userId, productId } },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: "좋아요 취소 실패" }, { status: 500 });
  }
}
