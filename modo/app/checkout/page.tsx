import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Checkbox from "@/components/CheckBox";
import Image from "next/image";

const ORDER_ITEMS = [
  {
    id: 1,
    store: "스토어명",
    name: "상품명 상품명",
    price: "10,000원",
    image: "/images/product1.png",
  },
  {
    id: 2,
    store: "스토어명",
    name: "상품명 상품명",
    price: "20,000원",
    image: "/images/product1.png",
  },
  {
    id: 3,
    store: "스토어명",
    name: "상품명 상품명",
    price: "30,000원",
    image: "/images/product1.png",
  },
];

const PAYMENT_METHODS = [
  "신용 / 체크카드",
  "카카오페이",
  "네이버페이",
  "무통장 입금",
];

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center">
      <label className="font-bold w-20">{label}</label>
      {children}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Header />

      <main className="mt-37.5 lg:mt-45 px-4 md:px-20 lg:px-40">
        <h3 className="text-base md:text-xl font-medium">주문서</h3>

        <form className="flex flex-col">
          {/* Shipping Info */}
          <section className="mt-6 pb-8 flex flex-col gap-6 border-b">
            <h4 className="border-b-4 text-xl font-bold py-3">배송정보</h4>

            <FormRow label="수령인">
              <input className="w-full max-w-75 border border-border p-3 rounded-sm focus:ring-2 focus:ring-primary" />
            </FormRow>

            <FormRow label="연락처">
              <input
                placeholder="010-0000-0000"
                className="w-full max-w-75 border border-border p-3 rounded-sm focus:ring-2 focus:ring-primary"
              />
            </FormRow>

            <article className="flex flex-col gap-4">
              <label className="font-bold">배송지</label>

              <div className="flex gap-3 max-w-100">
                <input
                  placeholder="우편번호"
                  className="w-full border border-border p-3 rounded-sm focus:ring-2 focus:ring-primary"
                />
                <Button className="w-50">우편번호 조회</Button>
              </div>

              <input
                placeholder="기본 주소"
                className="w-full max-w-125 border border-border p-3 rounded-sm focus:ring-2 focus:ring-primary"
              />
              <input
                placeholder="상세 주소"
                className="w-full max-w-125 border border-border p-3 rounded-sm focus:ring-2 focus:ring-primary"
              />
            </article>

            <FormRow label="배송메시지">
              <input
                placeholder="예) 문 앞에 놓아주세요"
                className="w-full max-w-125 border border-border p-3 rounded-sm focus:ring-2 focus:ring-primary"
              />
            </FormRow>
          </section>

          {/* Order */}
          <section className="mt-10 pb-10 border-b">
            <h4 className="text-base md:text-xl font-bold py-6">
              주문 상품 {ORDER_ITEMS.length}개
            </h4>

            <ul className="flex flex-col gap-6">
              {ORDER_ITEMS.map((item) => (
                <li key={item.id} className="flex gap-6 items-center">
                  <div className="relative w-25 h-25 bg-sub-bg rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-500 line-clamp-1">
                      {item.store}
                    </p>
                    <p className="font-medium line-clamp-2">{item.name}</p>
                  </div>

                  <p className="font-bold">{item.price}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Payment Method */}
          <section className="mt-10 pb-10 border-b">
            <h4 className="border-b-4 text-xl font-bold py-3 mb-6">결제수단</h4>

            <fieldset className="flex flex-col gap-4">
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input type="radio" name="payment" />
                  <span>{method}</span>
                </label>
              ))}
            </fieldset>
          </section>

          {/* Checkout Info */}
          <section className="mt-16 flex justify-end mb-40">
            <article className="w-full max-w-105 bg-sub-bg rounded-md p-8 flex flex-col gap-6">
              <div className="text-sm sm:text-base flex justify-between">
                <p>총 상품 금액</p>
                <p>60,000원</p>
              </div>

              <div className="text-sm sm:text-base flex justify-between border-b pb-4">
                <p>배송비</p>
                <p>0원</p>
              </div>

              <div className="flex justify-between items-center font-bold">
                <p className="text-base sm:text-lg">총 결제 금액</p>
                <p className="text-lg sm:text-2xl text-point">60,000원</p>
              </div>

              <div className="flex gap-3 items-center">
                <Checkbox />
                <p className="text-sm">
                  주문 내용을 확인하였으며, 정보 제공에 동의합니다.
                </p>
              </div>

              <Button size="lg">60,000원 결제하기</Button>
            </article>
          </section>
        </form>
      </main>

      <Footer />
    </>
  );
}
