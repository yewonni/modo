"use client";

import { useState } from "react";
import FormRow from "@/app/components/common/FormRow";
import Button from "@/app/components/common/Button";

interface ShippingValue {
  receiver: string;
  phone: string;
  zipCode: string;
  address1: string;
  address2: string;
  message: string;
}

interface Props {
  value: ShippingValue;
  onChange: (key: keyof ShippingValue, value: string) => void;
}

export default function ShippingInfo({ value, onChange }: Props) {
  const [isDaumLoaded, setIsDaumLoaded] = useState(false);

  const isValidPhone = (phone: string) => {
    const regex = /^01[016789]-?\d{3,4}-?\d{4}$/;
    return regex.test(phone);
  };

  // 우편번호 API
  const loadDaumScript = () => {
    return new Promise<void>((resolve) => {
      if ((window as any).daum) {
        setIsDaumLoaded(true);
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
      script.onload = () => {
        setIsDaumLoaded(true);
        resolve();
      };
      document.body.appendChild(script);
    });
  };

  const handlePostalCode = async () => {
    await loadDaumScript();

    if (!(window as any).daum) {
      console.error("Daum 우편번호 API 로드 실패");
      return;
    }

    new (window as any).daum.Postcode({
      oncomplete: function (data: any) {
        onChange("zipCode", data.zonecode);
        onChange("address1", data.address);

        const detailInput = document.querySelector<HTMLInputElement>(
          'input[placeholder="상세 주소"]',
        );
        if (detailInput) detailInput.focus();
      },
    }).open();
  };

  return (
    <section className="mt-6 pb-8 flex flex-col gap-6 border-b">
      <h4 className="border-b-4 text-xl font-bold py-3">배송정보</h4>

      <FormRow label="수령인">
        <input
          value={value.receiver}
          onChange={(e) => onChange("receiver", e.target.value)}
          className="w-full max-w-75 border p-3"
          required
        />
      </FormRow>

      <FormRow label="연락처">
        <input
          value={value.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="010-0000-0000"
          className="w-full max-w-75 border p-3"
          required
        />
        {!isValidPhone(value.phone) && value.phone.length > 0 && (
          <p className="text-red-500 text-sm mt-1">
            휴대폰 번호 형식이 올바르지 않습니다.
          </p>
        )}
      </FormRow>

      <div className="flex gap-3 max-w-100">
        <input
          value={value.zipCode}
          onChange={(e) => onChange("zipCode", e.target.value)}
          placeholder="우편번호"
          className="w-full border p-3"
          readOnly
          required
        />
        <Button type="button" onClick={handlePostalCode}>
          우편번호 조회
        </Button>
      </div>

      <input
        value={value.address1}
        onChange={(e) => onChange("address1", e.target.value)}
        placeholder="기본 주소"
        className="w-full max-w-125 border p-3"
        readOnly
        required
      />

      <input
        value={value.address2}
        onChange={(e) => onChange("address2", e.target.value)}
        placeholder="상세 주소"
        className="w-full max-w-125 border p-3"
        required
      />

      <FormRow label="배송메시지">
        <input
          value={value.message}
          onChange={(e) => onChange("message", e.target.value)}
          placeholder="예) 문 앞에 놓아주세요"
          className="w-full max-w-125 border p-3"
        />
      </FormRow>
    </section>
  );
}
