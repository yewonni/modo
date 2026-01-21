import Link from "next/link";
import Button from "@/components/Button";

export default function JoinSuccess() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen flex justify-center items-center px-4">
      <div className="flex flex-col items-center gap-14">
        <img src="/icons/success.svg" alt="" className="w-6 h-6" />
        <div className="text-center">
          <p className="font-semibold text-2xl sm:text-4xl mb-2">
            Welcome to MODO Living!
          </p>
          <p className="text-base sm:text-lg text-secondary">
            회원가입이 완료되었습니다.
          </p>
        </div>
        <p className="text-base sm:text-lg">
          지금 바로 감각적인 리빙 아이템을 만나보세요.
        </p>
        <Link href={"/login"}>
          <Button size="lg">로그인하기</Button>
        </Link>
      </div>
    </div>
  );
}
