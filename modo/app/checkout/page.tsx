"use client";

import { useRouter } from "next/navigation";
import Footer from "@/app/components/common/Footer";
import ShippingInfo from "@/app/components/checkout/ShippingInfo";
import OrderList from "@/app/components/checkout/OrderList";
import PaymentMethod from "@/app/components/checkout/PaymentMethod";
import CheckoutSummary from "@/app/components/checkout/CheckoutSummary";
import { apiRequest } from "@/app/lib/apiClient";
import { useCheckoutStore } from "@/app/store/checkoutStore";
import { useState } from "react";
import { showToast } from "../components/common/UniqueToast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clear } = useCheckoutStore();

  const [shipping, setShipping] = useState({
    receiver: "",
    phone: "",
    zipCode: "",
    address1: "",
    address2: "",
    message: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      await apiRequest("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          items: items.map((item) => ({
            quantity: item.quantity,
            product: {
              id: item.productId,
              price: item.price,
            },
          })),
          shipping,
          paymentMethod,
          totalPrice,
          fromCart: false,
        }),
      });

      clear();

      showToast("주문이 완료되었습니다", "checkout-success");

      router.push("/my-page/orders");
    } catch (e: any) {
      showToast(e.message || "결제 실패", "checkout-error");

      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <main className="mt-80 text-center">주문 상품이 없습니다.</main>
      </>
    );
  }

  return (
    <>
      <main className="mt-40 px-4 md:px-40">
        <form onSubmit={(e) => e.preventDefault()}>
          <ShippingInfo
            value={shipping}
            onChange={(key, value) =>
              setShipping((prev) => ({ ...prev, [key]: value }))
            }
          />
          <OrderList items={items} />
          <PaymentMethod value={paymentMethod} onChange={setPaymentMethod} />
          <CheckoutSummary
            items={items}
            agreed={agreed}
            onAgree={setAgreed}
            onCheckout={handleCheckout}
            submitting={submitting}
          />
        </form>
      </main>
      <Footer />
    </>
  );
}
