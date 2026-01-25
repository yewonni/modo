import Button from "@/components/common/Button";
import Checkbox from "@/components/common/CheckBox";

export default function CheckoutSummary() {
  return (
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
  );
}
