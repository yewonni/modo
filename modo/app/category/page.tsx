"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Pagination from "@/components/common/Pagination";
import CategoryList from "@/components/category/CategoryList";
import ProductCard from "@/components/category/ProductCard";
import FilterDropdown from "@/components/common/FilterDropdown";
import { useCategories } from "@/components/category/hooks/useCategories";
import { useProducts } from "@/components/category/hooks/useProducts";
import { useActiveCategory } from "@/components/category/hooks/useActiveCategory";
import { useProductList } from "@/components/category/hooks/useProductList";
import { PRODUCT_SORT, ProductSortType } from "@/components/category/utils";

export default function CategoryPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const categories = useCategories();
  const products = useProducts();

  const [selectedFilter, setSelectedFilter] = useState<ProductSortType>(
    PRODUCT_SORT.PRICE_DESC,
  );
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  const { activeParent, activeChild, setActiveParent, setActiveChild } =
    useActiveCategory({
      slug,
      categories,
      onChange: () => setCurrentPage(1),
    });

  const { displayedProducts, totalCount } = useProductList({
    products,
    activeParent,
    activeChild,
    selectedFilter,
    currentPage,
    itemsPerPage,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, activeChild]);

  return (
    <>
      <Header />
      <div className="mt-30 lg:mt-45 px-4 lg:px-40 flex gap-10 mb-10 lg:mb-80">
        {/* Desktop Category */}
        <CategoryList
          categories={categories}
          activeParent={activeParent}
          activeChild={activeChild}
          setActiveParent={setActiveParent}
          setActiveChild={setActiveChild}
        />

        <main className="flex-1">
          {/* Mobile Category */}
          <CategoryList
            categories={categories}
            activeParent={activeParent}
            activeChild={activeChild}
            setActiveParent={setActiveParent}
            setActiveChild={setActiveChild}
            isDesktop={false}
          />
          <section className="pb-24 lg:pb-10 mt-4 lg:mt-10">
            <div className="flex justify-end mb-4">
              <FilterDropdown
                selected={selectedFilter}
                setSelected={setSelectedFilter}
              />
            </div>
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ul>
            <Pagination
              totalItems={totalCount}
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
