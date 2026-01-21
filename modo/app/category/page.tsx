"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LikeButton } from "@/components/Button";
import Pagination from "@/components/Pagination";

const CATEGORIES = [
  { name: "FURNITURE", children: ["Table", "Chair", "Sofa", "Storage"] },
  {
    name: "LIGHTING",
    children: ["Table Lamp", "Floor Lamp", "Ceiling Light", "Wall Light"],
  },
  {
    name: "DECOR",
    children: ["Vase & Planter", "Candle & Diffuser", "Wall Decor", "Object"],
  },
  { name: "TEXTILE", children: ["Rug", "Cushion", "Blanket", "Curtain"] },
];

const PRODUCTS: Record<string, any[]> = {
  FURNITURE: Array.from({ length: 8 }).map((_, i) => ({
    id: 100 + i,
    store: `Furniture Store ${i + 1}`,
    name: `Furniture Product ${i + 1}`,
    price: `${(i + 1) * 1000}`,
    child: ["Table", "Chair", "Sofa", "Storage"][i % 4],
    image: `/images/product${(i % 8) + 1}.png`,
  })),
  LIGHTING: Array.from({ length: 8 }).map((_, i) => ({
    id: 200 + i,
    store: `Lighting Store ${i + 1}`,
    name: `Lighting Product ${i + 1}`,
    price: `${(i + 1) * 2000}`,
    child: ["Table Lamp", "Floor Lamp", "Ceiling Light", "Wall Light"][i % 4],
    image: `/images/product${(i % 8) + 1}.png`,
  })),
  DECOR: Array.from({ length: 8 }).map((_, i) => ({
    id: 300 + i,
    store: `Decor Store ${i + 1}`,
    name: `Decor Product ${i + 1}`,
    price: `${(i + 1) * 1500}`,
    child: ["Vase & Planter", "Candle & Diffuser", "Wall Decor", "Object"][
      i % 4
    ],
    image: `/images/product${(i % 8) + 1}.png`,
  })),
  TEXTILE: Array.from({ length: 8 }).map((_, i) => ({
    id: 400 + i,
    store: `Textile Store ${i + 1}`,
    name: `Textile Product ${i + 1}`,
    price: `${(i + 1) * 1200}`,
    child: ["Rug", "Cushion", "Blanket", "Curtain"][i % 4],
    image: `/images/product${(i % 8) + 1}.png`,
  })),
};

const FILTER_OPTIONS = ["높은가격순", "낮은가격순", "리뷰많은순"];

function FilterDropdown({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (opt: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
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

function CategoryList({
  activeParent,
  activeChild,
  setActiveParent,
  setActiveChild,
  isDesktop = true,
}: {
  activeParent: string;
  activeChild: string | null;
  setActiveParent: (cat: string) => void;
  setActiveChild: (child: string | null) => void;
  isDesktop?: boolean;
}) {
  if (isDesktop) {
    return (
      <aside className="hidden lg:block space-y-6 border-r border-r-border pr-10 w-42.5 min-h-200">
        {CATEGORIES.map((cat) => (
          <div key={cat.name}>
            <h3
              className={`mb-2 text-lg font-bold cursor-pointer ${
                cat.name === activeParent ? "border-b-2 border-black" : ""
              }`}
              onClick={() => {
                setActiveParent(cat.name);
                setActiveChild(null);
              }}
            >
              {cat.name}
            </h3>
            <ul className="ml-4 list-disc space-y-1 text-sm">
              {cat.children.map((child) => (
                <li
                  key={child}
                  className={`cursor-pointer ${
                    cat.name === activeParent && child === activeChild
                      ? "font-bold text-primary underline"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveParent(cat.name);
                    setActiveChild(child);
                  }}
                >
                  {child}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
    );
  } else {
    return (
      <div className="lg:hidden mb-4 -mx-4">
        <h3 className="font-bold mb-2 text-lg py-3 border-b border-b-border text-center">
          {activeParent}
        </h3>
        <ul className="flex justify-between overflow-x-auto whitespace-nowrap px-4 pb-2 border-b border-b-border">
          <li
            className={`cursor-pointer ${
              activeChild === null ? "font-bold text-primary underline" : ""
            }`}
            onClick={() => setActiveChild(null)}
          >
            ALL
          </li>
          {CATEGORIES.find((cat) => cat.name === activeParent)?.children.map(
            (child) => (
              <li
                key={child}
                className={`cursor-pointer ${
                  child === activeChild
                    ? "font-bold text-primary underline"
                    : ""
                }`}
                onClick={() => setActiveChild(child)}
              >
                {child}
              </li>
            )
          )}
        </ul>
      </div>
    );
  }
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
            <p className="cursor-pointer font-bold hover:underline max-w-22 sm:w-full sm:max-w-full text-sm lg:text-base line-clamp-1">
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

export default function CategoryPage() {
  const [activeParent, setActiveParent] = useState("FURNITURE");
  const [activeChild, setActiveChild] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("높은가격순");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  const filteredProducts = PRODUCTS[activeParent].filter((p) =>
    activeChild ? p.child === activeChild : true
  );

  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Header />
      <div className="mt-30 lg:mt-45 px-4 lg:px-40 flex gap-10 mb-10 lg:mb-80">
        <CategoryList
          activeParent={activeParent}
          activeChild={activeChild}
          setActiveParent={setActiveParent}
          setActiveChild={setActiveChild}
        />

        <main className="flex-1 relative">
          <CategoryList
            activeParent={activeParent}
            activeChild={activeChild}
            setActiveParent={setActiveParent}
            setActiveChild={setActiveChild}
            isDesktop={false}
          />
          <div className="lg:hidden flex justify-end mt-4">
            <FilterDropdown
              selected={selectedFilter}
              setSelected={setSelectedFilter}
            />
          </div>

          <div className="hidden lg:flex justify-between items-center mb-6">
            <h3 className="font-bold text-xl">
              {activeParent}
              {activeChild ? ` / ${activeChild}` : ""}
            </h3>
            <FilterDropdown
              selected={selectedFilter}
              setSelected={setSelectedFilter}
            />
          </div>

          <section className="pb-24 lg:pb-10 mt-4 lg:mt-10">
            <h4 className="sr-only">상품 목록</h4>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>

            <Pagination
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
