import Checkbox from "@/app/components/common/CheckBox";

interface Props {
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

export default function CartHeader({ checked, onToggle }: Props) {
  return (
    <div className="hidden md:grid grid-cols-4 items-center bg-sub-bg p-3 font-medium rounded-md">
      <div className="flex justify-center">
        <Checkbox
          checked={checked}
          onChange={(e) => onToggle(e.target.checked)}
        />
      </div>
      <div className="flex justify-center">상품정보</div>
      <div className="flex justify-center">수량</div>
      <div className="flex justify-center">상품금액</div>
    </div>
  );
}
