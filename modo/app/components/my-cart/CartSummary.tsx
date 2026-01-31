"use client";

import Button from "@/app/components/common/Button";
import Link from "next/link";
import { useCheckoutStore } from "@/app/store/checkoutStore";

interface Props {
  totalPrice: number;
  items: {
    quantity: number;
    product: {
      id: number;
      name: string;
      store: string;
      price: number;
      image: string;
    };
  }[];
}

export default function CartSummary({ totalPrice, items }: Props) {
  const { setItems } = useCheckoutStore();

  const handleCheckout = () => {
    setItems(
      items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        store: item.product.store,
        price: item.product.price,
        image: item.product.image,
        quantity: item.quantity,
      })),
    );
  };

  return (
    <section className="mt-16 border-t-4 pt-10 mb-40">
      <div className="grid grid-cols-3 border-b pb-8">
        <div className="text-center">
          <p>총 상품 금액</p>
          <p className="text-xl font-bold">{totalPrice.toLocaleString()}원</p>
        </div>

        <div className="text-center">
          <p>총 배송비</p>
          <p className="text-xl font-bold">0원</p>
        </div>

        <div className="text-center">
          <p className="font-bold">총 결제 금액</p>
          <p className="text-2xl font-bold text-point">
            {totalPrice.toLocaleString()}원
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Link href="/">
          <Button variant="outline">CANCEL</Button>
        </Link>

        <Link href="/checkout">
          <Button onClick={handleCheckout}>CHECK OUT</Button>
        </Link>
      </div>
    </section>
  );
}
