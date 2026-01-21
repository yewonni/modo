"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LikeButton } from "@/components/Button";

const NEW_PRODUCTS = [
  {
    id: 1,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 2,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 3,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
];

const TREND_PRODUCTS = [
  {
    id: 101,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 102,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
  {
    id: 103,
    store: "스토어명",
    name: "상품명",
    price: "1,000",
    image: "/images/product1.png",
  },
];

export default function ProductsPage() {
  const { type } = useParams<{ type: string }>();

  const isNew = type === "new";
  const title = isNew ? "NEW ARRIVALS" : "TREND";
  const products = isNew ? NEW_PRODUCTS : TREND_PRODUCTS;

  return (
    <>
      <Header />

      <main className="pt-40 px-4 sm:px-40 pb-40">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10">{title}</h2>

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {products.map(({ id, store, name, price, image }) => (
            <li key={id}>
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                />
              </div>

              <div className="mt-3 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm sm:text-base">{store}</p>
                  <LikeButton />
                </div>
                <p className="text-sm sm:text-base">{name}</p>
                <p className="font-bold text-sm sm:text-base">{price}</p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}
