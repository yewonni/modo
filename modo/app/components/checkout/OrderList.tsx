import OrderItem from "./OrderItem";
import { CheckoutItem } from "./types";

interface Props {
  items: CheckoutItem[];
}

export default function OrderList({ items }: Props) {
  return (
    <section className="mt-10 pb-10 border-b">
      <h4 className="text-base md:text-xl font-bold py-6">
        주문 상품 {items.length}개
      </h4>

      <ul className="flex flex-col gap-6">
        {items.map((item) => (
          <OrderItem
            key={item.productId}
            store={item.store}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            image={item.image}
          />
        ))}
      </ul>
    </section>
  );
}
