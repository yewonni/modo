import OrderItem from "./OrderItem";

interface OrderItemType {
  id: number;
  store: string;
  name: string;
  price: string;
  image: string;
}

interface Props {
  items: OrderItemType[];
}

export default function OrderList({ items }: Props) {
  return (
    <section className="mt-10 pb-10 border-b">
      <h4 className="text-base md:text-xl font-bold py-6">
        주문 상품 {items.length}개
      </h4>

      <ul className="flex flex-col gap-6">
        {items.map((item) => (
          <OrderItem key={item.id} {...item} />
        ))}
      </ul>
    </section>
  );
}
