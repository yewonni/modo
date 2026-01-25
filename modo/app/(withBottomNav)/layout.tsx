"use client";

import { ReactNode } from "react";
import BottomNav from "@/components/common/BottomNav";

export default function WithBottomNavLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
      <BottomNav />
    </div>
  );
}
