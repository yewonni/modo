const PAYMENT_METHODS = [
  "신용 / 체크카드",
  "카카오페이",
  "네이버페이",
  "무통장 입금",
];

export default function PaymentMethod() {
  return (
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
  );
}
