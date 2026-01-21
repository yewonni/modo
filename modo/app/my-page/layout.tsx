"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Header />

      <div className="px-4 sm:px-40 mt-30 flex flex-col sm:flex-row gap-10 sm:gap-20">
        <aside className="sm:w-56 py-6 sm:py-10 sm:sticky sm:top-30 h-fit">
          <p className="mb-6 sm:mb-10 text-lg sm:text-xl">MY PAGE</p>

          <nav className="flex sm:flex-col gap-4 sm:gap-0">
            {[
              { href: "/my-page/orders", label: "나의 주문내역" },
              { href: "/my-page/reviews", label: "나의 리뷰 내역" },
            ].map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 sm:pl-4 py-2 sm:py-3 border-b-2 sm:border-b-0 sm:border-l-2 transition
                    ${
                      active
                        ? "border-black text-black"
                        : "border-transparent text-gray-400 hover:text-black"
                    }
                  `}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 py-4 sm:py-10">{children}</main>
      </div>
    </>
  );
}
