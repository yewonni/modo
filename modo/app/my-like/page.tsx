"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LikeButton } from "@/components/Button";
import Pagination from "@/components/Pagination";

const ALL_PRODUCTS = [
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    store: `Store ${i + 1}`,
    name: `Product ${i + 1}`,
    price: `${(i + 1) * 1000}`,
    image: `/images/product${(i % 8) + 1}.png`,
  })),
];

function ProductCard({ product }: { product: any }) {
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

export default function MyLikePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const displayedProducts = ALL_PRODUCTS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />

      <main className="mt-37.5 lg:mt-45 px-4 lg:px-40">
        <h3 className="flex justify-start mb-6 font-bold text-base md:text-xl">
          좋아요 ({ALL_PRODUCTS.length})
        </h3>

        {/* Product List */}
        <section className="pb-24 lg:pb-34 mt-4 lg:mt-10">
          <h4 className="sr-only">상품 목록</h4>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ul>

          <Pagination
            totalItems={ALL_PRODUCTS.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
