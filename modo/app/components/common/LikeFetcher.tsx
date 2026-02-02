"use client";

import { useEffect } from "react";
import { useLikeStore } from "@/app/store/likeStore";
import { useAuthStore } from "@/app/store/authStore";

export default function LikeFetcher() {
  const fetchLikes = useLikeStore((state) => state.fetchLikes);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      fetchLikes();
    }
  }, [accessToken, fetchLikes]);

  return null;
}
