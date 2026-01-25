"use client";

export default function MyOrdersPage() {
  const orders = [
    {
      id: 1,
      date: "25.12.24 (금)",
      store: "스토어명",
      product: "상품명",
      price: "120,000원",
    },
    {
      id: 2,
      date: "25.12.20 (월)",
      store: "스토어명",
      product: "상품명",
      price: "89,000원",
    },
  ];

  return (
    <section className="flex flex-col gap-6 sm:gap-8">
      <p className="text-xl sm:text-2xl">최근 주문</p>

      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-sub-bg rounded-xl p-4 sm:p-6 flex gap-4 sm:gap-6"
        >
          {/* 이미지 영역 */}
          <div className="w-24 h-24 shrink-0 bg-gray-200 rounded-md" />

          <div className="flex flex-col gap-2 flex-1">
            <p className="text-sm">{order.store}</p>
            <p>{order.product}</p>
            <p className="text-sm text-gray-500">{order.price}</p>
          </div>

          <p className="text-xs sm:text-sm text-secondary self-start">
            {order.date}
          </p>
        </div>
      ))}
    </section>
  );
}
