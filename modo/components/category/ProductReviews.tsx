import Button, { StarButton } from "../common/Button";

export default function ProductReviews() {
  return (
    <>
      <section className="flex flex-col gap-4 py-8 border-t border-border">
        <h3 className="text-2xl font-bold">리뷰 작성</h3>

        <div className="flex gap-1">
          <StarButton />
          <StarButton />
          <StarButton />
          <StarButton />
          <StarButton />
        </div>

        <textarea
          placeholder="리뷰를 작성해보세요. (0/30)"
          className="border-2 border-border rounded-sm w-full p-3 h-37.5 md:h-50 mt-2 resize-none"
        />

        <div className="flex justify-end">
          <Button size="lg">작성하기</Button>
        </div>
      </section>

      <section className="flex flex-col gap-6 py-8 mb-80">
        <h3 className="text-2xl font-bold">Reviews (128)</h3>

        <article className="flex flex-col gap-2 border-b border-border pb-4">
          <header className="flex justify-between">
            <p className="font-medium">작성자 이름</p>
            <p className="text-gray-500 text-sm">2026-01-16</p>
          </header>
          <div className="flex gap-1">
            <StarButton />
            <StarButton />
            <StarButton />
            <StarButton />
            <StarButton />
          </div>
          <p className="text-gray-700">제품이 기대 이상으로 좋습니다.</p>
        </article>
      </section>
    </>
  );
}
