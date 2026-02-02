export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { getUserIdFromRequest } from "@/app/lib/getUser";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; reviewId: string } },
) {
  try {
    const userId = await getUserIdFromRequest(req);
    if (!userId) {
      return NextResponse.json(
        { message: "로그인이 필요합니다" },
        { status: 401 },
      );
    }

    const review = await prisma.review.findUnique({
      where: { id: Number(params.reviewId) },
    });

    if (!review || review.userId !== userId) {
      return NextResponse.json(
        { message: "삭제 권한이 없습니다" },
        { status: 403 },
      );
    }

    await prisma.review.delete({ where: { id: review.id } });

    return NextResponse.json({ message: "리뷰 삭제 완료" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "리뷰 삭제 실패" }, { status: 500 });
  }
}
