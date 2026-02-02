"use client";

import { useState, useEffect } from "react";
import Pagination from "@/app/components/common/Pagination";
import ProductCard from "@/app/components/common/ProductCard";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";
import { useLikeStore } from "@/app/store/likeStore";
import { apiRequest } from "@/app/lib/apiClient";

interface Product {
  id: number;
  store: string;
  name: string;
  price: number;
  image: string;
  category: { id: number; name: string; slug: string };
}

export default function MyLikePage() {
  const { likedProductIds, fetchLikes } = useLikeStore();

  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 8;

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  useEffect(() => {
    async function updateProducts() {
      setLoading(true);

      if (likedProductIds.length === 0) {
        setLikedProducts([]);
        setLoading(false);
        return;
      }

      try {
        const products = await apiRequest<Product[]>("/api/products", {
          method: "POST",
          body: JSON.stringify({ ids: likedProductIds }),
        });
        setLikedProducts(products);
      } catch (err) {
        setLikedProducts([]);
      } finally {
        setLoading(false);
      }
    }

    updateProducts();
  }, [likedProductIds]);

  const displayedProducts = likedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <main className="mt-37.5 lg:mt-45 px-4 lg:px-40 min-h-[60vh]">
        <h3 className="flex justify-start mb-6 text-base md:text-xl">
          좋아요 ({likedProducts.length})
        </h3>

        <section className="pb-24 lg:pb-34 mt-4 lg:mt-10">
          <h4 className="sr-only">상품 목록</h4>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <LoadingSpinner />
            </div>
          ) : likedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-secondary text-base md:text-lg">
              좋아요한 상품이 없습니다.
            </div>
          ) : (
            <>
              <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </ul>

              <Pagination
                totalItems={likedProducts.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
}
