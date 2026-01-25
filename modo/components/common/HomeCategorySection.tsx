"use client";

import Link from "next/link";
import Image from "next/image";

interface Category {
  key: string;
  label: string;
  slug: string;
  icon: string;
  alt: string;
}

interface Props {
  categories: Category[];
}

export default function HomeCategorySection({ categories }: Props) {
  return (
    <section className="py-18 sm:py-20">
      <ul className="mx-auto max-w-65 grid grid-cols-2 gap-x-6 gap-y-10 sm:max-w-180 sm:grid-cols-4">
        {categories.map(({ key, label, slug, icon, alt }) => (
          <li key={key}>
            <Link
              href={`/category?slug=${slug}`} // 여기 slug 사용
              className="flex flex-col items-center gap-4"
            >
              <div className="relative w-full max-w-12.5 aspect-square">
                <Image src={icon} alt={alt} fill className="object-contain" />
              </div>
              <p className="text-sm sm:text-base font-semibold">{label}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
