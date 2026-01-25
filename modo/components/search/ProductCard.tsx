"use client";

import Image from "next/image";
import { LikeButton } from "@/components/common/Button";

interface Product {
  id: number;
  store: string;
  name: string;
  price: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  const { store, name, price, image } = product;

  return (
    <li className="flex flex-col">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="cursor-pointer font-bold hover:underline max-w-22 sm:w-full text-sm lg:text-base line-clamp-1">
              {store}
            </p>
            <img src="/icons/chevron-right.svg" alt="" aria-hidden />
          </div>
          <LikeButton />
        </div>
        <p className="text-sm lg:text-base line-clamp-2">{name}</p>
        <p className="text-sm lg:text-base font-bold">{price}</p>
      </div>
    </li>
  );
}
