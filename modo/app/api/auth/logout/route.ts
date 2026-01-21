import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("refreshToken");

    return NextResponse.json({ message: "로그아웃 성공" }, { status: 200 });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "로그아웃 실패" }, { status: 500 });
  }
}
