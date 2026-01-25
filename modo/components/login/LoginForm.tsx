"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Checkbox from "@/components/common/CheckBox";
import Button from "@/components/common/Button";

interface LoginFormProps {
  email: string;
  password: string;
  saveId: boolean;
  loading: boolean;
  error?: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSaveIdChange: (value: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
  email,
  password,
  saveId,
  loading,
  error,
  onEmailChange,
  onPasswordChange,
  onSaveIdChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-8 sm:p-10 w-full max-w-100 flex flex-col items-center gap-4 rounded-lg shadow-md"
    >
      <Link href={"/"}>
        <Image
          src="/icons/modo-logo-black.svg"
          alt="logo"
          width={80}
          height={33}
          className="mb-6"
        />
      </Link>

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <div className="flex gap-2 items-center self-start mt-1 mb-4">
        <Checkbox
          checkboxType="circle"
          checked={saveId}
          onChange={(e) => onSaveIdChange(e.target.checked)}
        />
        <span className="text-sm text-gray-600">아이디 저장</span>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button
        type="submit"
        className="w-full py-3 mt-2 mb-4"
        disabled={loading}
      >
        {loading ? "로그인 중..." : "로그인"}
      </Button>

      <p className="text-[#767676] text-sm flex gap-2">
        <Link href="/join" className="hover:underline">
          회원가입
        </Link>
        <span>|</span>
        <span className="hover:underline cursor-pointer">비밀번호 찾기</span>
      </p>
    </form>
  );
}
