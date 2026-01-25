"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { refreshAccessToken } from "@/lib/api";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setAccessToken, setInitialized, isInitialized } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const newAccessToken = await refreshAccessToken();
        setAccessToken(newAccessToken);
        console.log("자동 로그인 성공");
      } catch (error) {
        console.log("자동 로그인 실패 (로그인 필요)");
      } finally {
        setInitialized(true);
      }
    };

    if (!isInitialized) {
      initAuth();
    }
  }, [setAccessToken, setInitialized, isInitialized]);

  return <>{children}</>;
}
