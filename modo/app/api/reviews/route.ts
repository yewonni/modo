import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserIdFromRequest } from "@/app/lib/getUser";

export async function GET(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);

    const reviews = await prisma.review.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (err: any) {
    console.error("내 리뷰 조회 실패:", err);
    return NextResponse.json(
      { message: err.message || "내 리뷰 조회 실패" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(req);
    const { searchParams } = new URL(req.url);
    const reviewId = searchParams.get("id");

    if (!reviewId) {
      return NextResponse.json(
        { message: "리뷰 ID가 필요합니다" },
        { status: 400 },
      );
    }

    const review = await prisma.review.findUnique({
      where: { id: Number(reviewId) },
    });

    if (!review || review.userId !== userId) {
      return NextResponse.json(
        { message: "삭제 권한이 없습니다" },
        { status: 403 },
      );
    }

    await prisma.review.delete({ where: { id: Number(reviewId) } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("리뷰 삭제 실패:", err);
    return NextResponse.json(
      { message: err.message || "리뷰 삭제 실패" },
      { status: 500 },
    );
  }
}
