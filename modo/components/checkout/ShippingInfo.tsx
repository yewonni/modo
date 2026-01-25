import FormRow from "@/components/common/FormRow";
import Button from "@/components/common/Button";

export default function ShippingInfo() {
  return (
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
  );
}
