"use client";

import { useEffect, useState } from "react";
import Button, { StarButton } from "../common/Button";
import { apiRequest } from "@/app/lib/apiClient";

interface Review {
  id: number;
  content: string;
  rating: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}

interface Props {
  productId: number;
  hasOrdered: boolean;
}

export default function ProductReviews({ productId, hasOrdered }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await apiRequest<Review[]>(
        `/api/products/${productId}/reviews`,
      );
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("리뷰 조회 실패:", err);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmitReview = async () => {
    if (!reviewContent.trim()) return alert("리뷰 내용을 입력해주세요.");

    try {
      await apiRequest(`/api/products/${productId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
          content: reviewContent,
          rating: reviewRating,
        }),
      });
      setReviewContent("");
      setReviewRating(5);
      fetchReviews();
    } catch (err: any) {
      alert(err.message || "리뷰 작성 실패");
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      await apiRequest(`/api/products/${productId}/reviews/${reviewId}`, {
        method: "DELETE",
      });
      fetchReviews();
    } catch (err: any) {
      alert(err.message || "리뷰 삭제 실패");
    }
  };

  const renderStars = (rating: number, editable = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarButton
        key={i}
        active={i < rating}
        onClick={editable ? () => setReviewRating(i + 1) : undefined}
      />
    ));
  };

  return (
    <section className="flex flex-col gap-6 py-8">
      {hasOrdered && (
        <>
          <h3 className="text-2xl font-bold">리뷰 작성</h3>
          <div className="flex flex-col gap-2 rounded-md">
            <div className="flex gap-1">{renderStars(reviewRating, true)}</div>
            <textarea
              placeholder="리뷰를 작성해보세요."
              className="border p-4 rounded-md resize-none w-full h-32 mt-2"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitReview}>작성하기</Button>
            </div>
          </div>
        </>
      )}

      <h3 className="text-2xl font-bold mt-6">리뷰 목록</h3>

      {loading ? (
        <p className="text-center py-4 text-gray-500">로딩 중...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center py-4 text-gray-500">리뷰가 없습니다.</p>
      ) : (
        reviews.map((review) => (
          <article
            key={review.id}
            className="border-b py-4 flex flex-col sm:flex-row sm:justify-between gap-2"
          >
            <div className="flex flex-col gap-1">
              <p className="font-medium">{review.user.name}</p>
              <div className="flex gap-1">{renderStars(review.rating)}</div>
              <p className="text-gray-700">{review.content}</p>
              <p className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            {hasOrdered && (
              <button
                className="self-end text-sm text-gray-400 hover:text-gray-800"
                onClick={() => handleDeleteReview(review.id)}
              >
                삭제
              </button>
            )}
          </article>
        ))
      )}
    </section>
  );
}
