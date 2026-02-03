"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button, { LikeButton } from "../common/Button";
import { Product } from "./types";
import { useLikeStore } from "@/app/store/likeStore";
import { useAuthStore } from "@/app/store/authStore";
import { useUIStore } from "@/app/store/uiStore";
import { apiRequest } from "@/app/lib/apiClient";
import { useCartStore } from "@/app/store/cartStore";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { showToast } from "../common/UniqueToast";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const { likedProductIds, toggleLike } = useLikeStore();
  const { accessToken } = useAuthStore();
  const { openLoginModal } = useUIStore();
  const { addItem } = useCartStore();
  const { setItems } = useCheckoutStore();

  const isLiked = likedProductIds.includes(product.id);

  const handleLike = useCallback(async () => {
    if (!accessToken) return openLoginModal();

    try {
      toggleLike(product.id);
      await apiRequest("/api/likes", {
        method: isLiked ? "DELETE" : "POST",
        body: JSON.stringify({ productId: product.id }),
      });
    } catch (err) {
      showToast("좋아요 처리 실패", `like-error-${product.id}`);
      toggleLike(product.id);
    }
  }, [accessToken, isLiked, openLoginModal, product.id, toggleLike]);

  const handleAddToCart = useCallback(async () => {
    if (!accessToken) return openLoginModal();

    try {
      await apiRequest("/api/cart", {
        method: "POST",
        body: JSON.stringify({ productId: product.id, quantity }),
      });

      addItem({
        productId: product.id,
        name: product.name,
        store: product.store || "스토어 정보 없음",
        price: product.price,
        image: product.image,
        quantity,
      });

      showToast("장바구니에 담겼습니다", `cart-success-${product.id}`);
    } catch (err: any) {
      showToast(
        err.message || "장바구니 추가 실패",
        `cart-error-${product.id}`,
      );
    }
  }, [accessToken, addItem, openLoginModal, product, quantity]);

  const handleBuyNow = useCallback(() => {
    if (!accessToken) return openLoginModal();

    setItems([
      {
        productId: product.id,
        name: product.name,
        store: product.store || "스토어 정보 없음",
        price: product.price,
        image: product.image,
        quantity,
      },
    ]);

    router.push("/checkout");
  }, [accessToken, openLoginModal, product, quantity, router, setItems]);

  return (
    <section aria-label="상품 상세 정보" className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold">{product.store}</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* 이미지 */}
        <div className="w-full max-w-125 mx-auto lg:mx-0">
          <div className="relative w-full aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 1024px) 100vw, 500px"
              priority
            />
          </div>
        </div>

        {/* 상세 정보 */}
        <article className="w-full lg:max-w-150 flex flex-col gap-6">
          <header className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <LikeButton liked={isLiked} onChange={handleLike} />
          </header>
          <p className="text-xl font-bold">
            {product.price.toLocaleString()}원
          </p>

          {/* 배송정보, 배송비, 혜택 */}
          <section className="flex flex-col gap-3 text-secondary">
            <div className="flex gap-7">
              <p className="font-medium text-gray-500 min-w-20">배송정보</p>
              <p>1 ~ 3일 내 출고 예정</p>
            </div>
            <div className="flex gap-7">
              <p className="font-medium text-gray-500 min-w-20">배송비</p>
              <p>3,000원</p>
            </div>
            <div className="flex gap-7">
              <p className="font-medium text-gray-500 min-w-20">혜택안내</p>
              <ul className="flex flex-col gap-1 list-disc list-inside text-secondary">
                <li>신규 회원 5% 할인</li>
                <li>리뷰 적립금 최대 3,000P</li>
                <li className="text-point">회원 등급별 혜택</li>
              </ul>
            </div>
          </section>

          {/* 수량 선택 */}
          <section className="bg-sub-bg rounded-md p-4 flex flex-col gap-3">
            <p className="font-semibold">수량</p>
            <div className="flex w-max border border-gray-300 rounded-md overflow-hidden bg-white">
              <button
                className="px-4 py-2 hover:bg-gray-100 text-secondary"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <div className="px-4 py-2 border-x border-gray-300 flex items-center justify-center w-10 text-secondary">
                {quantity}
              </div>
              <button
                className="px-4 py-2 hover:bg-gray-100 text-secondary"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </section>

          {/* 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button
              variant="outline"
              className="flex-1 py-3"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
            <Button className="flex-1 py-3" onClick={handleBuyNow}>
              BUY NOW
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
}
