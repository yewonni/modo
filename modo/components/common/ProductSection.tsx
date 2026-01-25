"use client";

import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "./Button";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  store?: string;
}

interface ProductSectionProps {
  title: string;
  href: string;
  products: Product[];
}

export default function ProductSection({
  title,
  href,
  products,
}: ProductSectionProps) {
  return (
    <section className="pb-24 sm:pb-34">
      <div className="relative mb-5 sm:mb-10 flex items-center justify-between sm:justify-center">
        <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
        <Link
          href={href}
          className="font-medium hover:underline sm:absolute sm:right-0"
        >
          더보기
        </Link>
      </div>
      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 space-y-4 md:space-y-15">
        {products.map(({ id, store, name, price, image }) => (
          <li key={id}>
            <div className="relative aspect-square w-full overflow-hidden">
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105 hover:cursor-pointer"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <p className="font-bold">{store || "스토어명"}</p>
                <LikeButton />
              </div>
              <p>{name}</p>
              <p className="font-bold">{price.toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
