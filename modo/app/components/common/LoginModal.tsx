"use client";

import { useUIStore } from "@/app/store/uiStore";
import { useRouter } from "next/navigation";
import Button from "./Button";

export default function LoginModal() {
  const { loginModalOpen, closeLoginModal } = useUIStore();
  const router = useRouter();

  if (!loginModalOpen) return null;

  const handleLogin = () => {
    closeLoginModal();
    router.push("/login");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={closeLoginModal}
    >
      <div
        className="bg-white p-8 rounded-lg w-90 flex flex-col items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium">로그인이 필요한 서비스입니다.</h3>
        <p className="mb-4">로그인 하시겠습니까?</p>
        <div className="flex gap-3 justify-center">
          <Button onClick={closeLoginModal} variant="outline">
            취소
          </Button>
          <Button onClick={handleLogin}>로그인</Button>
        </div>
      </div>
    </div>
  );
}
