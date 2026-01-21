"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LikeButton } from "@/components/Button";
import Pagination from "@/components/Pagination";

const FILTER_OPTIONS = ["높은가격순", "낮은가격순", "리뷰많은순"];

const ALL_PRODUCTS = [
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    store: `Store ${i + 1}`,
    name: `Product ${i + 1}`,
    price: `${(i + 1) * 1000}`,
    image: `/images/product${(i % 8) + 1}.png`,
  })),
];

function FilterDropdown({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (opt: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center w-27.5 bg-white rounded-md px-3 py-2 font-medium hover:cursor-pointer text-sm mg:text-base"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex-1 text-left">{selected}</span>
        <Image src="/icons/chevron-bottom.svg" alt="" width={12} height={12} />
      </button>

      {open && (
        <div className="mt-2 w-27.5 bg-white shadow-md border border-border rounded-md absolute right-0 top-full flex flex-col z-50 text-sm mg:text-base">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              className={`text-left px-3 py-2 hover:bg-gray-100 ${
                selected === opt ? "text-point font-bold" : "text-black"
              }`}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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

export default function SearchPage() {
  const [selectedFilter, setSelectedFilter] = useState("높은가격순");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8; // 모바일 2x4 = 8개씩
  const displayedProducts = ALL_PRODUCTS.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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

        {/* List */}
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
