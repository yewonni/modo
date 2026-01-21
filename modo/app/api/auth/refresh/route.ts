import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token이 없습니다." },
        { status: 401 }
      );
    }

    const authHeader = request.headers.get("authorization");
    let accessToken: string | null = null;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      accessToken = authHeader.split(" ")[1];
    }

    if (accessToken) {
      try {
        jwt.verify(accessToken, process.env.JWT_SECRET as string);
        return NextResponse.json({ message: "Access token이 유효함" });
      } catch {
        // 만료된 경우
      }
    }

    // Refresh Token 검증
    let decoded;
    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as { userId: string };
    } catch (error) {
      cookieStore.delete("refreshToken");
      return NextResponse.json(
        { message: "유효하지 않은 refresh token" },
        { status: 401 }
      );
    }

    // 새로운 토큰 발급
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_REFRESH_SECRET as string,
      { expiresIn: "7d" }
    );

    // Refresh Token 쿠키 갱신
    cookieStore.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return NextResponse.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json(
      { message: "refresh token 갱신 실패" },
      { status: 500 }
    );
  }
}
