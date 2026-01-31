"use client";

import Image from "next/image";
import Checkbox from "@/app/components/common/CheckBox";

interface Props {
  item: {
    quantity: number;
    product: {
      id: number;
      name: string;
      store: string;
      price: number;
      image: string;
    };
  };
  checked: boolean;
  onCheck: (productId: number, checked: boolean) => void;
  onQuantityChange: (productId: number, quantity: number) => void;
}

export default function CartItem({
  item,
  checked,
  onCheck,
  onQuantityChange,
}: Props) {
  const { product, quantity } = item;

  const decrease = () => {
    if (quantity <= 1) return;
    onQuantityChange(product.id, quantity - 1);
  };

  const increase = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  return (
    <li className="bg-white border-b border-b-border rounded-md p-4 md:grid md:grid-cols-4 md:items-center gap-4">
      <div className="flex items-start gap-3 md:contents">
        <div className="flex justify-center md:justify-center shrink-0">
          <Checkbox
            checked={checked}
            onChange={(e) => onCheck(product.id, e.target.checked)}
          />
        </div>

        <div className="flex items-center gap-4 flex-1 md:flex-initial">
          <Image
            src={product.image}
            alt={product.name}
            width={80}
            height={80}
            className="rounded-md object-cover shrink-0"
          />
          <div className="flex flex-col gap-1 text-sm min-w-0">
            <p className="font-medium truncate">{product.store}</p>
            <p className="font-bold truncate">{product.name}</p>
            <p className="md:hidden">{product.price.toLocaleString()}원</p>
          </div>
        </div>
      </div>

      {/* 수량 조절/가격 */}
      <div className="flex items-center justify-between mt-3 md:contents">
        <div className="flex justify-center md:justify-center">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button className="px-3 py-1 hover:bg-gray-100" onClick={decrease}>
              -
            </button>
            <div className="px-4 py-1 border-x border-gray-300 flex items-center justify-center min-w-[40px]">
              {quantity}
            </div>
            <button className="px-3 py-1 hover:bg-gray-100" onClick={increase}>
              +
            </button>
          </div>
        </div>

        <div className="text-right md:text-center font-bold">
          {(product.price * quantity).toLocaleString()}원
        </div>
      </div>
    </li>
  );
}
