"use client";

import { useState } from "react";
import Image from "next/image";
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "cursor-pointer rounded-md font-medium leading-snug focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary: "bg-primary text-white",
    outline: "border border-[#b4b4b4]",
  };

  const hoverActiveStyles = {
    primary:
      "hover:bg-[#D6D1C8] hover:text-black active:bg-[#CFC8BC] active:text-black",
    outline: "hover:bg-gray-100 active:bg-gray-200",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2 text-base",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        !props.disabled && hoverActiveStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

// Like Button
type LikeButtonProps = {
  defaultLiked?: boolean;
  onChange?: (liked: boolean) => void;
};

export function LikeButton({
  defaultLiked = false,
  onChange,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(defaultLiked);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="w-8 h-8 flex items-center justify-center hover:cursor-pointer"
    >
      <Image
        src={liked ? "/icons/like-full.svg" : "/icons/like-gray.svg"}
        alt="like"
        width={24}
        height={24}
      />
    </button>
  );
}

// Review Button
type StarButtonProps = {
  defaultActive?: boolean;
  onChange?: (active: boolean) => void;
};

export function StarButton({
  defaultActive = false,
  onChange,
}: StarButtonProps) {
  const [active, setActive] = useState(defaultActive);

  const toggle = () => {
    const next = !active;
    setActive(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="w-8 h-8 flex items-center justify-center hover:cursor-pointer"
    >
      <Image
        src={active ? "/icons/star-on.svg" : "/icons/star-off.svg"}
        alt="star"
        width={24}
        height={24}
      />
    </button>
  );
}
