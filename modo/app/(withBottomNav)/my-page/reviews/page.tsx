"use client";

import { useState } from "react";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      product: "우드 테이블",
      content: "디자인도 좋고 튼튼해서 만족합니다.",
      date: "2026.01.11",
    },
    {
      id: 2,
      product: "패브릭 소파",
      content: "착석감이 좋아요.",
      date: "2026.01.07",
    },
  ]);

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <p className="text-xl sm:text-2xl">나의 리뷰</p>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-sub-bg rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6"
        >
          <div className="flex flex-col gap-2">
            <p className="text-sm text-gray-400">{review.product}</p>
            <p className="text-sm sm:text-base">{review.content}</p>
            <p className="text-xs text-gray-400">{review.date}</p>
          </div>

          <button
            onClick={() =>
              setReviews((prev) => prev.filter((r) => r.id !== review.id))
            }
            className="self-end sm:self-center text-sm text-gray-400 hover:text-gray-800"
          >
            삭제
          </button>
        </div>
      ))}
    </section>
  );
}
