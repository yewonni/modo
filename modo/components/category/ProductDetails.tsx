"use client";

import { useState } from "react";
import Image from "next/image";
import Button, { LikeButton } from "../common/Button";
import { Product } from "./types";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section aria-label="스토어 정보" className="flex flex-col gap-10">
      <h1 className="text-2xl font-bold">{product.store}</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Product Image */}
        <div className="w-full max-w-125 mx-auto lg:mx-0">
          <div className="relative w-full aspect-square">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-md"
              sizes="(max-width: 1024px) 100vw, 500px"
            />
          </div>
        </div>

        {/* Product Info */}
        <article className="w-full lg:max-w-150 flex flex-col gap-6">
          <header className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{product.name}</h2>
            <LikeButton />
          </header>

          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">
              {product.price.toLocaleString()}원
            </p>
            <p className="text-gray-500 underline">128 reviews</p>
          </div>

          {/* Order Info */}
          <section className="flex flex-col gap-3 text-gray-700">
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
              <ul className="flex flex-col gap-1 list-disc list-inside text-gray-700">
                <li>신규 회원 5% 할인</li>
                <li>리뷰 적립금 최대 3,000P</li>
                <li className="text-point">회원 등급별 혜택</li>
              </ul>
            </div>
          </section>

          {/* Quantity */}
          <section className="bg-sub-bg rounded-md p-4 flex flex-col gap-3">
            <p className="font-semibold">수량</p>
            <div className="flex w-max border border-gray-300 rounded-md overflow-hidden bg-white">
              <button
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <div className="px-4 py-2 border-x border-gray-300 flex items-center justify-center w-10">
                {quantity}
              </div>
              <button
                className="px-4 py-2 hover:bg-gray-100"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button variant="outline" className="flex-1 py-3">
              ADD TO CART
            </Button>
            <Button className="flex-1 py-3">BUY NOW</Button>
          </div>
        </article>
      </div>
    </section>
  );
}
