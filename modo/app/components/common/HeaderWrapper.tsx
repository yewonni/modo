"use client";

import Header from "./Header";
import { usePathname } from "next/navigation";

export default function HeaderWrapper({ categories }: { categories: any[] }) {
  const pathname = usePathname();
  const showHeader = !["/login", "/join", "/join-success"].includes(pathname);

  if (!showHeader) return null;
  return <Header categories={categories} />;
}
