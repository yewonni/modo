import Image from "next/image";

interface OrderItemProps {
  store: string;
  name: string;
  price: string;
  image: string;
}

export default function OrderItem({
  store,
  name,
  price,
  image,
}: OrderItemProps) {
  return (
    <li className="flex gap-6 items-center">
      <div className="relative w-25 h-25 bg-sub-bg rounded-md">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-md"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-500 line-clamp-1">{store}</p>
        <p className="font-medium line-clamp-2">{name}</p>
      </div>

      <p className="font-bold">{price}</p>
    </li>
  );
}
