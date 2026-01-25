import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@/prisma/client";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("login body:", body);

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ message: "필수값 누락" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "아이디 또는 비밀번호를 확인해주세요." },
        { status: 401 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { message: "아이디 또는 비밀번호를 확인해주세요." },
        { status: 401 },
      );
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ accessToken });
  } catch (err) {
    console.error("login error:", err);
    return NextResponse.json({ message: "서버 오류" }, { status: 500 });
  }
}
