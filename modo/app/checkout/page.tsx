"use client";

import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import ShippingInfo from "@/components/checkout/ShippingInfo";
import OrderList from "@/components/checkout/OrderList";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";

const ORDER_ITEMS = [
  {
    id: 1,
    store: "스토어명",
    name: "상품명 상품명",
    price: "10,000원",
    image: "/images/product1.png",
  },
  {
    id: 2,
    store: "스토어명",
    name: "상품명 상품명",
    price: "20,000원",
    image: "/images/product1.png",
  },
  {
    id: 3,
    store: "스토어명",
    name: "상품명 상품명",
    price: "30,000원",
    image: "/images/product1.png",
  },
];

export default function CheckoutPage() {
  return (
    <>
      <Header />

      <main className="mt-37.5 lg:mt-45 px-4 md:px-20 lg:px-40">
        <h3 className="text-base md:text-xl font-medium">주문서</h3>
        <form className="flex flex-col">
          <ShippingInfo />
          <OrderList items={ORDER_ITEMS} />
          <PaymentMethod />
          <CheckoutSummary />
        </form>
      </main>

      <Footer />
    </>
  );
}
