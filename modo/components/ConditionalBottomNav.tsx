"use client";

import { usePathname } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default function ConditionalBottomNav() {
  const pathname = usePathname();

  const hideBottomNavRoutes = ["/login", "/join", "/my-cart", "/checkout"];

  if (hideBottomNavRoutes.includes(pathname)) {
    return null;
  }

  return <BottomNav />;
}
