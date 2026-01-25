import Button from "@/components/common/Button";

export default function CartSummary() {
  return (
    <section aria-label="결제 정보" className="mt-16 border-t-4 pt-10 mb-40">
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
  );
}
