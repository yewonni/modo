import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import CartHeader from "@/components/my-cart/CartHeader";
import CartItem from "@/components/my-cart/CartItem";
import CartSummary from "@/components/my-cart/CartSummary";
import Button from "@/components/common/Button";

export default function MyCartPage() {
  const cartItems = [
    {
      id: 1,
      store: "스토어 이름이 길어질 수도 있음",
      name: "아주아주 긴 상품명 테스트용 텍스트",
      price: 10000,
      quantity: 1,
      image: "/images/product.png",
    },
    {
      id: 2,
      store: "스토어",
      name: "상품명 2",
      price: 20000,
      quantity: 2,
      image: "/images/product.png",
    },
    {
      id: 3,
      store: "스토어",
      name: "상품명 3",
      price: 15000,
      quantity: 1,
      image: "/images/product.png",
    },
  ];

  return (
    <>
      <Header />
      <main className="mt-37.5 lg:mt-45 px-4 md:px-20 lg:px-40 flex flex-col gap-6">
        <h1 className="text-xl md:text-2xl font-bold">
          장바구니 ({cartItems.length})
        </h1>

        <CartHeader />

        <article>
          <ul className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
        </article>

        <Button variant="outline" className="w-37.5 mt-2">
          선택 상품 삭제
        </Button>

        <CartSummary />
      </main>
      <Footer />
    </>
  );
}
