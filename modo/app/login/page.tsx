"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { login, LoginPayload } from "@/lib/api";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [saveId, setSaveId] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
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
        error={error}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSaveIdChange={setSaveId}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
