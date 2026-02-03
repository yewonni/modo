"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ProductSortType, PRODUCT_SORT } from "@/app/constants/filterOptions";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center w-27.5 bg-white dark:bg-gray-800 rounded-md px-3 py-2 font-medium hover:cursor-pointer text-sm mg:text-base text-foreground border border-border"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="flex-1 text-left">{selected}</span>
        <Image
          src="/icons/chevron-bottom.svg"
          alt=""
          width={12}
          height={12}
          className="dark:invert"
        />
      </button>

      {open && (
        <div className="mt-2 w-27.5 bg-white dark:bg-gray-800 shadow-md border border-border rounded-md absolute right-0 top-full flex flex-col z-50 text-sm mg:text-base">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              className={`text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selected === opt
                  ? "text-point font-bold"
                  : "text-black dark:text-white"
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
