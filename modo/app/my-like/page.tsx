"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Pagination from "@/components/common/Pagination";
import ProductCard from "@/components/my-like/ProductCard";

const ALL_PRODUCTS = [
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    store: `Store ${i + 1}`,
    name: `Product ${i + 1}`,
    price: `${(i + 1) * 1000}`,
    image: `/images/product${(i % 8) + 1}.png`,
  })),
];

export default function MyLikePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const displayedProducts = ALL_PRODUCTS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <Header />

      <main className="mt-37.5 lg:mt-45 px-4 lg:px-40">
        <h3 className="flex justify-start mb-6 font-bold text-base md:text-xl">
          좋아요 ({ALL_PRODUCTS.length})
        </h3>

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
