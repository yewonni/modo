import Button from "@/components/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#f9f9f9] min-h-screen flex justify-center items-center px-4">
      <div className="flex flex-col items-center gap-14">
        <div className="text-center">
          <p className="font-medium text-2xl sm:text-4xl mb-5">404 NOT FOUND</p>
          <p className="text-base sm:text-lg text-secondary">
            존재하지 않는 페이지입니다.
          </p>
        </div>
        <Link href={"/"}>
          <Button size="lg">홈으로 가기</Button>
        </Link>
      </div>
    </div>
  );
}
