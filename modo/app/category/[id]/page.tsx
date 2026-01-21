import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import { LikeButton, StarButton } from "@/components/Button";

export default function ProductDetailPage() {
  return (
    <>
      <Header />

      <main className="mt-37.5 lg:mt-45 px-4 md:px-20 lg:px-40 flex flex-col gap-16">
        {/** Store & Product Info*/}
        <section aria-label="스토어 정보" className="flex flex-col gap-10">
          <h1 className="text-2xl font-bold">스토어</h1>

          <div className="flex flex-col lg:flex-row gap-10">
            {/** Product Image */}
            <div className="w-full max-w-125 mx-auto lg:mx-0">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/product.png"
                  alt="상품 이미지"
                  fill
                  className="object-cover rounded-md"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>
            </div>

            {/** Product Info */}
            <article className="w-full lg:max-w-150 flex flex-col gap-6">
              <header className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">상품명</h2>
                <LikeButton />
              </header>

              {/** Price & Reviews */}
              <div className="flex justify-between items-center">
                <p className="text-xl font-bold">10,000원</p>
                <p className="text-gray-500 underline">128 reviews</p>
              </div>

              {/** Order Info */}
              <section
                aria-label="주문 정보"
                className="flex flex-col gap-3 text-gray-700"
              >
                <div className="flex gap-7">
                  <p className="font-medium text-gray-500 min-w-20">배송정보</p>
                  <p>1 ~ 3일 내 출고 예정</p>
                </div>
                <div className="flex gap-7">
                  <p className="font-medium text-gray-500 min-w-20">배송비</p>
                  <p>3,000원</p>
                </div>
                <div className="flex gap-7">
                  <p className="font-medium text-gray-500 min-w-20">혜택안내</p>
                  <ul className="flex flex-col gap-1 list-disc list-inside text-gray-700">
                    <li>신규 회원 5% 할인</li>
                    <li>리뷰 적립금 최대 3,000P</li>
                    <li className="text-point">회원 등급별 혜택</li>
                  </ul>
                </div>
              </section>

              {/** Quantity Section */}
              <section
                aria-label="수량 선택"
                className="bg-sub-bg rounded-md p-4 flex flex-col gap-3"
              >
                <p className="font-semibold">수량</p>
                <div className="flex w-max border border-gray-300 rounded-md overflow-hidden bg-white">
                  <button className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer">
                    -
                  </button>
                  <div className="px-4 py-2 border-x border-gray-300 flex items-center justify-center">
                    1
                  </div>
                  <button className="px-4 py-2 hover:bg-gray-100 hover:cursor-pointer">
                    +
                  </button>
                </div>
              </section>

              {/** Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button variant="outline" className="flex-1 py-3">
                  ADD TO CART
                </Button>
                <Button className="flex-1 py-3">BUY NOW</Button>
              </div>
            </article>
          </div>
        </section>

        {/** Description */}
        <section
          aria-label="상품 상세 정보"
          className="flex flex-col gap-4 py-8 md:py-12"
        >
          <h3 className="font-semibold text-lg md:text-xl">
            DETAIL DESCRIPTION
          </h3>
          <p className="text-gray-700 leading-relaxed">
            공간에 자연스럽게 녹아드는 미니멀 디자인
            <br />
            거실, 다이닝룸, 서재 어디에나 잘 어울립니다
          </p>
        </section>

        {/** Review */}
        <section
          aria-label="리뷰 작성"
          className="flex flex-col gap-4 py-8 border-t border-border"
        >
          <h3 className="text-2xl font-bold">리뷰 작성</h3>

          <div className="flex gap-1">
            <StarButton />
            <StarButton />
            <StarButton />
            <StarButton />
            <StarButton />
          </div>

          <textarea
            placeholder="리뷰를 작성해보세요. (0/30)"
            className="border-2 border-border rounded-sm w-full p-3 h-37.5 md:h-50 mt-2 resize-none"
          />

          <div className="flex justify-end">
            <Button size="lg">작성하기</Button>
          </div>
        </section>

        {/** Review List */}
        <section
          aria-label="리뷰 목록"
          className="flex flex-col gap-6 py-8 mb-80"
        >
          <h3 className="text-2xl font-bold">Reviews (128)</h3>
          <article className="flex flex-col gap-2 border-b border-border pb-4">
            <header className="flex justify-between items-center">
              <p className="font-medium">작성자 이름</p>
              <p className="text-gray-500 text-sm">2026-01-16</p>
            </header>
            <div className="flex gap-1">
              <StarButton />
              <StarButton />
              <StarButton />
              <StarButton />
              <StarButton />
            </div>
            <p className="text-gray-700 leading-relaxed mt-1">
              제품이 기대 이상으로 좋습니다. 디자인도 깔끔하고 집안 어디에
              두어도 잘 어울려요.
            </p>
          </article>

          <article className="flex flex-col gap-2 border-b border-gray-300 pb-4">
            <header className="flex justify-between items-center">
              <p className="font-medium">작성자 이름</p>
              <p className="text-gray-500 text-sm">2026-01-15</p>
            </header>
            <div className="flex gap-1">
              <StarButton />
              <StarButton />
              <StarButton />
              <StarButton />
              <StarButton />
            </div>
            <p className="text-gray-700 leading-relaxed mt-1">
              배송이 빨라서 만족스럽습니다. 포장도 안전하게 되어 있었어요.
            </p>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}
