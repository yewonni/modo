"use client";

import { useState } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex gap-2">
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1 rounded-md border ${
                currentPage === page
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-black border-border hover:bg-gray-100"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
