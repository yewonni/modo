"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/app/components/common/Header";
import Footer from "@/app/components/common/Footer";
import CartHeader from "@/app/components/my-cart/CartHeader";
import CartItem from "@/app/components/my-cart/CartItem";
import CartSummary from "@/app/components/my-cart/CartSummary";
import Button from "@/app/components/common/Button";
import { apiRequest } from "@/app/lib/apiClient";

interface CartItemType {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    store: string;
    price: number;
    image: string;
  };
}

export default function MyCartPage() {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    const data = await apiRequest<CartItemType[]>("/api/cart");
    setCartItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const handleCheck = (productId: number, checked: boolean) => {
    setCheckedIds((prev) =>
      checked ? [...prev, productId] : prev.filter((id) => id !== productId),
    );
  };

  const handleQuantityChange = async (productId: number, quantity: number) => {
    await apiRequest("/api/cart", {
      method: "POST",
      body: JSON.stringify({ productId, quantity }),
    });
    fetchCart();
  };

  const handleDeleteSelected = async () => {
    if (checkedIds.length === 0) return;

    await apiRequest("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ productIds: checkedIds }),
    });

    setCheckedIds([]);
    fetchCart();
  };

  if (loading) {
    return <p className="p-8 text-center text-gray-500">Loading...</p>;
  }

  const isAllChecked =
    cartItems.length > 0 && checkedIds.length === cartItems.length;

  const handleToggleAll = (checked: boolean) => {
    if (checked) {
      setCheckedIds(cartItems.map((item) => item.product.id));
    } else {
      setCheckedIds([]);
    }
  };

  return (
    <>
      <Header />
      <main className="mt-37.5 lg:mt-45 px-4 md:px-20 lg:px-40 flex flex-col gap-6">
        <h1 className="text-xl md:text-2xl font-bold">
          장바구니 ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center py-20">장바구니가 비어 있습니다.</p>
        ) : (
          <>
            <CartHeader checked={isAllChecked} onToggle={handleToggleAll} />

            <ul className="flex flex-col gap-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  checked={checkedIds.includes(item.product.id)}
                  onCheck={handleCheck}
                  onQuantityChange={handleQuantityChange}
                />
              ))}
            </ul>

            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDeleteSelected}
              >
                선택 상품 삭제
              </Button>
            </div>

            <CartSummary totalPrice={totalPrice} items={cartItems} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
