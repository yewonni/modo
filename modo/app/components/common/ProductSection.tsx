import Link from "next/link";
import ProductCard from "./ProductCard";
import { Product } from "@/app/types/product";

interface ProductSectionProps {
  title: string;
  href: string;
  products: Product[];
}

export default function ProductSection({
  title,
  href,
  products,
}: ProductSectionProps) {
  return (
    <section className="pb-24 sm:pb-34">
      <div className="relative mb-5 sm:mb-10 flex items-center justify-between sm:justify-center">
        <h3 className="text-xl sm:text-2xl font-semibold">{title}</h3>
        <Link
          href={href}
          className="font-medium hover:underline sm:absolute sm:right-0"
        >
          더보기
        </Link>
      </div>

      <ul className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </section>
  );
}
