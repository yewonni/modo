"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { LoginPayload, login } from "../lib/api";
import LoginForm from "../components/login/LoginForm";
import { showToast } from "../components/common/UniqueToast";

export default function LoginPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setSaveId(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      showToast("이메일과 비밀번호를 입력해주세요", "login-error");
      setLoading(false);
      return;
    }

    const payload: LoginPayload = { email, password };

    try {
      const data = await login(payload);
      setAccessToken(data.accessToken);

      if (saveId) localStorage.setItem("savedEmail", email);
      else localStorage.removeItem("savedEmail");

      showToast("로그인 성공", "login-success");
      router.push("/");
    } catch (err: any) {
      showToast(err.message || "로그인 실패", "login-error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f9f9f9] min-h-screen flex justify-center items-center px-4">
      <LoginForm
        email={email}
        password={password}
        saveId={saveId}
        loading={loading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSaveIdChange={setSaveId}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
