import Image from "next/image";
import Link from "next/link";
import ProductLikeButton from "./ProductLikeButton";
import { Product } from "@/app/types/product";
import React from "react";

interface Props {
  product: Product;
  linkPrefix?: string;
}

function ProductCard({ product, linkPrefix = "/category" }: Props) {
  const { id, store, name, price, image } = product;

  return (
    <li className="flex flex-col">
      <Link href={`${linkPrefix}/${id}`}>
        <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-50">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            style={{ objectFit: "cover" }}
          />
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm lg:text-base line-clamp-1">
            {store || "STORE"}
          </p>

          <ProductLikeButton productId={id} />
        </div>

        <p className="text-sm lg:text-base line-clamp-2">{name}</p>
        <p className="text-sm lg:text-base font-bold">
          {price.toLocaleString()}
        </p>
      </div>
    </li>
  );
}

export default React.memo(ProductCard);
