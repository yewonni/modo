import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export function getUserIdFromRequest(req: NextRequest): number {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("인증 토큰이 없습니다.");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: number;
    };

    return decoded.userId;
  } catch {
    throw new Error("유효하지 않은 토큰입니다.");
  }
}
