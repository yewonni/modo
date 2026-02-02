import Button from "@/app/components/common/Button";
import Checkbox from "@/app/components/common/CheckBox";
import { CheckoutItem } from "./types";

interface Props {
  items: CheckoutItem[];
  agreed: boolean;
  onAgree: (v: boolean) => void;
  onCheckout: () => void;
  submitting?: boolean;
}

export default function CheckoutSummary({
  items,
  agreed,
  onAgree,
  onCheckout,
  submitting = false,
}: Props) {
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <section className="mt-16 flex justify-end mb-40">
      <article className="w-full max-w-105 bg-sub-bg rounded-md p-8 flex flex-col gap-6">
        <div className="flex justify-between">
          <p>총 상품 금액</p>
          <p>{totalPrice.toLocaleString()}원</p>
        </div>

        <div className="flex gap-3 items-center">
          <Checkbox
            checked={agreed}
            onChange={(e) => onAgree(e.target.checked)}
          />
          <p className="text-sm">
            주문 내용을 확인하였으며, 정보 제공에 동의합니다.
          </p>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!agreed || submitting}
          onClick={(e) => {
            e.preventDefault();
            onCheckout();
          }}
        >
          {submitting
            ? "처리 중..."
            : `${totalPrice.toLocaleString()}원 결제하기`}
        </Button>
      </article>
    </section>
  );
}
