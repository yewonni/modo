"use client";

import JoinForm from "@/components/join/JoinForm";

export default function JoinPage() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen flex justify-center items-center px-4">
      <div className="w-full max-w-100 flex flex-col items-center">
        <JoinForm />
      </div>
    </div>
  );
}
