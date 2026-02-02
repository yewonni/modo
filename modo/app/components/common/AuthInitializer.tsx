"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { refreshAccessToken } from "@/app/lib/api";

export default function AuthInitializer() {
  const setAccessToken = useAuthStore((s) => s.setAccessToken);
  const setInitialized = useAuthStore((s) => s.setInitialized);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const newToken = await refreshAccessToken();
        if (newToken) {
          setAccessToken(newToken);
        }
      } catch {
      } finally {
        setInitialized(true);
      }
    };

    initAuth();
  }, [setAccessToken, setInitialized]);

  return null;
}
