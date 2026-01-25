import Link from "next/link";
import Image from "next/image";
import { Product } from "./types";
import { LikeButton } from "@/components/common/Button";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <li className="flex flex-col">
      <Link href={`/category/${product.id}`}>
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <p className="font-bold text-sm line-clamp-1">
            {product.store ?? "STORE"}
          </p>
          <LikeButton />
        </div>

        <p className="text-sm line-clamp-2">{product.name}</p>
        <p className="font-bold text-sm">{product.price}</p>
      </div>
    </li>
  );
}
