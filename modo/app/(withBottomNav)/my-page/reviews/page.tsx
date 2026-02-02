"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/lib/apiClient";

interface Review {
  id: number;
  product: { id: number; name: string };
  content: string;
  createdAt: string;
}

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await apiRequest<Review[]>("/api/reviews");
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("내 리뷰 조회 실패:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await apiRequest(`/api/reviews?id=${id}`, { method: "DELETE" });
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      alert(err.message || "리뷰 삭제 실패");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading)
    return <p className="p-8 text-center text-gray-500">로딩 중...</p>;

  if (reviews.length === 0)
    return (
      <p className="p-8 text-center text-gray-500">작성한 리뷰가 없습니다.</p>
    );

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <p className="text-xl sm:text-2xl">나의 리뷰</p>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-sub-bg rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">{review.product.name}</p>
            <p className="text-sm sm:text-base">{review.content}</p>
            <p className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={() => handleDelete(review.id)}
            className="self-end sm:self-center text-sm text-gray-400 hover:text-gray-800"
          >
            삭제
          </button>
        </div>
      ))}
    </section>
  );
}
