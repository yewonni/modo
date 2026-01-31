"use client";

import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "./Button";
import { useLikeStore } from "@/app/store/likeStore";
import { useAuthStore } from "@/app/store/authStore";
import { useUIStore } from "@/app/store/uiStore";
import { Product } from "@/app/types/product";
import { apiRequest } from "@/app/lib/apiClient";

interface ProductCardProps {
  product: Product;
  linkPrefix?: string;
}

export default function ProductCard({
  product,
  linkPrefix = "/category",
}: ProductCardProps) {
  const { id, store, name, price, image } = product;
  const { likedProductIds, toggleLike } = useLikeStore();
  const { accessToken } = useAuthStore();
  const { openLoginModal } = useUIStore();

  const isLiked = likedProductIds.includes(id);

  const handleLike = async () => {
    if (!accessToken) return openLoginModal();

    try {
      toggleLike(id);
      if (isLiked) {
        await apiRequest("/api/likes", {
          method: "DELETE",
          body: JSON.stringify({ productId: id }),
        });
      } else {
        await apiRequest("/api/likes", {
          method: "POST",
          body: JSON.stringify({ productId: id }),
        });
      }
    } catch (err) {
      console.error(err);
      toggleLike(id);
    }
  };

  return (
    <li className="flex flex-col">
      <Link href={`${linkPrefix}/${id}`}>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
          />
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm lg:text-base line-clamp-1">
              {store || "STORE"}
            </p>
          </div>
          <LikeButton liked={isLiked} onChange={handleLike} />
        </div>

        <p className="text-sm lg:text-base line-clamp-2">{name}</p>
        <p className="text-sm lg:text-base font-bold">
          {price.toLocaleString()}
        </p>
      </div>
    </li>
  );
}
