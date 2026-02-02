import { Suspense } from "react";
import CategoryPageClient from "@/app/components/category/CategoryPageClient";

export default function CategoryPage() {
  return (
    <Suspense
      fallback={
        <div className="mt-30 lg:mt-45 px-4 lg:px-40 flex gap-10 mb-10 lg:mb-80">
          <aside className="hidden lg:block w-42.5 min-h-200 border-r border-r-border pr-10 bg-gray-100" />

          <main className="flex-1">
            <ul className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <li
                    key={i}
                    className="aspect-square w-full bg-gray-200 rounded-lg animate-pulse"
                  />
                ))}
            </ul>
          </main>
        </div>
      }
    >
      <CategoryPageClient />
    </Suspense>
  );
}
