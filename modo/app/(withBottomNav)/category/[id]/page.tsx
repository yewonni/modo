"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Footer from "@/app/components/common/Footer";
import ProductDetails from "@/app/components/category/ProductDetails";
import ProductDescription from "@/app/components/category/ProductDescription";
import ProductReviews from "@/app/components/category/ProductReviews";
import { Product } from "@/app/components/category/types";
import LoginModal from "@/app/components/common/LoginModal";
import { apiRequest } from "@/app/lib/apiClient";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasOrdered, setHasOrdered] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("상품 조회 실패");
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const fetchHasOrdered = async () => {
      try {
        const data = await apiRequest<{ hasOrdered: boolean }>(
          `/api/orders/check?productId=${id}`,
        );
        setHasOrdered(data.hasOrdered);
      } catch (err) {
        setHasOrdered(false);
      }
    };

    fetchHasOrdered();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!product)
    return (
      <p className="p-8 text-center text-gray-500">상품을 찾을 수 없습니다.</p>
    );

  return (
    <>
      <main className="mt-37.5 lg:mt-45 px-4 md:px-20 lg:px-40 flex flex-col gap-16">
        <ProductDetails product={product} />
        <ProductDescription description={product.category?.name} />
        <ProductReviews productId={product.id} hasOrdered={hasOrdered} />
      </main>
      <Footer />
      <LoginModal />
    </>
  );
}
