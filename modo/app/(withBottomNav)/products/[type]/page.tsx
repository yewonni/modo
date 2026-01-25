import { getProductsByType } from "@/lib/products";
import Image from "next/image";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { LikeButton } from "@/components/common/Button";

interface PageProps {
  params: { type: string };
}

export default async function ProductsPage({ params }: PageProps) {
  const { type } = params;

  const limit = type === "new" ? 12 : type === "trend" ? 12 : undefined;

  const products = await getProductsByType(type, limit);

  const title =
    type === "new" ? "NEW ARRIVALS" : type === "trend" ? "TREND" : "PRODUCTS";

  return (
    <>
      <Header />

      <main className="pt-40 px-4 sm:px-40 pb-40">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10">{title}</h2>

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {products.map(({ id, store, name, price, image }) => (
            <li key={id}>
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
                />
              </div>

              <div className="mt-3 flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-sm sm:text-base">
                    {store || "스토어명"}
                  </p>
                  <LikeButton />
                </div>

                <p className="text-sm sm:text-base">{name}</p>

                <p className="font-bold text-sm sm:text-base">
                  {price.toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}
