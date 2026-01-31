interface Props {
  description?: string;
}

export default function ProductDescription({ description }: Props) {
  return (
    <section className="flex flex-col gap-4 py-8 md:py-12">
      <h3 className="font-semibold text-lg md:text-xl">DETAIL DESCRIPTION</h3>
      <p className="text-gray-700 leading-relaxed">
        {description ?? "상품 상세 설명이 없습니다."}
      </p>
    </section>
  );
}
