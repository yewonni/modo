import Checkbox from "@/components/common/CheckBox";

export default function CartHeader() {
  return (
    <div className="hidden md:grid grid-cols-4 items-center bg-sub-bg p-3 font-medium text-gray-700 rounded-md">
      <div className="flex justify-center">
        <Checkbox />
      </div>
      <div className="flex justify-center">상품정보</div>
      <div className="flex justify-center">수량</div>
      <div className="flex justify-center">상품금액</div>
    </div>
  );
}
