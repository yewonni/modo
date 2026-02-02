"use client";

import { useEffect, useState, useCallback } from "react";
import Button, { StarButton } from "../common/Button";
import { apiRequest } from "@/app/lib/apiClient";
import { showToast } from "../common/UniqueToast";
import LoadingSpinner from "../common/LoadingSpinner";

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

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest<Review[]>(
        `/api/products/${productId}/reviews`,
      );
      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmitReview = useCallback(async () => {
    if (!reviewContent.trim()) {
      showToast("리뷰 내용을 입력해주세요.", "review-empty");
      return;
    }

    const newReview: Review = {
      id: Date.now(),
      content: reviewContent,
      rating: reviewRating,
      createdAt: new Date().toISOString(),
      user: { id: 0, name: "나" },
    };
    setReviews((prev) => [newReview, ...prev]);
    setReviewContent("");
    setReviewRating(5);

    try {
      await apiRequest(`/api/products/${productId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
          content: newReview.content,
          rating: newReview.rating,
        }),
      });

      fetchReviews();
      showToast("리뷰가 작성되었습니다", `review-success-${newReview.id}`);
    } catch (err: any) {
      showToast(
        err.message || "리뷰 작성 실패",
        `review-error-${newReview.id}`,
      );
      setReviews((prev) => prev.filter((r) => r.id !== newReview.id));
    }
  }, [reviewContent, reviewRating, productId, fetchReviews]);

  const handleDeleteReview = useCallback(
    async (reviewId: number) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;

      const prevReviews = [...reviews];
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));

      try {
        await apiRequest(`/api/products/${productId}/reviews/${reviewId}`, {
          method: "DELETE",
        });

        showToast("리뷰가 삭제되었습니다", `review-delete-${reviewId}`);
      } catch (err: any) {
        showToast(
          err.message || "리뷰 삭제 실패",
          `review-delete-error-${reviewId}`,
        );
        setReviews(prevReviews);
      }
    },
    [productId, reviews],
  );

  const renderStars = (rating: number, editable = false) =>
    Array.from({ length: 5 }, (_, i) => (
      <StarButton
        key={i}
        active={i < rating}
        onClick={editable ? () => setReviewRating(i + 1) : undefined}
      />
    ));

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
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
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
