"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import FilterDropdown from "@/app/components/common/FilterDropdown";
import ProductCard from "@/app/components/common/ProductCard";
import Pagination from "@/app/components/common/Pagination";
import { PRODUCT_SORT, ProductSortType } from "@/app/constants/filterOptions";
import LoginModal from "@/app/components/common/LoginModal";
import LoadingSpinner from "../common/LoadingSpinner";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const [selectedFilter, setSelectedFilter] = useState<ProductSortType>(
    PRODUCT_SORT.PRICE_DESC,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 8;

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

        const res = await fetch(
          `/api/search?q=${encodeURIComponent(
            query,
          )}&sort=${sortParam}&page=${currentPage}&perPage=${itemsPerPage}`,
        );
        const data = await res.json();

        setProducts(data.products);
        setTotalCount(data.totalCount);
      } catch (error) {
        setProducts([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, selectedFilter, currentPage]);

  return (
    <>
      <main className="mt-37.5 lg:mt-45 px-4 lg:px-40">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-base md:text-xl">
            {loading ? "검색 중..." : `총 ${totalCount}개 상품`}
          </h3>
          <FilterDropdown
            selected={selectedFilter}
            setSelected={setSelectedFilter}
          />
        </div>

        <section className="pb-24 lg:pb-34 mt-4 lg:mt-10">
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : products.length === 0 ? (
            <p className="text-center py-20 text-secondary">
              "{query}" 검색 결과가 없습니다.
            </p>
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
      <LoginModal />
    </>
  );
}
