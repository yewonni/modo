"use client";

import { LikeButton } from "./Button";
import { useLikeStore } from "@/app/store/likeStore";
import { useAuthStore } from "@/app/store/authStore";
import { useUIStore } from "@/app/store/uiStore";
import { apiRequest } from "@/app/lib/apiClient";

interface Props {
  productId: number;
}

export default function ProductLikeButton({ productId }: Props) {
  const { likedProductIds, toggleLike } = useLikeStore();
  const { accessToken } = useAuthStore();
  const { openLoginModal } = useUIStore();

  const isLiked = likedProductIds.includes(productId);

  const handleLike = async () => {
    if (!accessToken) return openLoginModal();

    try {
      toggleLike(productId);
      await apiRequest("/api/likes", {
        method: isLiked ? "DELETE" : "POST",
        body: JSON.stringify({ productId }),
      });
    } catch {
      toggleLike(productId);
    }
  };

  return <LikeButton liked={isLiked} onChange={handleLike} />;
}
