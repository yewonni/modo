"use client";
import Checkbox from "@/components/common/CheckBox";
import React from "react";

interface TermsCheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
}

export default function TermsCheckbox({
  checked,
  onChange,
  error,
}: TermsCheckboxProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2 mt-1 mb-4">
        <Checkbox
          checkboxType="square"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="text-sm text-gray-600">약관에 동의합니다</span>
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
