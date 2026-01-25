"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FilterDropdown from "@/components/common/FilterDropdown";
import ProductCard from "@/components/search/ProductCard";
import Pagination from "@/components/common/Pagination";
import { PRODUCT_SORT, ProductSortType } from "@/components/category/utils";

const ALL_PRODUCTS = [
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    store: `Store ${i + 1}`,
    name: `Product ${i + 1}`,
    price: `${(i + 1) * 1000}`,
    image: `/images/product${(i % 8) + 1}.png`,
  })),
];

export default function SearchPage() {
  const [selectedFilter, setSelectedFilter] = useState<ProductSortType>(
    PRODUCT_SORT.PRICE_DESC,
  );
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
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-base md:text-xl">
            총 {ALL_PRODUCTS.length}개 상품
          </h3>
          <FilterDropdown
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
        </div>

        <section className="pb-24 lg:pb-34 mt-4 lg:mt-10">
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
