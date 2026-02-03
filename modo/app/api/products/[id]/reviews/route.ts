export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserIdFromRequest } from "@/app/lib/getUser";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId: Number(params.id) },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 조회 실패" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId)
      return NextResponse.json(
        { message: "로그인이 필요합니다" },
        { status: 401 },
      );

    const { content, rating } = await req.json();

    const hasOrdered = await prisma.orderItem.findFirst({
      where: { productId: Number(params.id), order: { userId } },
    });
    if (!hasOrdered) {
      return NextResponse.json(
        { message: "주문한 상품에 대해서만 리뷰 작성 가능" },
        { status: 403 },
      );
    }

    const review = await prisma.review.create({
      data: {
        userId,
        productId: Number(params.id),
        content,
        rating,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 작성 실패" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId)
      return NextResponse.json(
        { message: "로그인이 필요합니다" },
        { status: 401 },
      );

    const reviewId = new URL(req.url).searchParams.get("id");
    if (!reviewId)
      return NextResponse.json({ message: "reviewId 필요" }, { status: 400 });

    const review = await prisma.review.findUnique({
      where: { id: Number(reviewId) },
    });
    if (!review || review.userId !== userId)
      return NextResponse.json({ message: "삭제 권한 없음" }, { status: 403 });

    await prisma.review.delete({ where: { id: Number(reviewId) } });

    return NextResponse.json({ message: "리뷰 삭제 완료" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 삭제 실패" }, { status: 500 });
  }
}
