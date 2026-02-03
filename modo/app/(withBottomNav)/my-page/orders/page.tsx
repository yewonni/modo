"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/app/lib/apiClient";
import { useAuthStore } from "@/app/store/authStore";
import Button from "@/app/components/common/Button";
import LoadingSpinner from "@/app/components/common/LoadingSpinner";

interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
    store: string;
  };
}

interface Order {
  id: number;
  totalPrice: number;
  paymentMethod: string;
  receiver: string;
  phone: string;
  address: string;
  createdAt: string;
  items: OrderItem[];
}

export default function MyOrdersPage() {
  const router = useRouter();

  const isInitialized = useAuthStore((s) => s.isInitialized);

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isInitialized) return;

    const fetchOrders = async () => {
      try {
        const data = await apiRequest<Order[]>("/api/orders");
        setOrders(Array.isArray(data) ? data : []);
      } catch (error: any) {
        if (error?.status === 401) {
          router.push("/login");
          return;
        }
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isInitialized, router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekday = weekdays[date.getDay()];

    return `${year}.${month}.${day} (${weekday})`;
  };

  if (!isInitialized || loading) {
    return (
      <section className="flex flex-col gap-6 sm:gap-8">
        <p className="text-xl sm:text-2xl">최근 주문</p>
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="flex flex-col gap-6 sm:gap-8">
        <p className="text-xl sm:text-2xl">최근 주문</p>
        <div className="text-center py-10 text-gray-500">
          주문 내역이 없습니다.
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <p className="text-xl sm:text-2xl">최근 주문</p>

      {orders.map((order) => (
        <div key={order.id} className="flex flex-col gap-4">
          <div className="flex justify-between items-center px-2">
            <p className="text-xs sm:text-sm text-gray-600">
              주문번호: {order.id} | {order.paymentMethod}
            </p>
            <p className="text-xs sm:text-sm text-secondary">
              {formatDate(order.createdAt)}
            </p>
          </div>

          <div className="bg-sub-bg rounded-xl p-4 sm:p-6 flex flex-col gap-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 sm:gap-6">
                <div className="relative w-24 h-24 shrink-0 bg-gray-200 rounded-md">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-sm text-gray-500">{item.product.store}</p>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.price.toLocaleString()}원 × {item.quantity}개
                  </p>

                  <Button
                    size="sm"
                    className="w-20"
                    onClick={() => router.push(`/category/${item.product.id}`)}
                  >
                    리뷰 작성
                  </Button>
                </div>

                <div className="text-right">
                  <p className="font-bold">
                    {(item.price * item.quantity).toLocaleString()}원
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t flex justify-between items-center">
              <p className="text-sm text-gray-600">총 주문 금액</p>
              <p className="text-lg font-bold">
                {order.totalPrice.toLocaleString()}원
              </p>
            </div>

            <div className="pt-4 border-t text-sm text-gray-600 space-y-1">
              <p>받는 사람: {order.receiver}</p>
              <p>연락처: {order.phone}</p>
              <p>배송지: {order.address}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
