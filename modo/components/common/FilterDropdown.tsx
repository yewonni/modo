"use client";

import { useState } from "react";
import Image from "next/image";
import { ProductSortType, PRODUCT_SORT } from "@/components/category/utils";

interface Props {
  selected: ProductSortType;
  setSelected: (opt: ProductSortType) => void;
}

const FILTER_OPTIONS: ProductSortType[] = [
  PRODUCT_SORT.PRICE_DESC,
  PRODUCT_SORT.PRICE_ASC,
];

export default function FilterDropdown({ selected, setSelected }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* 버튼 */}
      <button
        type="button"
        className="flex items-center w-27.5 bg-white rounded-md px-3 py-2 font-medium hover:cursor-pointer text-sm mg:text-base"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex-1 text-left">{selected}</span>
        <Image src="/icons/chevron-bottom.svg" alt="" width={12} height={12} />
      </button>

      {/* 옵션 리스트 */}
      {open && (
        <div className="mt-2 w-27.5 bg-white shadow-md border border-border rounded-md absolute right-0 top-full flex flex-col z-50 text-sm mg:text-base">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`text-left px-3 py-2 hover:bg-gray-100 ${
                selected === opt ? "text-point font-bold" : "text-black"
              }`}
              onClick={() => {
                setSelected(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
