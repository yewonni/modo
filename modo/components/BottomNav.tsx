"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function BottomNav() {
  const pathname = usePathname();
  const accessToken = useAuthStore((state) => state.accessToken);

  const TABS = accessToken
    ? [
        {
          label: "홈",
          href: "/",
          icon: "/icons/home-stroke.svg",
          activeIcon: "/icons/home-black.svg",
        },
        {
          label: "좋아요",
          href: "/my-like",
          icon: "/icons/like-stroke.svg",
          activeIcon: "/icons/like-black.svg",
        },
        {
          label: "장바구니",
          href: "/my-cart",
          icon: "/icons/cart-stroke.svg",
          activeIcon: "/icons/cart-black.svg",
        },
        {
          label: "마이페이지",
          href: "/my-page/orders",
          icon: "/icons/user-stroke.svg",
          activeIcon: "/icons/user-black.svg",
        },
      ]
    : [
        {
          label: "홈",
          href: "/",
          icon: "/icons/home-stroke.svg",
          activeIcon: "/icons/home-black.svg",
        },
        {
          label: "로그인",
          href: "/login",
          icon: "/icons/user-stroke.svg",
          activeIcon: "/icons/user-black.svg",
        },
      ];

  return (
    <nav className="fixed bottom-0 left-0 z-50 w-full border-t bg-sub-bg md:hidden">
      <ul className="flex h-16 items-center justify-around">
        {TABS.map((tab) => {
          const isActive =
            pathname === tab.href ||
            (tab.href !== "/" && pathname.startsWith(tab.href));

          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className="flex flex-col items-center gap-1 text-xs"
              >
                <Image
                  src={isActive ? tab.activeIcon : tab.icon}
                  alt={tab.label}
                  width={22}
                  height={22}
                />
                <span className={isActive ? "text-black" : "text-gray-600"}>
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
