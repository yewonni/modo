import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
  const { email, phone, password, name } = await request.json();

  if (!email || !phone || !password || !name) {
    return NextResponse.json({ message: "필수값 누락" }, { status: 400 });
  }

  const normalizedPhone = phone.replace(/[^0-9]/g, "");

  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ email }, { phone: normalizedPhone }] },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "이미 가입된 사용자" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: { email, phone: normalizedPhone, password: hashedPassword, name },
  });

  return NextResponse.json({ message: "회원가입 완료" }, { status: 201 });
}
