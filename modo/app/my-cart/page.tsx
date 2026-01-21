import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Checkbox from "@/components/CheckBox";
import Image from "next/image";
import Button from "@/components/Button";

export default function MyCartPage() {
  const cartItems = [
    {
      id: 1,
      store: "스토어 이름이 길어질 수도 있음",
      name: "아주아주 긴 상품명 테스트용 텍스트",
      price: 10000,
      quantity: 1,
      image: "/images/product.png",
    },
    {
      id: 2,
      store: "스토어",
      name: "상품명 2",
      price: 20000,
      quantity: 2,
      image: "/images/product.png",
    },
    {
      id: 3,
      store: "스토어",
      name: "상품명 3",
      price: 15000,
      quantity: 1,
      image: "/images/product.png",
    },
  ];

  return (
    <>
      <Header />
      <main className="mt-37.5 lg:mt-45 px-4 md:px-20 lg:px-40 flex flex-col gap-6">
        <h1 className="text-xl md:text-2xl font-bold">
          장바구니 ({cartItems.length})
        </h1>

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-4 items-center bg-sub-bg p-3 font-medium text-gray-700 rounded-md">
          <div className="flex justify-center">
            <Checkbox />
          </div>
          <div className="flex justify-center">상품정보</div>
          <div className="flex justify-center">수량</div>
          <div className="flex justify-center">상품금액</div>
        </div>

        {/* Item List */}
        <article>
          <ul className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="relative bg-white border-b border-b-border rounded-md p-4 md:p-5"
              >
                <button className="absolute top-2 right-2 md:top-4 md:right-4">
                  <Image
                    src="/icons/close.svg"
                    alt="삭제"
                    width={15}
                    height={15}
                  />
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
            ))}
          </ul>
        </article>

        <Button variant="outline" className="w-37.5 mt-2">
          선택 상품 삭제
        </Button>

        <section
          aria-label="결제 정보"
          className="mt-16 border-t-4 pt-10 mb-40"
        >
          {/* Price Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 md:divide-x border-b pb-8">
            <div className="flex justify-between md:flex-col md:items-center gap-2 px-4">
              <p>총 상품 금액</p>
              <p className="text-xl font-bold">50,000원</p>
            </div>

            <div className="flex justify-between md:flex-col md:items-center gap-2 px-4">
              <p>총 배송비</p>
              <p className="text-xl font-bold">0원</p>
            </div>

            <div className="flex items-center justify-between md:flex-col md:items-center gap-2 px-4">
              <p className="text-black font-bold text-lg md:text-base">
                총 결제 금액
              </p>
              <p className="text-2xl font-bold text-point">50,000원</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
            <Button variant="outline" className="md:w-45">
              BACK
            </Button>
            <Button className="md:w-55">CHECK OUT</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
