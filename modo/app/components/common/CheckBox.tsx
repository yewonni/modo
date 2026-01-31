"use client";

import Image from "next/image";
import { InputHTMLAttributes } from "react";
import clsx from "clsx";

type CheckboxType = "circle" | "square";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  checkboxType?: CheckboxType;
  label?: string;
}

const ICONS = {
  circle: {
    on: "/icons/circle-on.svg",
    off: "/icons/circle-off.svg",
  },
  square: {
    on: "/icons/checkbox-on.svg",
    off: "/icons/checkbox-off.svg",
  },
};

export default function Checkbox({
  checkboxType = "square",
  checked,
  onChange,
  label,
  className,
  ...props
}: CheckboxProps) {
  const icon = checked ? ICONS[checkboxType].on : ICONS[checkboxType].off;

  return (
    <label
      className={clsx(
        "inline-flex items-center gap-2 cursor-pointer select-none",
        className
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
        {...props}
      />

      <Image src={icon} alt="checkbox" width={16} height={16} />

      {label && <span>{label}</span>}
    </label>
  );
}
