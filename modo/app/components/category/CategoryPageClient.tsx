"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pagination from "@/app/components/common/Pagination";
import CategoryList from "@/app/components/category/CategoryList";
import ProductCard from "@/app/components/common/ProductCard";
import FilterDropdown from "@/app/components/common/FilterDropdown";
import { useCategories } from "@/app/components/category/hooks/useCategories";
import { useActiveCategory } from "@/app/components/category/hooks/useActiveCategory";
import { PRODUCT_SORT, ProductSortType } from "@/app/constants/filterOptions";
import { Category } from "@/app/components/category/types";
import LoadingSpinner from "../common/LoadingSpinner";

export default function CategoryPageClient() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const categories: Category[] = useCategories();

  const [selectedFilter, setSelectedFilter] = useState<ProductSortType>(
    PRODUCT_SORT.PRICE_DESC,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 8;

  const { activeParent, activeChild, setActiveParent, setActiveChild } =
    useActiveCategory({
      slug,
      categories,
      onChange: () => setCurrentPage(1),
    });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilter, activeChild]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const sortParam =
          selectedFilter === PRODUCT_SORT.PRICE_ASC
            ? "priceAsc"
            : selectedFilter === PRODUCT_SORT.PRICE_DESC
              ? "priceDesc"
              : "latest";

        const params = new URLSearchParams({
          sort: sortParam,
          page: String(currentPage),
          perPage: String(itemsPerPage),
        });

        if (activeChild) {
          params.append("childId", String(activeChild.id));
        } else if (activeParent) {
          params.append("parentId", String(activeParent.id));
        }

        const res = await fetch(`/api/products?${params.toString()}`);
        const data = await res.json();

        setProducts(data.products || []);
        setTotalCount(data.totalCount || 0);
      } catch (error) {
        setProducts([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeParent, activeChild, selectedFilter, currentPage]);

  return (
    <div className="mt-30 lg:mt-45 px-4 lg:px-40 flex gap-10 mb-10 lg:mb-80">
      <CategoryList
        categories={categories}
        activeParent={activeParent}
        activeChild={activeChild}
        setActiveParent={setActiveParent}
        setActiveChild={setActiveChild}
      />

      <main className="flex-1">
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

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center py-20 text-secondary">상품이 없습니다.</p>
          ) : (
            <>
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      ...product,
                      price: Number(product.price),
                    }}
                  />
                ))}
              </ul>

              <Pagination
                totalItems={totalCount}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </section>
      </main>
    </div>
  );
}
