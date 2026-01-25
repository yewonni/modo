import Image from "next/image";
import Checkbox from "@/components/common/CheckBox";
import Button from "@/components/common/Button";

interface CartItemProps {
  item: {
    id: number;
    store: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  };
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <li className="relative bg-white border-b border-b-border rounded-md p-4 md:p-5">
      <button className="absolute top-2 right-2 md:top-4 md:right-4">
        <Image src="/icons/close.svg" alt="삭제" width={15} height={15} />
      </button>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-3 md:hidden">
        <p className="font-bold truncate">{item.store}</p>

        <div className="flex items-center gap-4">
          <Checkbox />
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col gap-1 text-sm min-w-0">
            <p className="font-bold truncate">{item.name}</p>
            <p>{item.price.toLocaleString()}원</p>
          </div>
        </div>

        <div className="flex justify-end items-center gap-3 mt-8">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button className="px-3 py-1 hover:bg-gray-100">-</button>
            <div className="px-4 py-1 border-x border-gray-300 flex items-center justify-center">
              {item.quantity}
            </div>
            <button className="px-3 py-1 hover:bg-gray-100">+</button>
          </div>
          <Button size="sm">BUY NOW</Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-4 items-center gap-4">
        <div className="flex justify-center">
          <Checkbox />
        </div>

        {/* Product Info */}
        <div className="flex justify-center items-center gap-4">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col text-sm gap-1 w-37.5">
            <p className="font-medium truncate">{item.store}</p>
            <p className="font-bold truncate">{item.name}</p>
            <p>{item.price.toLocaleString()}원</p>
          </div>
        </div>

        {/* Quantity */}
        <div className="flex justify-center">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button className="px-3 py-1 hover:bg-gray-100">-</button>
            <div className="px-4 py-1 border-x border-gray-300 flex items-center justify-center">
              {item.quantity}
            </div>
            <button className="px-3 py-1 hover:bg-gray-100">+</button>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-bold">
            {(item.price * item.quantity).toLocaleString()}원
          </p>
          <Button size="sm">BUY NOW</Button>
        </div>
      </div>
    </li>
  );
}
