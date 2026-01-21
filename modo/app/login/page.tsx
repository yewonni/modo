"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import Checkbox from "@/components/CheckBox";
import Button from "@/components/Button";
import { login, LoginPayload } from "@/lib/api";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload: LoginPayload = { email, password };

    try {
      const data = await login(payload);
      setAccessToken(data.accessToken);
      alert("로그인 성공");
      router.push("/");
    } catch (err: any) {
      setError(err.message || "로그인 실패");
      console.log(payload);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 sm:p-10 w-full max-w-100 flex flex-col items-center gap-4 rounded-lg shadow-md"
      >
        <Link href={"/"}>
          <Image
            src="/icons/modo-logo-black.svg"
            alt="logo"
            width={80}
            height={33}
            className="mb-6 hover:cursor-pointer"
          />
        </Link>

        <input
          type="email"
          id="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <div className="flex gap-2 items-center self-start mt-1 mb-4">
          <Checkbox
            checkboxType="circle"
            checked={saveId}
            onChange={() => setSaveId(!saveId)}
          />
          <span className="text-sm text-gray-600">아이디 저장</span>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Button
          className="w-full py-3 mt-2 mb-4"
          type="submit"
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
    </div>
  );
}
