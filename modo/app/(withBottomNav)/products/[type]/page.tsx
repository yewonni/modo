import { getProductsByType } from "@/app/lib/products";
import Footer from "@/app/components/common/Footer";
import ProductCard from "@/app/components/common/ProductCard";
import LoginModal from "@/app/components/common/LoginModal";

interface PageProps {
  params: { type: string };
}

export default async function ProductsPage({ params }: PageProps) {
  const { type } = params;

  const limit = type === "new" || type === "trend" ? 12 : undefined;
  const products = await getProductsByType(type, limit);

  const title =
    type === "new" ? "NEW ARRIVALS" : type === "trend" ? "TREND" : "PRODUCTS";

  return (
    <>
      <main className="pt-40 px-4 sm:px-40 pb-40">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-10">{title}</h2>

        <ul className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </main>

      <Footer />
      <LoginModal />
    </>
  );
}
